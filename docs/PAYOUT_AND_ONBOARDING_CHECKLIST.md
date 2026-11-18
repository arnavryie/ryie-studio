# Payout & Zero-Cost Hosting Checklist

Do **not** spend money on domains, servers, or paid SaaS tools until a client pays their deposit.

---

## 1. Payment Setup (₹0 Upfront)

- **Indian Clients (INR):**
  - Direct **UPI / Bank IMPS** works immediately for local Pune businesses (zero gateway fees).
  - **Razorpay Payment Links / Pages** (free to open with PAN + bank account) if a client wants card/netbanking + clean receipts.
- **International Clients (USD / EUR):**
  - **Wise** or **Payoneer** (USD receiving account details, deposits directly into your Indian bank account in INR) — check KYC approval early because verification takes 2–5 business days!
  - **Upwork / Contra** handle client escrow automatically if you close via those platforms.

## 2. Clean 50/50 Scope Rule (Protects You From Ghosting)

1. **Before coding custom pages:** send the custom `/demo/:niche?...` preview link.
2. **To start the sprint:** require **50% deposit upfront** + exact scope list (e.g., max 5 pages, 2 revision rounds, client provides domain/logo/copy).
3. **Final 50%:** collect **before** transferring final GitHub repository / connecting their custom production domain (`CNAME` / `A` records).

## 3. Zero-Rupee Hosting Stack for Client Builds

- **Frontend / Full-stack Next.js:** **Vercel Hobby** (free) or deploy directly to the **client's own Vercel/Netlify account** on handover.
- **Python / FastAPI Backends:** Use your existing **$50 Render credit** strictly for live client staging demos during close calls; move client production backends onto the client's own billing tier at handover.
- **Database / Auth:** **Supabase Free Tier** (2 free projects) or transfer ownership to client org on launch.
