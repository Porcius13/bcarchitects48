import { NextRequest, NextResponse } from 'next/server';

// Mock API - 2 saniye bekleyip rastgele bir analiz döndürür
const getMockAnalyses = (emotion: string, material: string, nature: string) => [
  `Tercihleriniz, özellikle "${material}" materyalinin ve "${emotion}" duygusunun, Akçapınar'ın doğal peyzajıyla olağanüstü bir uyum içinde olduğunu gösteriyor. Bu bölgenin denizle buluşan orman dokusu, sizin tercih ettiğiniz yaklaşımı destekleyen bir zemin sunuyor. Önerdiğimiz mimari stil, minimalizmin zarafetini doğanın organik formlarıyla birleştiren, çağdaş bir yaklaşım. Yapı, çevresindeki doğal unsurlarla diyalog kuran, ancak kendi kimliğini koruyan bir karaktere sahip olmalı.

${material} kullanımı, özellikle Akçapınar'ın iklim koşulları ve doğal çevresi göz önüne alındığında, hem estetik hem de fonksiyonel açıdan ideal bir seçim. Bu materyal, zaman içinde doğayla bütünleşerek kendine özgü bir patina kazanacak ve yapıya derinlik katacaktır. İç mekanlarda ise, doğal ışığın kontrollü kullanımı ve açık-kapalı mekan geçişleri, "${nature}" ifadesinin mimariye yansımasını sağlayacaktır.

Lüks ve minimalizm arasındaki denge, gereksiz süslemelerden kaçınırken, her detayın özenle tasarlanmasıyla kurulmalı. Bu yaklaşım, Akçapınar'ın sakin ve huzurlu atmosferiyle mükemmel bir uyum içinde olacak, eviniz hem bir sığınak hem de doğayla iç içe yaşamın bir parçası haline gelecektir.`,

  `Akçapınar'ın eşsiz doğası, özellikle "${nature}" ifadesinin altını çizdiği özellikler, sizin mimari vizyonunuzla buluştuğunda ortaya çıkacak sonuç gerçekten özel olacak. "${emotion}" duygusunu yansıtacak bir yapı, bu bölgenin deniz kenarındaki konumu ve orman dokusuyla harmanlandığında, çağdaş lüks mimarinin en zarif örneklerinden birini oluşturabilir.

${material} seçiminiz, bu bölgede hem dayanıklılık hem de estetik açıdan son derece uygun. Materyalin doğal dokusu, Akçapınar'ın çevresel karakteriyle uyumlu bir dil oluşturacak. Yapının tasarımında, iç ve dış mekan arasındaki sınırların bulanıklaştırılması, doğanın içeriye taşınması ve "${emotion}" duygusunun her alanda hissedilmesi ön planda tutulmalı.

Minimalist yaklaşım, burada sadeleştirme değil, özü yakalama anlamına geliyor. Her mekan, işlevselliği ve estetiği bir arada sunmalı, lüks ise detaylarda ve malzeme seçimlerinde kendini göstermeli. Bu şekilde, Akçapınar'ın doğal güzellikleriyle rekabet etmek yerine, onlarla uyum içinde var olan bir mimari ortaya çıkacaktır.`,

  `Tercihleriniz, Akçapınar'ın doğal çevresiyle kurulacak mimari diyalog için mükemmel bir başlangıç noktası sunuyor. "${emotion}" duygusunun mimariye yansıması, özellikle bu bölgenin sakin atmosferiyle birleştiğinde, benzersiz bir yaşam deneyimi yaratacaktır. ${material} kullanımı, hem sürdürülebilirlik hem de estetik değerler açısından bu projeyi güçlendirecek bir tercih.

Akçapınar'ın "${nature}" özelliklerini mimariye entegre etmek, yapının çevreyle kurduğu ilişkiyi derinleştirecek. Büyük cam yüzeyler, teraslar ve bahçe alanları, doğal peyzajla sürekli bir görsel bağlantı sağlayacak. İç mekanlarda ise, doğal malzemelerin kullanımı ve minimal dekorasyon anlayışı, huzurlu bir atmosfer yaratacaktır.

Lüks, burada gösterişten ziyade, yaşam kalitesi ve mekansal deneyimle tanımlanmalı. Her detay, "${emotion}" duygusunu destekleyecek şekilde düşünülmeli, ancak doğanın önüne geçmemeli. Bu denge, Akçapınar'ın ruhunu yansıtan, çağdaş ve zarif bir mimari dil oluşturacaktır.`
];

export async function POST(request: NextRequest) {
  try {
    const { emotion, material, nature } = await request.json();

    if (!emotion || !material || !nature) {
      return NextResponse.json(
        { error: 'Tüm alanlar doldurulmalıdır' },
        { status: 400 }
      );
    }

    // 2 saniye bekle (gerçek API çağrısı simülasyonu)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Rastgele bir analiz seç
    const mockAnalyses = getMockAnalyses(emotion, material, nature);
    const randomIndex = Math.floor(Math.random() * mockAnalyses.length);
    const analysis = mockAnalyses[randomIndex];

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Mock API Error:', error);
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

