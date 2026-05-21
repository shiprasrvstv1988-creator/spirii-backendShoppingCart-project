# ☕ Brewed With Love: Coffee Shop Backend

A RESTful API backend for an online coffee shop with a shopping cart, built with Node.js, Express and TypeScript. Includes a React frontend that connects to the API.

Built by **Paloma Cardozo**, **Emebet Hunde** and **Shipra Srivastava** as part of the HackYourFuture × Spirii Day 2 Practical Assignment.

🔗 **Live demo:** [https://shopbrewedwithlove.onrender.com](https://shopbrewedwithlove.onrender.com)

---

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Running the Frontend](#running-the-frontend)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Design Decisions](#design-decisions)
- [Deployment](#deployment)

---

## Requirements

- Node.js v22 or higher
- npm

---

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/shiprasrvstv1988-creator/spirii-backendShoppingCart-project
cd spirii-backendShoppingCart-project
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your values (see [Configuration](#configuration)).

**4. Start the development server**

```bash
npm run dev
```

The backend will start on `http://localhost:3000`.

---

## Running the Frontend

**1. Install frontend dependencies**

```bash
npm --prefix frontend install
```

**2. Configure frontend environment**

Create `frontend/.env.local` with:

```
VITE_API_URL=
```

Leave the value empty for local development. The Vite proxy will forward requests to the backend automatically.

**3. Start the frontend**

```bash
npm run frontend:dev
```

The app will start on `http://localhost:5173`.

---

## Configuration

### Backend: `.env`

| Variable      | Description                | Example                 |
| ------------- | -------------------------- | ----------------------- |
| `PORT`        | Port the server listens on | `3000`                  |
| `CORS_ORIGIN` | Allowed frontend origin    | `http://localhost:5173` |

### Frontend: `frontend/.env.local`

| Variable       | Description          | Example                               |
| -------------- | -------------------- | ------------------------------------- |
| `VITE_API_URL` | Backend API base URL | `https://brewedwithlove.onrender.com` |

> Leave `VITE_API_URL` empty for local development. Set it to the deployed backend URL in production.

---

## Project Structure

```
├── data/
│   ├── cart.json                ← persisted cart data (starts as [])
│   └── product.json             ← coffee product catalogue
├── frontend/                    ← React + TypeScript + Vite frontend
|   ├── public/
│   ├── src/
|   │   ├── assets/
│   │   ├── public/
|   │   ├── constants/
|   |   |   └── navLinks.ts
|   |   ├── api.ts               ← functions for calling the backend API
│   │   ├── types.ts             ← shared TypeScript types
│   │   ├── components/
│   │   │   └── ProductCard.tsx  ← product card component
│   │   ├── context/
│   │   │   └── CartContext.tsx  ← cart state connected to backend
│   │   ├── hooks/
│   │   │   └── useProducts.ts   ← hook for loading products from API
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   └── CheckoutSuccess.tsx
|   |   ├── App.css
|   |   ├── index.css
|   |   ├── main.tsx
│   │   └── App.tsx              ← routing and layout
|   ├── .env.example
|   ├── .gitignore
|   ├── eslint.config.js
|   ├── index.html
|   ├── README.md
|   ├── package-lock.json
|   ├── package.json
|   ├── tsconfig.app.json
|   ├── tsconfig.json
|   ├── tsconfig.node.json
│   └── vite.config.ts           ← Vite config with API proxy
├── src/
│   ├── data/
│   │   ├── cartData.ts          ← read/write cart JSON with mutex
│   │   └── productionData.ts    ← read product JSON
│   ├── middleware/
│   │   └── validate.ts          ← request body validation
│   ├── routes/
│   │   ├── cart.ts              ← cart endpoints
│   │   ├── checkout.ts          ← checkout endpoint
│   │   └── products.ts          ← products endpoint
│   ├── services/
│   │   └── cartService.ts       ← business logic
│   ├── types/
│   │   └── index.ts             ← shared TypeScript types
│   └── index.ts                 ← Express app entry point
├── .env.example
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
├── package-lock.json
├── README.md
└── Coffee-Shop-API.postman_collection.json
```

---

## API Endpoints

Import `Coffee-Shop-API.postman_collection.json` into Postman to test all endpoints.

### Products

| Method | Endpoint    | Description                       |
| ------ | ----------- | --------------------------------- |
| GET    | `/products` | Get all available coffee products |

**Example response:**

```json
[
  {
    "id": "1",
    "name": "Espresso",
    "description": "Strong and bold coffee",
    "price": 25,
    "available": true
  },
  {
    "id": "2",
    "name": "Latte",
    "description": "Espresso with steamed milk",
    "price": 35,
    "available": true
  }
]
```

---

### Cart

| Method | Endpoint                     | Description                |
| ------ | ---------------------------- | -------------------------- |
| POST   | `/cart`                      | Create a new cart          |
| GET    | `/cart/:id`                  | Get a cart by ID           |
| POST   | `/cart/:id/items`            | Add an item to a cart      |
| PUT    | `/cart/:id/items/:productId` | Update item quantity       |
| DELETE | `/cart/:id/items/:productId` | Remove an item from a cart |

**POST `/cart`**: no body required

Example response:

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "items": [],
  "status": "active",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**POST `/cart/:id/items`**: body:

```json
{ "productId": "1", "quantity": 2 }
```

**PUT `/cart/:id/items/:productId`**: body:

```json
{ "quantity": 5 }
```

---

### Checkout

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| POST   | `/checkout/:id` | Checkout a cart and get the total |

Example response:

```json
{
  "cartId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "items": [{ "productId": "1", "quantity": 2, "unitPrice": 25 }],
  "total": 50
}
```

After checkout, the cart status changes to `checked_out`.

---

### Error responses

All errors follow this shape:

```json
{ "error": "Descriptive error message" }
```

| Status | Meaning                                          |
| ------ | ------------------------------------------------ |
| `400`  | Invalid input (missing fields, invalid quantity) |
| `404`  | Resource not found (cart, product, or item)      |
| `500`  | Unexpected server error                          |

---

## Design Decisions

**Prices in whole kroner (integers)**
All prices are stored and calculated as whole numbers in Danish kroner, avoiding floating point precision issues.

**Cart IDs generated server-side**
Cart IDs are generated using `crypto.randomUUID()`. The client never sends an ID when creating a cart. This prevents ID collisions and tampering.

**Unit price stored on CartItem**
When an item is added to a cart, the product's current price is stored on the `CartItem`. This ensures the checkout total reflects the price at the time of adding, not the current price if it changes later.

**Cart status after checkout**
After a successful checkout, the cart status changes to `checked_out`. The cart is preserved in the data store for reference. It is not deleted. The frontend automatically creates a new cart after checkout.

**No user authentication**
Users are identified solely by their cart ID. The frontend stores the cart ID in `localStorage` so the user keeps the same cart after refreshing the page.

**JSON file persistence**
Cart and product data are stored in JSON files under `data/`. This keeps the setup simple. No database installation required.

**Concurrent write protection**
`saveCart` uses a mutex (`async-mutex`) to prevent data corruption when multiple requests try to write to `cart.json` at the same time. Only one write operation can run at a time.

**Layered architecture**
Code is split into four layers: data access (`src/data/`), business logic (`src/services/`), HTTP handling (`src/routes/`), and input validation (`src/middleware/`). Each layer has a single responsibility and does not reach into another layer's concern.

**CORS configuration**
The allowed frontend origin is read from the `CORS_ORIGIN` environment variable. This makes it easy to switch between local development and production without changing the code.

---

## Deployment

The project is deployed on [Render](https://render.com):

- **Backend (Node.js service):** [https://brewedwithlove.onrender.com](https://brewedwithlove.onrender.com)
- **Frontend (Static site):** [https://shopbrewedwithlove.onrender.com](https://shopbrewedwithlove.onrender.com)

### Environment variables in production

**Backend service:**

| Variable      | Value                                     |
| ------------- | ----------------------------------------- |
| `PORT`        | Set by Render automatically               |
| `CORS_ORIGIN` | `https://shopbrewedwithlove.onrender.com` |

**Frontend service:**

| Variable       | Value                                 |
| -------------- | ------------------------------------- |
| `VITE_API_URL` | `https://brewedwithlove.onrender.com` |
