export const SITE_NAME = "WPMTest";
export const SITE_ORIGIN = "https://wpmtest.app";

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_ORIGIN).toString();
}

export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}
