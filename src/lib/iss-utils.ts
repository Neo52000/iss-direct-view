export const formatCoordinates = (lat: number, lon: number) =>
  `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;

export const formatSpeed = (kmh: number) => `${Math.round(kmh).toLocaleString("fr-FR")} km/h`;

export const formatAltitude = (km: number) => `${km.toFixed(1).replace(".", ",")} km`;

export const getReadableDate = (d: Date | string | number) => {
  const date = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(date);
};

export const getReadableDay = (d: Date | string | number) => {
  const date = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeZone: "Europe/Paris",
  }).format(date);
};

export interface PassEvent {
  startUTC: number; // seconds
  duration: number; // seconds
  maxEl: number;
  startAz?: number;
  endAz?: number;
}

export const generateCalendarEvent = (pass: PassEvent, city?: string) => {
  const start = new Date(pass.startUTC * 1000);
  const end = new Date((pass.startUTC + pass.duration) * 1000);
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ISS Direct France//FR",
    "BEGIN:VEVENT",
    `UID:${pass.startUTC}@iss-direct-france`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Passage visible de l'ISS${city ? " — " + city : ""}`,
    `DESCRIPTION:Hauteur max ${Math.round(pass.maxEl)}° — Durée ${Math.round(pass.duration / 60)} min`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `iss-passage-${start.toISOString().slice(0, 10)}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};
