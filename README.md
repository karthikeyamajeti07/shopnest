# Intelligent Online Shopping Agent

> **Artificial Intelligence College Case Study & Full-Stack Web Application**  
> An intelligent rational agent that recommends products based on customer preferences, price, ratings, availability, quality, and delivery time using a Multi-Attribute Utility Function.

---

## 1. Project Title & Problem Statement

### **Project Title**
**Intelligent Online Shopping Agent**

### **Problem Statement**
Online shoppers struggle to identify optimal products when balancing competing constraints—such as strict budget caps, delivery deadlines, verified quality tiers, and consumer review ratings. 
Traditional search engines only perform naive keyword matching or binary filtering, leaving the user with information overload.

This project implements an **autonomous rational agent** that perceives customer preferences and catalog records, filters out unviable options, computes multi-attribute utility scores, ranks products by expected utility, and provides transparent, explainable recommendations.

---

## 2. Technology Stack

### **Frontend**
* **React 19** (Component-based SPA architecture)
* **TypeScript** (Strict type definitions across models and API contracts)
* **Tailwind CSS** (Clean, responsive UI with accessible high-contrast palettes)
* **Lucide React** (Universal icon set)

### **Backend**
* **Node.js & Express.js** (Server runtime and REST API service)
* **TypeScript & tsx** (Clean server-side architecture)
* **JSON Persistent Storage** (Self-contained, zero-paid API local database with 32 curated products)
* **Multi-Attribute Utility Recommendation Engine** (Pure algorithmic reasoning engine)

---

## 3. AI Agent Architecture

### **Agent Type: Utility-Based Agent**
> *"The shopping agent is a utility-based agent because it evaluates multiple product attributes and calculates an overall utility score before recommending products."*

Unlike **simple reflex agents** (which execute fixed condition-action rules) or **goal-based agents** (which only check binary success/failure), a **utility-based agent** models trade-offs and calculates *how well* each competing alternative satisfies the user's weighted desires on a 0–100 utility index.

### **The Decision Pipeline**
```
   [Customer Preferences Input]
                ↓
    [Product Sensor Perception] (Live 32+ item catalog)
                ↓
        [Constraint Pruning] (Budget, rating, stock filters)
                ↓
    [Utility Score Calculation] (Weighted MAUT sum, 0-100)
                ↓
        [Candidate Ranking] (Descending by utility index)
                ↓
[Action: Top 3 Recommendations + Explanation]
```

---

## 4. Formal PEAS Specification

| Element | Description | Implementation Details |
| :--- | :--- | :--- |
| **Performance Measure (P)** | Customer satisfaction, recommendation accuracy, adherence to budget, product quality, fast delivery, product availability. | 0–100 composite utility metric rewarding budget savings, high star ratings, fast delivery, and premium build tiers. |
| **Environment (E)** | E-commerce web platform, product database, customers, merchants, logistics delivery systems. | 32 realistic products across 6 categories (Smartphones, Laptops, Headphones, Smart Watches, Shoes, Cameras) priced in INR (₹). |
| **Actuators (A)** | Display recommendations, rank products, filter products, compare products, explain trade-offs. | UI cards, Top-3 badges, score breakdown meters, comparison matrix table, alternative suggestions. |
| **Sensors (S)** | Customer preferences (budget, category, min rating, urgency, priority), product price, rating, stock status, delivery days, specifications. | Web input form controls, REST API query payloads, database schema records. |

---

## 5. Task Environment Classification (PAGE)

1. **Partially Observable**: The agent only senses explicit form inputs and catalog snapshots. It cannot directly observe hidden customer psychological nuances or courier transit disruptions.
2. **Dynamic**: Prices, warehouse stock levels, and transit timelines can change while the agent deliberates.
3. **Discrete**: Catalog items, categories, review stars (1 to 5), and delivery days (1, 2, 3 days) are finite discrete values.
4. **Sequential**: User feedback, filter adjustments, and comparison selections iteratively refine future recommendations.
5. **Multi-Agent**: The shopping agent interacts in an ecosystem of buyer agents, competitor seller agents, and courier logistics agents.
6. **Stochastic**: Real-world warehouse stock depletion and delivery transit delays possess inherent uncertainty.

