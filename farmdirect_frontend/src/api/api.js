const BASE_URL = "http://localhost:8080/api";

/* ============================================
   FARMER LOGIN
============================================ */
export async function farmerLogin(email, password) {
  const res = await fetch(`${BASE_URL}/farmer/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

/* ============================================
   CONSUMER — FETCH ALL PRODUCTS
============================================ */
export async function fetchProducts(language) {
  const res = await fetch(`${BASE_URL}/products/all?lang=${language}`);
  return res.json();
}

/* ============================================
   FARMER — FETCH PRODUCTS BY FARMER ID
============================================ */
export async function fetchFarmerProducts(farmerId) {
  const res = await fetch(`${BASE_URL}/products/farmer/${farmerId}`);
  return res.json();
}

/* ============================================
   FARMER — ADD PRODUCT
============================================ */
export async function addProduct(product) {
  const res = await fetch(`${BASE_URL}/products/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

/* ============================================
   FARMER — DELETE PRODUCT
============================================ */
export async function deleteProduct(productId) {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
  });
  return res.json();
}

/* ============================================
   WEATHER API
============================================ */
export async function fetchWeather(city) {
  const res = await fetch(`${BASE_URL}/weather?city=${city}`);
  return res.json();
}

/* ============================================
   GOVERNMENT SCHEMES
============================================ */
export async function fetchSchemes() {
  const res = await fetch(`${BASE_URL}/schemes`);
  return res.json();
}

/* ============================================
   CROP RECOMMENDATION
============================================ */
export async function fetchCropRecommendation(soilType, rainfall) {
  const res = await fetch(
    `${BASE_URL}/crop/recommend?soilType=${soilType}&rainfall=${rainfall}`
  );
  return res.json();
}
