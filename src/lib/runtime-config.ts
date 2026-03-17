function hasProtocol(value: string): boolean {
  return /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(value);
}

function hasExplicitPort(value: string): boolean {
  if (!hasProtocol(value)) {
    return /^\/\//.test(value) || /:\d+(?:\/|$)/.test(value);
  }

  try {
    return new URL(value).port.length > 0;
  } catch {
    return false;
  }
}

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildOrigin(baseUrl: string, port?: string): string {
  const sanitizedBase = stripTrailingSlash(baseUrl.trim());

  if (!sanitizedBase) {
    return "/backend";
  }

  if (sanitizedBase.startsWith("/")) {
    return sanitizedBase;
  }

  if (!port || hasExplicitPort(sanitizedBase)) {
    return sanitizedBase;
  }

  return `${sanitizedBase}:${port}`;
}

export function buildUrl(baseUrl: string, path: string, port?: string): string {
  const origin = buildOrigin(baseUrl, port);
  return `${origin}${normalizePath(path)}`;
}

export function getServerApiOrigin(): string {
  return buildOrigin(process.env.API_BASE_URL ?? "http://tarna-api:4000", process.env.API_PORT ?? "4000");
}

export function getPublicApiOrigin(): string {
  return buildOrigin(process.env.NEXT_PUBLIC_API_BASE_URL ?? "/backend", process.env.NEXT_PUBLIC_API_PORT);
}

export function getSocketOrigin(): string {
  const explicitSocketUrl = process.env.NEXT_PUBLIC_WS_URL?.trim();
  if (explicitSocketUrl) {
    return stripTrailingSlash(explicitSocketUrl);
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return getPublicApiOrigin();
}