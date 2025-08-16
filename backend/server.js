import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";

const app = express();
const PORT = 3000;

/**
 * Scrapes Amazon search results for a given keyword
 * @param {string} keyword - The search keyword
 * @returns {Array} - Array of products with title, rating, reviews, image
 */
async function scrapeAmazon(keyword) {
  try {
    // Construct the Amazon search URL
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    
    // Fetch the HTML content of the search page
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    // Parse the HTML using JSDOM
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Select all product result elements
    const products = Array.from(
      document.querySelectorAll("div.s-result-item[data-component-type='s-search-result']")
    );

    // Map each product element to extract necessary data
    const results = products.map((product) => {
      const title =
        product.querySelector("h2[aria-label]")?.getAttribute("aria-label") ||
        product.querySelector("h2 a span")?.textContent ||
        "N/A";

      const rating = product.querySelector("span.a-icon-alt")?.textContent || "N/A";
      const reviews = product.querySelector("span.a-size-base")?.textContent || "N/A";
      const image = product.querySelector("img.s-image")?.src || "N/A";

      return { title, rating, reviews, image };
    });

    return results;
  } catch (error) {
    console.error("Error scraping Amazon:", error.message);
    return [];
  }
}

// API endpoint to handle scraping requests
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: "Keyword is required" });

  const data = await scrapeAmazon(keyword);
  res.json(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
