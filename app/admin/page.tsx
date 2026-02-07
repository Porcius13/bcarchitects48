'use client';

import { useEffect, useState } from "react";
import SitePreview from "@/app/components/SitePreview";
import {
  defaultSiteData,
  type Project,
  type SiteData,
} from "@/app/data/siteDataDefaults";

const ADMIN_PASSWORD = "bcadmin";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/site-data");
        if (!res.ok) throw new Error("Veri alınamadı");
        const data: SiteData = await res.json();
        setSiteData(data);
      } catch (error) {
        console.error("Admin site data fetch error:", error);
        setMessage(
          "Veri alınırken hata oluştu, varsayılan veriler gösteriliyor."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage(null);
    } else {
      setMessage("Şifre yanlış.");
    }
  };

  const handleProjectChange = (
    index: number,
    field: keyof Project,
    value: string | boolean
  ) => {
    setSiteData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value } as Project;
      return { ...prev, projects };
    });
  };

  const handleAddProject = () => {
    setSiteData((prev) => {
      const nextId =
        prev.projects.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
      const newProject: Project = {
        id: nextId,
        name: "Yeni Proje",
        url: "",
        alt: "Yeni Proje",
        hasVideo: false,
        inProgress: false,
      };
      return { ...prev, projects: [...prev.projects, newProject] };
    });
  };

  const handleRemoveProject = (index: number) => {
    setSiteData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/site-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(siteData),
      });

      if (!res.ok) {
        throw new Error("Kaydetme başarısız");
      }

      setMessage("Değişiklikler kaydedildi.");
    } catch (error) {
      console.error("Admin save error:", error);
      setMessage("Kaydederken bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
        <form
          onSubmit={handleLogin}
          className="bg-white border border-[#1A1A1A]/10 rounded-sm p-8 w-full max-w-sm shadow-md"
        >
          <h1 className="font-serif text-2xl mb-6 text-center">Admin Girişi</h1>
          <label className="block text-sm font-light mb-2 text-[#1A1A1A]/80">
            Şifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#1A1A1A]/20 focus:border-[#1A1A1A] outline-none mb-4 text-sm"
          />
          {message && (
            <p className="text-xs text-red-500 mb-3">{message}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-[#1A1A1A] text-white text-sm font-light uppercase tracking-wide hover:bg-[#1A1A1A]/90 transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#1A1A1A]">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sol: Kontroller */}
        <div className="w-full lg:w-[420px] border-b lg:border-b-0 lg:border-r border-[#1A1A1A]/10 bg-white/90 backdrop-blur-sm overflow-y-auto">
          <div className="px-4 py-4 md:px-6 md:py-6 border-b border-[#1A1A1A]/10 flex items-center justify-between sticky top-0 bg-white/95 z-10">
            <div>
              <h1 className="font-serif text-lg md:text-xl">
                Site Yönetim Paneli
              </h1>
              <p className="text-[11px] md:text-xs text-[#1A1A1A]/60">
                Soldan içerikleri düzenleyin, sağda anında önizleyin.
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-3 py-2 bg-[#1A1A1A] text-white text-[11px] md:text-xs uppercase tracking-wide font-light hover:bg-[#1A1A1A]/90 disabled:opacity-50"
            >
              {isSaving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>

          <div className="px-4 py-4 md:px-6 md:py-6 space-y-8">
            {message && (
              <div className="text-xs md:text-sm text-[#1A1A1A]/80 bg-[#F5F3EF] border border-[#1A1A1A]/10 px-3 py-2">
                {message}
              </div>
            )}

            {isLoading ? (
              <p className="text-sm text-[#1A1A1A]/70">Veriler yükleniyor...</p>
            ) : (
              <>
                {/* Projects */}
                <section className="space-y-4">
                  <div>
                    <h2 className="font-serif text-base md:text-lg">
                      Projeler
                    </h2>
                    <p className="text-[11px] md:text-xs text-[#1A1A1A]/60">
                      Kartları düzenlerken sağ tarafta sitenizde nasıl
                      görüneceğini canlı olarak görebilirsiniz.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {siteData.projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="border border-[#1A1A1A]/10 rounded-sm p-3 md:p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs md:text-sm font-light text-[#1A1A1A]/80">
                            Proje #{project.id}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveProject(index)}
                            className="text-[11px] text-red-500 hover:underline"
                          >
                            Sil
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                          <div>
                            <label className="block text-[11px] mb-1 text-[#1A1A1A]/70">
                              İsim
                            </label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-2 border border-[#1A1A1A]/20 text-xs md:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] mb-1 text-[#1A1A1A]/70">
                              Alt yazı (SEO)
                            </label>
                            <input
                              type="text"
                              value={project.alt}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "alt",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-2 border border-[#1A1A1A]/20 text-xs md:text-sm"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[11px] mb-1 text-[#1A1A1A]/70">
                              Görsel / Video URL&apos;si
                            </label>
                            <input
                              type="text"
                              value={project.url}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-2 border border-[#1A1A1A]/20 text-xs md:text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-1 text-[11px]">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={project.hasVideo}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "hasVideo",
                                  e.target.checked
                                )
                              }
                            />
                            <span>Bu bir video projesi</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={project.inProgress}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "inProgress",
                                  e.target.checked
                                )
                              }
                            />
                            <span>Yapım aşamasında</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="mt-2 px-3 py-2 border border-[#1A1A1A]/20 text-[11px] uppercase tracking-wide hover:border-[#1A1A1A] w-full text-center"
                  >
                    Yeni Proje Ekle
                  </button>
                </section>

                {/* Contact & Links */}
                <section className="space-y-4">
                  <h2 className="font-serif text-base md:text-lg">
                    İletişim & Linkler
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                    <div>
                      <label className="block text-[11px] mb-1 text-[#1A1A1A]/70">
                        Adres (her satır için ayrı satır kullanın)
                      </label>
                      <textarea
                        rows={4}
                        value={siteData.contact.addressLines.join("\n")}
                        onChange={(e) =>
                          setSiteData((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              addressLines: e.target.value.split("\n"),
                            },
                          }))
                        }
                        className="w-full px-2 py-2 border border-[#1A1A1A]/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] mb-1 text-[#1A1A1A]/70">
                          Telefon metni
                        </label>
                        <input
                          type="text"
                          value={siteData.contact.phoneText}
                          onChange={(e) =>
                            setSiteData((prev) => ({
                              ...prev,
                              contact: {
                                ...prev.contact,
                                phoneText: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-2 py-2 border border-[#1A1A1A]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] mb-1 text-[#1A1A1A]/70">
                          E-posta metni
                        </label>
                        <input
                          type="text"
                          value={siteData.contact.emailText}
                          onChange={(e) =>
                            setSiteData((prev) => ({
                              ...prev,
                              contact: {
                                ...prev.contact,
                                emailText: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-2 py-2 border border-[#1A1A1A]/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                    <div>
                      <label className="block text-[11px] mb-1 text-[#1A1A1A]/70">
                        WhatsApp linki
                      </label>
                      <input
                        type="text"
                        value={siteData.links.whatsappUrl}
                        onChange={(e) =>
                          setSiteData((prev) => ({
                            ...prev,
                            links: {
                              ...prev.links,
                              whatsappUrl: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-2 py-2 border border-[#1A1A1A]/20"
                        placeholder="https://wa.me/90..."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] mb-1 text-[#1A1A1A]/70">
                        Instagram linki
                      </label>
                      <input
                        type="text"
                        value={siteData.links.instagramUrl}
                        onChange={(e) =>
                          setSiteData((prev) => ({
                            ...prev,
                            links: {
                              ...prev.links,
                              instagramUrl: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-2 py-2 border border-[#1A1A1A]/20"
                      />
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>

        {/* Sağ: Canlı önizleme */}
        <div className="flex-1 overflow-y-auto">
          <SitePreview siteData={siteData} />
        </div>
      </div>
    </div>
  );
}