---

## 6. Multi-Attribute Utility Function & Weights

The total utility $U(P)$ for a candidate product $P$ is computed using the following normalized weight distribution:

$$U(P) = w_{\text{pref}} \cdot S_{\text{pref}} + w_{\text{price}} \cdot S_{\text{price}} + w_{\text{rating}} \cdot S_{\text{rating}} + w_{\text{avail}} \cdot S_{\text{avail}} + w_{\text{deliv}} \cdot S_{\text{deliv}} + w_{\text{qual}} \cdot S_{\text{qual}}$$

### **Attribute Weights (Total = 100%):**
* **Customer Preference Weight ($w_{\text{pref}}$): 30%** — Directly biases the consumer's chosen priority (Balanced, Low Price, High Rating, Fast Delivery, or High Quality).
* **Price Weight ($w_{\text{price}}$): 20%** — Rewards cost-effective options below the customer's budget ceiling.
* **Rating Weight ($w_{\text{rating}}$): 20%** — Normalized $(Rating / 5.0) \times 20$ from verified consumer reviews.
* **Availability Weight ($w_{\text{avail}}$): 10%** — Grants 10 pts for "In Stock" items, 2 pts for backordered/out-of-stock items.
* **Delivery Speed Weight ($w_{\text{deliv}}$): 10%** — Scaled inversely with shipping transit days (1 day = 10 pts, 2 days = 8 pts, 5 days = 3 pts).
* **Quality Index Weight ($w_{\text{qual}}$): 10%** — Direct 1–10 hardware/build tier benchmark.

---

## 7. REST API Endpoints

The backend Express server exposes standard RESTful endpoints:

* `GET /api/products` — Retrieve products with search, category, price, rating, and availability query filters.
* `GET /api/products/:id` — Retrieve single product details and technical specifications.
* `GET /api/categories` — Retrieve all available product categories.
* `POST /api/recommend` — Core Agent Endpoint. Accepts customer preference JSON, runs the recommendation engine, and returns top matches with full utility breakdowns and explanations.
* `GET /api/stats` — Operational telemetry metrics (total products, average rating, in-stock count, query logs).
* `GET /api/health` — Health check endpoint.

---

## 8. Quick Start & Execution

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### Installation & Run
```bash
# 1. Clone repository or open workspace directory
cd /path/to/project

# 2. Install all dependencies
npm install

# 3. Launch full-stack application (Dev mode with Express + Vite on Port 3000)
npm run dev

# 4. Production Build & Start
npm run build
npm start
```
Access the application in your browser at `http://localhost:3000`.

---

## 9. Viva Examination FAQs

**Q1: Why is this a utility-based agent instead of a goal-based agent?**  
*Answer:* A goal-based agent only asks whether a product satisfies the goal (e.g. "Is price ≤ budget?"). If 10 products meet the goal, it cannot decide which is superior. A utility-based agent computes a scalar utility score evaluating the degree of satisfaction across conflicting dimensions (price vs quality vs delivery).

**Q2: Why is normalization essential in multi-attribute utility calculation?**  
*Answer:* Product attributes have incompatible physical units: price is in thousands of Rupees, rating is in 1–5 stars, and delivery is in days. Normalizing every dimension onto a standard scale prevents high-magnitude numbers (e.g. ₹50,000) from overwhelming critical factors like a 4.9★ rating.

**Q3: How does the agent handle zero results when strict constraints are passed?**  
*Answer:* If no products meet all hard constraints (e.g. Budget ₹10,000 for Laptops), the agent executes fallback relaxation: it identifies the closest viable candidate, displays an explanation of which constraint caused the mismatch, and provides alternative options.
