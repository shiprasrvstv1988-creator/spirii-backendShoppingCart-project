# ☕ Coffee Shop Backend

A RESTful API backend for an online coffee shop with a shopping cart, built with Node.js, Express and TypeScript.

Built by **Paloma Cardozo**, **Shipra Srivastava** and **Emebet Hunde** as part of the HackYourFuture × Spirii Practical Assignment.

---

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Design Decisions](#design-decisions)

---

## Requirements

- Node.js v18 or higher
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

The server will start on `http://localhost:3000`.

---

## Configuration

Create a `.env` file in the root of the project with the following variables:

| Variable | Description                | Example |
| -------- | -------------------------- | ------- |
| `PORT`   | Port the server listens on | `3000`  |

---

## Project Structure

```
├── data/
│   ├── cart.json             ← persisted cart data
│   └── product.json          ← coffee product catalogue
├── src/
│   ├── data/
│   │   ├── cartData.ts       ← read/write cart JSON
│   │   └── productionData.ts ← read product JSON
│   ├── middleware/
│   │   └── validate.ts       ← request body validation
│   ├── routes/
│   │   ├── cart.ts           ← cart endpoints
│   │   ├── checkout.ts       ← checkout endpoint
│   │   └── products.ts       ← products endpoint
│   ├── services/
│   │   └── cartService.ts    ← business logic
│   ├── types/
│   │   └── index.ts          ← shared TypeScript types
│   └── index.ts              ← Express app entry point
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── Coffee-Shop-API.postman_collection.json
```

---

## API Endpoints

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

**POST `/cart`**. No body required

Example response:

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "items": [],
  "status": "active",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**POST `/cart/:id/items`**. Body:

```json
{ "productId": "1", "quantity": 2 }
```

**PUT `/cart/:id/items/:productId`**. Body:

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
| `404`  | Resource not found (cart, product, item)         |
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
After a successful checkout, the cart status changes to `checked_out`. The cart is preserved in the data store for reference. It is not deleted.

**No user authentication**
Users are identified solely by their cart ID.

**JSON file persistence**
Cart and product data are stored in JSON files under `data/`. This keeps the setup simple. No database installation required.

**Layered architecture**
Code is split into four layers: data access (`src/data/`), business logic (`src/services/`), HTTP handling (`src/routes/`), and input validation (`src/middleware/`). Each layer has a single responsibility and does not reach into another layer's concern.
