const BASE_URL = "http://localhost:5000/api";

// Generic API handler
async function request(url: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error("Something went wrong");
  }

  return response.json();
}

export default request;
export const registerUser = (data: any) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = (data: any) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const getProducts = () => {
  return request("/products");
};

export const addProduct = (data: any) => {
  return request("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
};