"use client";

import { useEffect, useState } from "react";
import { AndroidIcon, AppleIcon, ArrowIcon, DesktopIcon } from "@/components/icons";
import { APP_STORE_URL, CLIENT_PORTAL_URL, GOOGLE_PLAY_URL } from "@/lib/config";

type Device = "ios" | "android" | "desktop";

const options = [
  { id: "ios" as const, title: "iPhone / iPad", action: "Завантажити в App Store", url: APP_STORE_URL, note: "", Icon: AppleIcon },
  { id: "android" as const, title: "Android", action: "Завантажити в Google Play", url: GOOGLE_PLAY_URL, note: "", Icon: AndroidIcon },
  { id: "desktop" as const, title: "Комп’ютер", action: "Відкрити Client Portal", url: CLIENT_PORTAL_URL, note: "Працює у будь-якому браузері", Icon: DesktopIcon }
];

export function DeviceOptions() {
  const [device, setDevice] = useState<Device>("desktop");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) setDevice("ios");
    else if (/android/.test(ua)) setDevice("android");
    const media = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);
    return () => media.removeEventListener("change", updateMobile);
  }, []);

  const ordered = isMobile ? [...options].sort((a, b) => Number(b.id === device) - Number(a.id === device)) : options;

  return (
    <div className="device-grid">
      {ordered.map(({ id, title, action, url, note, Icon }) => (
        <article className={`device-card device-${id}${id === device ? " is-recommended" : ""}`} key={id}>
          <div className="device-card-top">
            <span className="device-icon"><Icon /></span>
            {id === device ? <span className="recommended-label">Для цього пристрою</span> : null}
          </div>
          <h3>{title}</h3>
          {url ? (
            <a className="device-link" href={url} target="_blank" rel="noreferrer">
              <span>{action}</span><ArrowIcon />
            </a>
          ) : (
            <span className="device-link is-disabled" aria-disabled="true" title="Посилання буде додано після публікації застосунку">
              <span>{action}</span><small>Посилання готується</small>
            </span>
          )}
          {note ? <p className="device-note">{note}</p> : null}
        </article>
      ))}
    </div>
  );
}
