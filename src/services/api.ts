const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...customConfig } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  // Intentamos parsear JSON, pero si falla, recogemos texto
  const tryParseJson = async () => {
    try {
      return await response.json();
    } catch {
      try {
        const text = await response.text();
        return { message: text };
      } catch {
        return { message: "Error desconocido" };
      }
    }
  };

  if (!response.ok) {
    const payload = await tryParseJson();
    const status = response.status;
    const statusText = response.statusText;
    const endpointInfo = `${API_URL}${endpoint}`;
    const msg =
      (payload && (payload.detail || payload.message)) ||
      `HTTP ${status} ${statusText}`;
    // Mejora de mensaje para depuración
    throw new Error(`Error en la petición (${endpointInfo}): ${msg}`);
  }

  // En éxito, devolvemos JSON si es posible
  const data = await tryParseJson();
  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
