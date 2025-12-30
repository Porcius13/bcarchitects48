'use client';

import Image from "next/image";
import { useState } from "react";
import AIModal from "./components/AIModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#1A1A1A]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FDFDFB]/95 backdrop-blur-sm border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="font-serif text-xl md:text-2xl font-light tracking-tight">
              BC ARCHITECT | Berfin Çelik
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('projeler')}
                className="font-light text-sm tracking-wide uppercase hover:text-[#1A1A1A]/70 transition-colors"
              >
                Projeler
              </button>
              <button
                onClick={() => scrollToSection('hizmetler')}
                className="font-light text-sm tracking-wide uppercase hover:text-[#1A1A1A]/70 transition-colors"
              >
                Hizmetler
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="font-light text-sm tracking-wide uppercase hover:text-[#1A1A1A]/70 transition-colors"
              >
                AI Analizi
              </button>
              <button
                onClick={() => scrollToSection('iletisim')}
                className="font-light text-sm tracking-wide uppercase hover:text-[#1A1A1A]/70 transition-colors"
              >
                İletişim
              </button>
            </nav>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="md:hidden font-light text-xs tracking-wide uppercase"
            >
              AI Analizi
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center px-6 py-24 md:py-32 lg:py-40 lg:px-12 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay - %40 siyah */}
        <div className="absolute inset-0 bg-[#1A1A1A]/40" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center md:text-left">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight tracking-tight mb-6 text-[#FDFDFB]">
            Doğa ile Mimariyi<br />
            <span className="font-normal">AI ile Buluşturuyoruz</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light text-[#FDFDFB]/90 max-w-2xl leading-relaxed mb-4 mx-auto md:mx-0">
            Akçapınar'ın ruhunu, yapay zekanın vizyonuyla lüks yapılara dönüştürüyoruz.
          </p>
          <p className="text-base md:text-lg font-light text-[#FDFDFB]/80 max-w-2xl leading-relaxed mx-auto md:mx-0">
            Berfin Çelik Mimarlık, Akyaka ve Ula bölgesinin doğal güzelliklerini çağdaş mimari anlayışla buluşturarak, 
            her projede sürdürülebilir ve estetik çözümler sunuyor.
          </p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projeler" className="px-6 py-16 md:py-24 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[
              { id: 1, name: 'Akçapınar Lofts', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&q=80', alt: 'Akçapınar Lofts', hasVideo: false, inProgress: true },
              { id: 2, name: 'Şirinköy KC evi', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&q=80', alt: 'Şirinköy KC evi', hasVideo: false, inProgress: true },
              { id: 3, name: 'Akyaka Panorama', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=900&fit=crop&q=80', alt: 'Akyaka Panorama', hasVideo: true, inProgress: false },
            ].map((project) => (
              <div
                key={project.id}
                className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
              >
                {/* Default Image (only for non-video projects) */}
                {!project.hasVideo && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/5 to-[#1A1A1A]/10">
                    <Image
                      src={project.url}
                      alt={project.alt}
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                
                {/* Video (only for Akyaka Panorama) */}
                {project.hasVideo && (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  >
                    <source src="/akyaka-panorama.mp4" type="video/mp4" />
                  </video>
                )}
                
                {/* Construction in Progress Badge */}
                {project.inProgress && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-sm text-[#FDFDFB] text-xs md:text-sm font-light tracking-wider uppercase border border-[#FDFDFB]/20">
                      Construction in Progress
                    </span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/5 transition-all duration-500 group-hover:shadow-2xl" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#1A1A1A]/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-[#FDFDFB] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="px-6 py-24 md:py-32 lg:px-12 bg-[#FDFDFB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-16 md:mb-20 text-center tracking-tight">
            Hizmetlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {/* Mimarlık */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1A1A1A]/5 backdrop-blur-sm border border-[#1A1A1A]/10 flex items-center justify-center group-hover:bg-[#1A1A1A]/10 group-hover:border-[#1A1A1A]/20 transition-all duration-300">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#1A1A1A]/70 group-hover:text-[#1A1A1A] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-light mb-4 tracking-tight">
                Mimarlık
              </h3>
              <p className="text-sm md:text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Konsept tasarımdan uygulama projelerine kadar tüm mimari süreçlerde profesyonel çözümler sunuyoruz.
              </p>
            </div>

            {/* Uygulama & Takip */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1A1A1A]/5 backdrop-blur-sm border border-[#1A1A1A]/10 flex items-center justify-center group-hover:bg-[#1A1A1A]/10 group-hover:border-[#1A1A1A]/20 transition-all duration-300">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#1A1A1A]/70 group-hover:text-[#1A1A1A] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-light mb-4 tracking-tight">
                Uygulama ve Uygulama Takibi
              </h3>
              <p className="text-sm md:text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                İnşaat sürecinin her aşamasında teknik danışmanlık ve detaylı proje takibi hizmetleri.
              </p>
            </div>

            {/* Danışmanlık */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1A1A1A]/5 backdrop-blur-sm border border-[#1A1A1A]/10 flex items-center justify-center group-hover:bg-[#1A1A1A]/10 group-hover:border-[#1A1A1A]/20 transition-all duration-300">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#1A1A1A]/70 group-hover:text-[#1A1A1A] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-light mb-4 tracking-tight">
                Danışmanlık
              </h3>
              <p className="text-sm md:text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Mimari kararlarınızda rehberlik ve uzman görüşü ile projenizin değerini artırıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Style Advisor Section */}
      <section className="px-6 py-24 md:py-32 lg:py-40 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-8 md:mb-12 tracking-tight">
            AI Stil Danışmanı
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-light text-[#1A1A1A]/70 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Hayalinizdeki evi AI ile analiz edin ve doğanın ruhunu modern mimariyle birleştirin.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 md:px-12 py-4 md:py-5 bg-[#1A1A1A] text-[#FDFDFB] font-light text-base md:text-lg tracking-wide uppercase transition-all duration-300 hover:bg-[#1A1A1A]/90 hover:tracking-wider"
          >
            Hayalinizdeki evi AI ile analiz edin
          </button>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="WhatsApp ile iletişime geç"
      >
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Footer */}
      <footer id="iletisim" className="px-6 py-12 md:py-16 lg:px-12 border-t border-[#1A1A1A]/10 bg-[#FDFDFB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-12">
            {/* Contact Info */}
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-light mb-6 tracking-tight">
                İletişim
              </h3>
              <div className="space-y-4 font-light text-sm md:text-base text-[#1A1A1A]/70">
                <p>
                  <span className="uppercase tracking-wide text-[#1A1A1A]/50 text-xs">Adres</span>
                  <br />
                  Akyaka Mahallesi, Şakayık Sokak, No:2/2
                  <br />
                  Ula, Muğla
                </p>
                <p>
                  <span className="uppercase tracking-wide text-[#1A1A1A]/50 text-xs">Telefon</span>
                  <br />
                  Görüşme talebi için WhatsApp'ı kullanın
                </p>
                <p>
                  <span className="uppercase tracking-wide text-[#1A1A1A]/50 text-xs">E-posta</span>
                  <br />
                  Görüşme talebi için WhatsApp'ı kullanın
                </p>
              </div>
            </div>

            {/* Brand Info */}
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-light mb-6 tracking-tight">
                BC ARCHITECT
              </h3>
              <p className="font-light text-sm md:text-base text-[#1A1A1A]/70 leading-relaxed mb-6">
                Berfin Çelik Mimarlık, Akyaka ve Ula bölgesinde doğa ile uyumlu, 
                çağdaş mimari çözümler sunuyor.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#1A1A1A]/10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <a
                href="https://instagram.com/bc_architect"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
                aria-label="Instagram'da takip et"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-xs md:text-sm font-light tracking-wide">Instagram</span>
              </a>
              <p className="text-xs md:text-sm font-light text-[#1A1A1A]/50 tracking-wide">
                Powered by AI | Concept & Design by [Senin Adın]
              </p>
            </div>
          </div>
        </div>
      </footer>

      <AIModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
