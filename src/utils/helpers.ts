const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

interface FetchOptions {
  method: "GET" | "POST";
  body?: Record<string, any>;
}

export const fetchFromAPI = async (
  path: string,
  options: FetchOptions = { method: "GET" }
) => {
  return await fetch(API_BASE_URL + path, {
    method: options.method,
    body: JSON.stringify(options.body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchDogs = async (
  { from, size }: { from: number; size: number } = { from: 0, size: 25 }
) => {
  return await fetchFromAPI(`/dogs/search?size=${size}&from=${from}`);
};
