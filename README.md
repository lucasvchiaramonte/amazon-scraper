# Amazon Scraper
A simple Amazon product scraper with a Bun backend and a Vite + Vanilla JS frontend. It allows users to search for products and displays title, rating, number of reviews, and image.

## Features
- Search Amazon products by keyword
- Displays product title, rating, number of reviews, and image
- Frontend built with Vite and Vanilla JavaScript
- Backend built with Bun, Express, Axios, and JSDOM
- Proxy setup to avoid CORS issues

## Project Structure
amazon-scraper/
├─ backend/
│  └─ server.js       # Bun backend with /api/scrape endpoint
├─ frontend/
│  ├─ index.html      # Frontend HTML
│  ├─ src/
│  │  └─ main.js     # Frontend JavaScript
│  └─ vite.config.js  # Vite config with proxy
└─ README.md

## Prerequisites
- Node.js 18+ (for frontend with Vite)
- Bun 1.0+ (for backend)
- Internet connection (for scraping Amazon)

## Setup & Run
### Backend
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `bun install`
3. Run the backend: `bun run server.js`
Backend runs at: `http://localhost:3000`

### Frontend
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run the Vite dev server: `npm run dev`
Frontend runs at: `http://localhost:5173/` (or similar, check console). API requests are proxied to the backend via Vite.

## Usage
1. Open the frontend in your browser.
2. Enter a product keyword in the input box.
3. Click **Search**.
4. The page will display a list of products with:
   - Image
   - Title
   - Rating (stars)
   - Number of reviews

## Notes
- No CORS configuration needed due to Vite proxy setup.
- Handles errors gracefully:
  - Displays messages if no products are found.
  - Shows error if backend is not running.
- Only scrapes the first page of Amazon search results.

## Code Documentation
- **Backend (server.js):** Scrapes Amazon using Axios and JSDOM, exposes `/api/scrape?keyword=KEYWORD`.
- **Frontend (main.js):** Fetches data from `/api/scrape` and renders products dynamically.
- **Vite Proxy (vite.config.js):** Routes `/api` calls to backend to avoid CORS issues.

## License
MIT License
