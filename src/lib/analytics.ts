type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export type ConversionEvent = "alert_signup" | "kit_download" | "affiliate_click";

export function trackConversion(
  event: ConversionEvent,
  parameters: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer?.push({ event, ...parameters });
  analyticsWindow.gtag?.("event", event, parameters);
}
