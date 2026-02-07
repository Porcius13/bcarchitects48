import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Sen Akçapınar, Ula ve Akyaka bölgesinde uzmanlaşmış profesyonel bir mimarlık danışmanısın. Müşteri tercihlerine göre mimari stil önerisi üretiyorsun. Yanıtların Türkçe, profesyonel, kısa ve öz olsun. Gereksiz tekrarlara ve uzun açıklamalara girme.`;

const getFallbackAnalysis = (
  emotion: string,
  material: string,
  nature: string
) =>
  `Tercihleriniz, "${material}" ve "${emotion}" ile Akçapınar'ın doğal peyzajı uyumlu. ${material} kullanımı hem estetik hem fonksiyonel açıdan ideal. Akçapınar'ın "${nature}" özelliklerini mimariye taşıyarak, doğayla uyumlu minimal bir stil oluşturabilirsiniz.`;

async function callGeminiRest(
  apiKey: string,
  prompt: string,
  model: string
): Promise<{ text: string | null; error?: string }> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 4096,
          topP: 0.95,
          topK: 40,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    const msg = `[${model}] ${res.status}: ${err.slice(0, 200)}`;
    console.error('Gemini REST error:', msg);
    return { text: null, error: msg };
  }

  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const parts = data.candidates?.[0]?.content?.parts || [];
  const text = parts
    .map((p) => p.text || '')
    .join('')
    .trim();
  return { text: text || null };
}

export async function POST(request: NextRequest) {
  let emotion = '';
  let material = '';
  let nature = '';

  try {
    const body = await request.json();
    emotion = body.emotion || '';
    material = body.material || '';
    nature = body.nature || '';

    if (!emotion || !material || !nature) {
      return NextResponse.json(
        { error: 'Tüm alanlar doldurulmalıdır' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY ortam değişkeni tanımlı değil' },
        { status: 500 }
      );
    }

    const userPrompt = `Müşteri tercihleri:
- Evin hangi duyguyu yansıtmalı: ${emotion}
- Tercih edilen ana materyal: ${material}
- Akçapınar'ın doğasında etkileyen özellikler: ${nature}

Bu tercihlere göre kısa ve öz bir mimari stil önerisi yaz.`;

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;
    // API anahtarınızla erişilebilen modeller (ListModels'tan alındı)
    const modelsToTry = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-pro-latest',
      'gemini-flash-latest',
    ];

    let analysis = '';
    let lastError = '';
    for (const modelId of modelsToTry) {
      const { text, error } = await callGeminiRest(apiKey, fullPrompt, modelId);
      if (error) lastError = error;
      if (text && text.length > 50) {
        analysis = text;
        break;
      }
    }

    if (!analysis) {
      throw new Error(lastError || 'Gemini yanıt üretemedi');
    }

    return NextResponse.json({ analysis, source: 'gemini' });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('Gemini API Error:', errMsg);
    // Gemini başarısız olursa fallback ile devam et (emotion, material, nature zaten parse edildi)
    if (emotion && material && nature) {
      const analysis = getFallbackAnalysis(emotion, material, nature);
      return NextResponse.json({
        analysis,
        source: 'fallback',
        debugError: errMsg,
      });
    }
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Analiz sırasında bir hata oluştu',
      },
      { status: 500 }
    );
  }
}
