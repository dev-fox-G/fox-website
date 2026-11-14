# DevFox website

Built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4**.
The site is exported as static HTML, so it can be hosted on GitHub Pages, Netlify, Vercel or any static host.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the EmailJS values (see below)
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build       # creates the static site in ./out
npm run typecheck   # TypeScript check
```

## Project structure

```
src/
  app/            layout.tsx, page.tsx, globals.css (design tokens), icon.png (favicon)
  components/     Header, Hero, Services, Work, Stack, About, Team, Contact, ContactForm, Footer ...
  data/site.ts    ALL editable content: contact details, social links, services, projects, team
  hooks/          useActiveSection (nav highlight)
  assets/         logo and team photos
  lib/ui.ts       shared class helpers
```

Almost everything you will want to change (text, links, projects, team) is in **`src/data/site.ts`**.

## 1. Make the contact form send email (EmailJS)

1. Create a free account at https://www.emailjs.com
2. **Email Services** > **Add New Service** > **Gmail** > connect `innovibetech.official@gmail.com`. Copy the **Service ID**.
3. **Email Templates** > **Create New Template**:

   | Field | Value |
   | --- | --- |
   | To Email | `innovibetech.official@gmail.com` |
   | From Name | `{{from_name}}` |
   | Reply To | `{{from_email}}` |
   | Subject | `New project inquiry from {{from_name}}` |

   Content:

   ```
   Name: {{from_name}}
   Email: {{from_email}}
   Company: {{company}}
   Service: {{project_type}}
   Budget: {{budget}}

   Message:
   {{message}}
   ```

   Copy the **Template ID**.
4. **Account** > **General** > copy your **Public Key**.
5. Put the three values in `.env.local`:

   ```
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   ```
6. Recommended: in EmailJS go to **Account** > **Security** and allow only your website's domain.

## 2. Replace the placeholders (in `src/data/site.ts`)

| Search for | Replace with |
| --- | --- |
| `92XXXXXXXXXX` | WhatsApp number, international format, digits only (e.g. `923001234567`) |
| `YOUR-COMPANY-PAGE` | LinkedIn company page name |
| `YOUR-COMPANY-HANDLE` | Instagram username |
| `ASSAM-PROFILE`, `IZRAR-PROFILE` | Each founder's LinkedIn profile name |
| `ASSAM-HANDLE`, `IZRAR-HANDLE` | Each founder's Instagram username |
| `+92 300 0000000` / `tel:+923000000000` | Your real phone number |

### Project links ("Selected work")

Each project image is a link that opens the project's live website in a new tab. In `src/data/site.ts`, set the `url` of every project:

| Search for | Replace with |
| --- | --- |
| `https://YOUR-NEXABANK-WEBSITE.com` (and the 3 other `YOUR-...-WEBSITE.com`) | The real website address of that project |

The four projects are sample entries. Replace the names, text and links with your real projects.

### Team cards

Team members are cards in the signature layout (sliced photo, divider, logo, name, role, email, social icons).
To add someone, copy one entry in the `team` array in `src/data/site.ts`, add the photo to `src/assets/`, and set `focus` (x, y = middle of the eye line, width = cheek to cheek, all as fractions of the photo,
for example `{ x: 0.51, y: 0.33, width: 0.285 }`). The card places the face exactly where the design needs it. An optional `email` field shows a personal
email instead of the company email.

## 3. Deploy to GitHub Pages

1. Push this project to your GitHub repository (branch `main`).
2. **Settings** > **Pages** > **Source: GitHub Actions**.
3. **Settings** > **Secrets and variables** > **Actions** > **Variables** tab: add
   `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`.
4. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

The workflow sets the base path automatically, so it works both on `username.github.io/repo-name` and on a custom domain.
