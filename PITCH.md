# TerraNode — Pitch Script (2–3 minutes)

> **How to use this doc:** Read the bold lines out loud. Use the “Simple math” boxes when a judge asks “how do you calculate that?” Skip the appendix unless someone wants numbers.

---

## Opening (15 seconds)

**Every time we build an AI data center, we take land and water that could grow food.**

Carbon credits don’t fix that. TerraNode does.

We help AI companies **measure** that footprint, then **pay to restore real land** in Kenya — and anyone can chip in from their phone.

---

## The problem (20 seconds)

**AI isn’t invisible.** It lives in huge buildings full of GPUs.

Those buildings sit on **arable land** — land that could farm food. They also drink **massive amounts of water** for cooling.

Today’s offset market talks about **carbon**. Almost nobody talks about **soil, wetlands, and water**.

**That’s the gap TerraNode fills.**

---

## Our solution (25 seconds)

**TerraNode is a marketplace for land restoration credits.**

1. **AI companies** use our calculator to see their **“Arable Land Debt”** — how much land and water their cluster costs the planet.
2. They buy **restoration credits** that fund real projects.
3. **Anyone** can browse projects and fund them — we simulate M-Pesa for the demo.

All payments in this MVP are **fake**. The UX and math are **real**.

---

## Live demo script (60 seconds)

*Do this while clicking through the app.*

1. **Landing page** — “This is TerraNode. Warm design on purpose: we’re selling **land**, not servers.”
2. **Calculator** — “Say you run **1,000 H100 GPUs**, **22 hours a day**, **liquid cooling**.” → Hit Calculate.
3. **Results** — “You owe about **13,000 square meters** of impact. That’s roughly **$112,000** to offset, or **133 credits**.”
4. **Corporate flow** — “Pick Gold tier, choose two projects, fake checkout — you get a certificate.”
5. **Projects** — “Filter agricultural, open **Nakuru**, fund **$25** via M-Pesa simulation — you just ‘restored’ a few square meters of farmland.”

**Closer line:** “We turned an abstract GPU bill into a **visible patch of restored earth**.”

---

## Simple math — explain it like you’re talking to a friend

### The one sentence version

**We add up (1) how much land the data center needs and (2) how much water it uses, convert the water into ‘land equivalent,’ then price the total in dollars.**

---

### Piece 1 — “How much land does the building need?”

**Think parking lots, not just chips.**

- We assume **8 GPUs = 1 rack** (industry rule of thumb).
- Each rack needs about **12.5 m²** of land if you only counted the racks.
- Real sites are bigger — roads, power, cooling, fences. We multiply by **2.3×**.

**Analogy:**  
*It’s not just the house — it’s the driveway, yard, and utility easement.*

**Example (1,000 GPUs):**

| Step | Plain English | Number |
|------|---------------|--------|
| Racks | 1,000 ÷ 8, round up | **125 racks** |
| Rack land | 125 × 12.5 m² | **1,563 m²** |
| Full site | × 2.3 for “everything around the racks” | **≈ 3,594 m²** |

That **3,594 m²** is the **land footprint** on the dashboard.

---

### Piece 2 — “How thirsty is this cluster?”

**More GPUs + longer hours + worse cooling = more water.**

- **Air cooling** uses the most water per hour (**3.7 L** per GPU per hour).
- **Liquid** uses the least (**1.2 L**).
- **Hybrid** is in the middle (**2.4 L**).

**Formula in words:**  
*GPUs × hours per day × liters per GPU per hour × 365 days = liters per year.*

**Same example (1,000 GPUs, 22 h/day, liquid):**

- Per day: 1,000 × 22 × 1.2 = **26,400 liters**
- Per year: × 365 = **≈ 9.6 million liters**

**Analogy:**  
*That’s thousands of swimming pools a year — for one cluster.*

---

### Piece 3 — “Why turn water into land?”

**We want one number a buyer can understand: square meters to fix.**

We use a simple rule:

> **1,000 liters of water per year ≈ 1 m² of “farm-style” land impact.**

So:

- 9.6 million liters ÷ 1,000 = **≈ 9,636 m²** “water debt” in land terms.

**Analogy:**  
*If you flood-irrigate a field all year, that water has a land cost — we’re approximating that in one line.*

---

### Piece 4 — “What’s my total debt?”

**Add land + water-equivalent land.**

| Part | m² |
|------|-----|
| Land footprint | 3,594 |
| Water equivalent | 9,636 |
| **Total arable land debt** | **≈ 13,230 m²** |

**Analogy:**  
*You owe two bills — rent for the building’s footprint **and** a water bill expressed as land. We merge them into one tab.*

---

### Piece 5 — “What do I pay?”

**Credits**

- **1 credit = 100 m²** of verified restoration (our unit of “done”).
- Debt ÷ 100, round up = credits to buy.

**Money**

- **$8.50 per m²** of debt (restoration cost in the model).

**Same example:**

| | |
|--|--|
| Credits | 13,230 ÷ 100 → **133 credits** |
| Cost | 13,230 × $8.50 → **≈ $112,453** |

**Analogy:**  
*Like buying 133 “100 m² gift cards” for nature at $8.50 per square meter.*

---

### Piece 6 — “What happens when someone funds $25?”

On a project page:

**m² you helped = dollars ÷ cost per m² for that project**

Example: $25 on a site that costs **$8.50/m²** → 25 ÷ 8.5 ≈ **2.9 m²**.

The app updates funding bars and shows a receipt. **No real money** in the demo.

---

## If they ask “is this scientifically perfect?”

**Honest answer (say this confidently):**

> “This is a **hackathon model**, not a peer-reviewed LCA. We use transparent assumptions — 8 GPUs per rack, 2.3× site overhead, cooling-based water rates — so teams can **debate and improve** the coefficients. The product value is **making land debt visible and fundable**, not claiming the last decimal of a lifecycle analysis.”

---

## Sound bites (memorize two)

1. **“Carbon offsets the smoke. TerraNode offsets the soil.”**
2. **“Your GPU cluster has a address on Earth. We help you pay rent to the land.”**

---

## FAQ — one-liners

| Question | Answer |
|----------|--------|
| Why Kenya? | Demo data: diverse wetlands, forest, farmland — easy story for judges. |
| Real payments? | Not in MVP — M-Pesa and corporate checkout are simulated. |
| Real satellite proof? | Roadmap — we show a **D-MRV score** on cards as a placeholder. |
| Why not just donate? | We **tie dollars to m²** and **credits**, so AI buyers can report an offset metric. |
| Biggest number on landing? | **2.4M m²** = narrative stat for “AI land displacement”; live totals come from the database. |

---

## Appendix — formulas (for judges who want the real code)

```
racks          = ceil(gpuCount / 8)
landFootprint  = racks × 12.5 × 2.3

annualWater    = gpuCount × hoursPerDay × waterPerHour[cooling] × 365
waterAsLand    = annualWater / 1000

arableLandDebt = landFootprint + waterAsLand

credits        = ceil(arableLandDebt / 100)
costUSD        = arableLandDebt × 8.50
```

**Cooling — liters per GPU per hour:** air `3.7` · liquid `1.2` · hybrid `2.4`

Implementation: `server/src/lib/calculator.js` and `server/src/lib/constants.js`

---

## Closing (10 seconds)

**TerraNode makes AI’s land and water footprint impossible to ignore — and gives companies and communities one place to pay it back.**

Thank you. Happy to run the calculator live with your numbers.
