# 🌾 FarmDirect

FarmDirect is a farm-to-consumer marketplace built for Indian farmers and buyers. It lets farmers list and manage their produce directly, while consumers can browse, cart, and purchase fresh farm products — cutting out the middleman. On top of the marketplace, farmers get a built-in toolkit: real-time weather, an AI farming chatbot, crop recommendations, and government scheme information.

---

## 📸 Overview

| Role | What they can do |
|---|---|
| 👨‍🌾 Farmer | Register, log in, manage products, check weather, chat with AI assistant, view schemes & logistics |
| 🛒 Consumer | Browse products, add to cart, checkout with coupon codes, pay (UPI / Card / COD), track orders |

---

## ✨ Features

### For Farmers
- **Register & Login** — Email + password authentication
- **Product Management** — Add and view your own listed products
- **Real-Time Weather** — City-based weather powered by the Open-Meteo API, with farming-specific tips (e.g. "Avoid spraying pesticides today — heavy rain expected")
- **AI Farming Chatbot** — Ask about crops, soil, fertilizers, pests, irrigation, government schemes, and market prices
- **Crop Recommendation** — Get crop suggestions based on soil type and rainfall
- **Government Schemes** — Quick access to PM-Kisan, Fasal Bima, KCC, and more
- **Logistics Partners** — Info on Delhivery, Blue Dart, and India Post for shipping produce

### For Consumers
- **Phone-based Login** — Simple login with a phone number
- **Profile Setup** — Name, address, city, pincode, and photo
- **Shop** — Browse 28+ preloaded farm products (grains, vegetables, fruits, dairy, spices)
- **Cart** — Add/remove items, adjust quantities
- **Checkout with Coupons** — Apply discount codes: `FARM10` (10%), `GREEN20` (20%), `NEW5` (5%)
- **Payment** — UPI, Card, or Cash on Delivery (mock flow)
- **Order Tracking** — Step-by-step delivery tracker with an OpenStreetMap embed

### General
- **Multi-language UI** — 8 languages: English, Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi
- **Dark Mode** — Toggle from the navbar

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework and dev server |
| Plain CSS | Styling |
| Fetch API | HTTP calls to backend |
| react-icons | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 3.4 (Java 17) | REST API framework |
| Spring Data JPA + Hibernate | ORM layer |
| PostgreSQL | Primary database |
| Spring Security | Security configuration |
| Spring WebFlux (WebClient) | Calling external APIs (Open-Meteo, Groq) |
| Lombok | Boilerplate reduction |

### External APIs
| API | Used For |
|---|---|
| [Open-Meteo](https://open-meteo.com/) | Free real-time weather data (no API key needed) |
| [Groq](https://console.groq.com/) | LLaMA3-70B AI model for the farming chatbot |

---

## 📁 Project Structure

```
Minor1 Farming complete/
├── farmdirect_frontend/        # React + Vite frontend
│   └── src/
│       ├── api/api.js          # All API call functions
│       ├── components/         # Navbar, ProductCard
│       ├── pages/              # All page components
│       ├── App.jsx             # Root component + routing state
│       └── translations.js     # Multi-language strings
│
└── Minor_FarmDirect/           # Spring Boot backend
    └── src/main/java/com/farmdirect/farmdirect_backend/
        ├── farmerauth/         # Farmer register & login
        ├── product/            # Product CRUD
        ├── chat/               # AI chatbot (keyword engine + Groq)
        ├── crop/               # Crop recommendation
        ├── weather/            # Weather via Open-Meteo
        ├── config/             # CORS + Security config
        └── FarmDirectApplication.java
```

---

## ⚙️ Prerequisites

- **Java 17+**
- **Maven** (or use the included `mvnw` wrapper)
- **Node.js 18+** and **npm**
- **PostgreSQL** running locally

---

## 🚀 Getting Started

### 1. Set up the Database

Create a PostgreSQL database:

```sql
CREATE DATABASE farmerdb;
```

The default credentials expected by the app:
- Host: `localhost:5432`
- Database: `farmerdb`
- Username: `postgres`
- Password: `root`

You can change these in `Minor_FarmDirect/src/main/resources/application.properties`.

### 2. (Optional) Add Groq API Key

If you want the AI chatbot to use the Groq LLaMA3 model, add your key in `application.properties`:

```properties
groq.api.key=your_actual_groq_api_key
```

Get a free key at [console.groq.com](https://console.groq.com). Without it, the chatbot still works using the built-in keyword-based engine.

### 3. Start the Backend

```bash
cd "Minor_FarmDirect"
.\mvnw.cmd spring-boot:run
```

The backend starts at **http://localhost:8080**

### 4. Start the Frontend

```bash
cd "farmdirect_frontend"
npm install
npm run dev
```

The frontend starts at **http://localhost:5173**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/farmer/auth/register` | Register a new farmer |
| `POST` | `/api/farmer/auth/login` | Farmer login |
| `GET` | `/api/products/all` | Get all products |
| `GET` | `/api/products/farmer/{id}` | Get products by farmer |
| `POST` | `/api/products/add` | Add a new product |
| `GET` | `/api/weather?city={city}` | Get weather + farming tip |
| `GET` | `/api/crop/recommend?soilType=&rainfall=` | Crop recommendation |
| `GET` | `/api/schemes` | Government schemes list |
| `POST` | `/api/chat` | Farming chatbot |

---

## 🌐 Multi-Language Support

The UI supports 8 languages selectable from the navbar:

`English` · `हिंदी` · `தமிழ்` · `తెలుగు` · `മലയാളം` · `ಕನ್ನಡ` · `বাংলা` · `मराठी`

---

## 🧑‍💻 Team

Built as a Minor Project — a full-stack web application demonstrating a real-world agricultural marketplace with AI and external API integrations.
