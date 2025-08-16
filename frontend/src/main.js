import axios from "axios";

// DOM elements
const searchBtn = document.getElementById("searchBtn");
const keywordInput = document.getElementById("keyword");
const resultsDiv = document.getElementById("results");

// Event listener for search button
searchBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) return alert("Please enter a search keyword!");

  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    // Make request to backend API (proxied via Vite)
    const res = await axios.get(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const products = res.data;

    // Check if products were found
    if (!products.length) {
      resultsDiv.innerHTML = "<p>No products found.</p>";
      return;
    }

    // Render product results
    resultsDiv.innerHTML = products.map(p => `
      <div class="product">
        <img src="${p.image}" alt="${p.title}" />
        <div>
          <h3>${p.title}</h3>
          <p>⭐ ${p.rating}</p>
          <p>📝 ${p.reviews}</p>
        </div>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>Error fetching products. Make sure the backend is running.</p>";
  }
});
