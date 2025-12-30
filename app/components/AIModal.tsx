'use client';

import { useState } from 'react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIModal({ isOpen, onClose }: AIModalProps) {
  const [formData, setFormData] = useState({
    emotion: '',
    material: '',
    nature: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    phone: '',
  });
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Analiz başarısız oldu');
      }

      const data = await response.json();
      setResult(data.analysis);
    } catch (error) {
      console.error('Error:', error);
      setResult('Üzgünüz, bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ emotion: '', material: '', nature: '' });
    setResult(null);
    setShowAppointmentForm(false);
    setAppointmentData({ name: '', phone: '' });
    setShowThankYou(false);
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAppointment(true);

    // Simüle edilmiş form gönderimi - konsola yazdır
    console.log('Randevu Formu Gönderildi:', {
      name: appointmentData.name,
      phone: appointmentData.phone,
      analysis: result,
    });

    // 1 saniye bekle (gerçek API çağrısı simülasyonu)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmittingAppointment(false);
    setShowThankYou(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/40 backdrop-blur-sm">
      <div className="bg-[#FDFDFB] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#FDFDFB] border-b border-[#1A1A1A]/10 px-6 md:px-8 py-6 flex justify-between items-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight">
            {result ? 'Berfin Çelik Mimarlık Ofisi Önerisi' : 'AI Stil Analizi'}
          </h2>
          <button
            onClick={() => {
              onClose();
              handleReset();
            }}
            className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors text-2xl leading-none"
            aria-label="Kapat"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 md:px-8 py-8">
          {showThankYou ? (
            // Thank You View
            <div className="space-y-6 text-center py-8">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-[#1A1A1A]/60 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-[#1A1A1A]/80 leading-relaxed font-light text-base md:text-lg">
                  Analiziniz ve bilgileriniz mimarımıza iletildi. En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  handleReset();
                }}
                className="px-6 py-3 bg-[#1A1A1A] text-[#FDFDFB] font-light text-sm tracking-wide uppercase transition-all duration-300 hover:bg-[#1A1A1A]/90"
              >
                Kapat
              </button>
            </div>
          ) : showAppointmentForm ? (
            // Appointment Form View
            <form onSubmit={handleAppointmentSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-light text-base md:text-lg mb-3 text-[#1A1A1A]"
                >
                  Adınız
                </label>
                <input
                  type="text"
                  id="name"
                  value={appointmentData.name}
                  onChange={(e) =>
                    setAppointmentData({ ...appointmentData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-transparent border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors text-[#1A1A1A] font-light"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-light text-base md:text-lg mb-3 text-[#1A1A1A]"
                >
                  Telefon Numaranız
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={appointmentData.phone}
                  onChange={(e) =>
                    setAppointmentData({ ...appointmentData, phone: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-transparent border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors text-[#1A1A1A] font-light"
                  placeholder="05XX XXX XX XX"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmittingAppointment}
                  className="px-8 py-4 bg-[#1A1A1A] text-[#FDFDFB] font-light text-sm tracking-wide uppercase transition-all duration-300 hover:bg-[#1A1A1A]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmittingAppointment ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-[#FDFDFB] border-t-transparent rounded-full animate-spin"></span>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    'Gönder'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="px-8 py-4 border border-[#1A1A1A]/20 text-[#1A1A1A] font-light text-sm tracking-wide uppercase transition-all duration-300 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5"
                >
                  Geri
                </button>
              </div>
            </form>
          ) : result ? (
            // Result View
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-[#1A1A1A]/80 leading-relaxed font-light text-base md:text-lg whitespace-pre-line">
                  {result}
                </p>
              </div>
              <div className="pt-6 border-t border-[#1A1A1A]/10 flex gap-4">
                <button
                  onClick={() => setShowAppointmentForm(true)}
                  className="px-6 py-3 bg-[#1A1A1A] text-[#FDFDFB] font-light text-sm tracking-wide uppercase transition-all duration-300 hover:bg-[#1A1A1A]/90 flex-1"
                >
                  Bu Analizi Mimarımıza Gönder ve Randevu Al
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-[#1A1A1A]/20 text-[#1A1A1A] font-light text-sm tracking-wide uppercase transition-all duration-300 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5"
                >
                  Yeni Analiz
                </button>
              </div>
            </div>
          ) : (
            // Form View
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="pb-2 border-b border-[#1A1A1A]/5">
                <label
                  htmlFor="emotion"
                  className="block font-light text-sm md:text-base mb-4 text-[#1A1A1A]/80 uppercase tracking-wider"
                >
                  Eviniz hangi duyguyu yansıtmalı?
                </label>
                <input
                  type="text"
                  id="emotion"
                  value={formData.emotion}
                  onChange={(e) =>
                    setFormData({ ...formData, emotion: e.target.value })
                  }
                  required
                  className="w-full px-5 py-4 bg-transparent border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-all duration-300 text-[#1A1A1A] font-light text-base md:text-lg placeholder:text-[#1A1A1A]/40"
                  placeholder="Huzur, güç, doğallık vb."
                />
              </div>

              <div className="pb-2 border-b border-[#1A1A1A]/5">
                <label
                  htmlFor="material"
                  className="block font-light text-sm md:text-base mb-4 text-[#1A1A1A]/80 uppercase tracking-wider"
                >
                  Tercih ettiğiniz ana materyal nedir?
                </label>
                <input
                  type="text"
                  id="material"
                  value={formData.material}
                  onChange={(e) =>
                    setFormData({ ...formData, material: e.target.value })
                  }
                  required
                  className="w-full px-5 py-4 bg-transparent border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-all duration-300 text-[#1A1A1A] font-light text-base md:text-lg placeholder:text-[#1A1A1A]/40"
                  placeholder="Ahşap, ham beton, cam vb."
                />
              </div>

              <div className="pb-2 border-b border-[#1A1A1A]/5">
                <label
                  htmlFor="nature"
                  className="block font-light text-sm md:text-base mb-4 text-[#1A1A1A]/80 uppercase tracking-wider"
                >
                  Akçapınar'ın doğasında sizi en çok ne etkiler?
                </label>
                <textarea
                  id="nature"
                  value={formData.nature}
                  onChange={(e) =>
                    setFormData({ ...formData, nature: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-5 py-4 bg-transparent border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-all duration-300 text-[#1A1A1A] font-light text-base md:text-lg resize-none placeholder:text-[#1A1A1A]/40"
                  placeholder="Denizin sakinliği ve ormanın huzuru..."
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-[#1A1A1A] text-[#FDFDFB] font-light text-sm tracking-wide uppercase transition-all duration-300 hover:bg-[#1A1A1A]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-[#FDFDFB] border-t-transparent rounded-full animate-spin"></span>
                      <span>Analiz ediliyor...</span>
                    </>
                  ) : (
                    'Analiz Et'
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-4 border border-[#1A1A1A]/20 text-[#1A1A1A] font-light text-sm tracking-wide uppercase transition-all duration-300 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5"
                >
                  İptal
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

