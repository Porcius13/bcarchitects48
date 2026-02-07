export interface Project {
  id: number;
  name: string;
  url: string;
  alt: string;
  hasVideo: boolean;
  inProgress: boolean;
}

export interface ContactData {
  addressLines: string[];
  phoneText: string;
  emailText: string;
}

export interface LinksData {
  whatsappUrl: string;
  instagramUrl: string;
}

export interface SiteData {
  projects: Project[];
  contact: ContactData;
  links: LinksData;
}

export const defaultSiteData: SiteData = {
  projects: [
    {
      id: 1,
      name: "Akçapınar Lofts",
      url:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&q=80",
      alt: "Akçapınar Lofts",
      hasVideo: false,
      inProgress: true,
    },
    {
      id: 2,
      name: "Akyaka Villa Marine",
      url: "/akyaka-villa-marine1 (1).webp",
      alt: "Akyaka Villa Marine",
      hasVideo: false,
      inProgress: false,
    },
    {
      id: 3,
      name: "Akyaka Panorama",
      url: "/akyaka-panorama.mp4",
      alt: "Akyaka Panorama",
      hasVideo: true,
      inProgress: false,
    },
  ],
  contact: {
    addressLines: [
      "Akyaka Mahallesi, Şakayık Sokak, No:2/2",
      "Ula, Muğla",
    ],
    phoneText: "Görüşme talebi için WhatsApp'ı kullanın",
    emailText: "Görüşme talebi için WhatsApp'ı kullanın",
  },
  links: {
    whatsappUrl: "#",
    instagramUrl: "https://instagram.com/bc_architect",
  },
};

