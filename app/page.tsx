'use client';

import { useEffect, useState } from "react";
import SitePreview from "./components/SitePreview";
import {
  defaultSiteData,
  type SiteData,
} from "./data/siteDataDefaults";

export default function Home() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await fetch("/api/site-data");
        if (!res.ok) return;
        const data: SiteData = await res.json();
        setSiteData(data);
      } catch (error) {
        console.error("Site data fetch error:", error);
      }
    };

    fetchSiteData();
  }, []);

  return <SitePreview siteData={siteData} />;
}
