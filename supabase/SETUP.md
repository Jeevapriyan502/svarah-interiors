# Supabase Backend Setup — Svarah Interiors

Follow these steps to connect the contact form to your database.

---

## Step 1: Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign up / log in.
2. Click **New project**.
3. Choose an organization, name it **Svarah Interiors**, set a database password, and pick a region close to India (e.g. **Mumbai** or **Singapore**).
4. Wait for the project to finish provisioning (~2 minutes).

---

## Step 2: Run the database schema

1. In your Supabase dashboard, open **SQL Editor**.
2. Click **New query**.
3. Copy the entire contents of `supabase/schema.sql` from this project.
4. Click **Run**.
5. Confirm success — you should see `Success. No rows returned`.

### Verify the table

1. Go to **Table Editor** in the sidebar.
2. You should see a **`leads`** table with columns:
   - `id`, `created_at`, `updated_at`
   - `client_name`, `email`, `phone_number`, `project_type`, `message`
   - `status` (default: `new`)

---

## Step 3: Get your API keys

1. Go to **Project Settings** → **API**.
2. Copy these values:

| Key | Where to use |
|-----|----------------|
| **Project URL** | `NEXT_PUBLIC_SUPABASE_URL` |
| **service_role** (secret) | `SUPABASE_SERVICE_ROLE_KEY` |

> **Never** expose `SUPABASE_SERVICE_ROLE_KEY` in the browser or commit it to Git. It bypasses Row Level Security.

---

## Step 4: Configure environment variables locally

1. In the project root, copy the example file:

```powershell
Copy-Item .env.example .env.local
```

2. Open `.env.local` and paste your real values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Restart the dev server:

```powershell
npm run dev
```

---

## Step 5: Test the backend

### Health check

Open in browser or run:

```powershell
Invoke-WebRequest http://localhost:3000/api/health
```

Expected response:

```json
{ "success": true, "status": "ok", "database": "connected" }
```

### Submit a test lead

1. Open `http://localhost:3000` and scroll to the contact form.
2. Fill in:
   - **Name:** Test User
   - **Gmail ID:** yourname@gmail.com
   - **Phone:** 9025331605
   - **Project type:** Residential
3. Click **Send My Plans**.
4. In Supabase → **Table Editor** → **leads**, confirm the new row appears.

---

## Step 6: Deploy (Vercel)

1. Push your code to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Under **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Redeploy.

---

## API reference

### `POST /api/leads`

Saves a contact form submission.

**Request body:**

```json
{
  "client_name": "Priya Sharma",
  "email": "priya@gmail.com",
  "phone_number": "9025331605",
  "project_type": "Residential",
  "message": "Looking for a full home redesign."
}
```

**Success (201):**

```json
{ "success": true, "leadId": "uuid-here" }
```

**Validation errors (400):**

- Invalid Gmail format
- Invalid Indian phone number
- Missing required fields

### `GET /api/health`

Checks database connectivity. Returns `503` if Supabase is misconfigured.

---

## Viewing leads

- **Supabase Table Editor:** Dashboard → Table Editor → `leads`
- Sort by `created_at` descending to see newest inquiries first
- Update `status` manually: `new` → `contacted` → `qualified` → `closed`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Missing Supabase environment variables` | Create `.env.local` with both keys and restart dev server |
| `Database connection failed` | Re-run `schema.sql` in SQL Editor |
| Form submits but no row in table | Check terminal for Supabase insert errors |
| `23514` constraint error | Gmail must end in `@gmail.com`; phone must be valid Indian mobile |
| Health check works locally but not on Vercel | Add env vars in Vercel project settings |
