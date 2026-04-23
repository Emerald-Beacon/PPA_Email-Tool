# PrincePerelson Recruiting Email Builder

An internal web app for PrincePerelson & Associates that helps non-technical team members create branded, Outlook-friendly recruiting emails without editing code.

## What this app does

- Provides four PrincePerelson-specific outreach templates:
  - Job Opportunity
  - Candidate Introduction
  - Event Invitation
  - General Outreach / Update
- Uses a form-based editing experience with sensible default copy.
- Generates branded HTML optimized for copy/paste into Outlook desktop.
- Supports optional hero/banner and recruiter headshot uploads.
- Includes live preview, validation, copy actions, download action, and reset/new-email flows.

## Suggested project structure

```text
.
├── public/
│   └── assets/
│       ├── README.md
│       └── logos/
│           ├── ppa-logo-mark-inverse.svg
│           ├── ppa-logo-mark.svg
│           └── ppa-logo-primary.png
├── src/
│   ├── components/
│   ├── config/
│   ├── templates/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── netlify.toml
├── package.json
└── vite.config.ts
```

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npm run dev
```

### 3. Create a production build

```bash
npm run build
```

## Deploying to Netlify

This project is configured to deploy cleanly on Netlify.

### Option 1: Deploy with Git + Netlify UI

1. Push the repo to GitHub.
2. In Netlify, create a new site from Git.
3. Use these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

### Option 2: Drag-and-drop deploy

1. Run `npm run build`.
2. Upload the generated `dist` folder to Netlify.

`netlify.toml` is already included with the correct build and SPA redirect configuration.

## Replacing placeholder PrincePerelson assets

Placeholder logo files are included so the app runs immediately.

To swap in approved brand files:

1. Replace these files while keeping the same names:
   - `public/assets/logos/ppa-logo-primary.png`
   - `public/assets/logos/ppa-logo-mark.svg`
2. Optional: replace `public/assets/logos/ppa-logo-mark-inverse.svg` if you want a dark-background version for future app or marketing use.
3. Restart the dev server if it is already running.

If you need to change filenames, update the paths in `src/config/branding.ts`.

The current SVG logos are cleaned recreations based on screenshot references. They are suitable for initial internal use, but official vector source files from PrincePerelson would still be the best long-term replacement.

## Outlook usage notes

- The generated email uses a table-based layout and inline styles for stronger Outlook compatibility.
- The email font stack is `Montserrat, Arial, Helvetica, sans-serif`.
- Outlook may fall back to Arial or Helvetica when Montserrat is unavailable, which is expected.
- `Copy Rendered Email for Outlook` attempts to place rich HTML on the clipboard for a better paste result.
- Because clipboard support varies by browser, final emails should always be reviewed in Outlook before sending.

## Maintenance notes

- Shared brand settings live in `src/config/branding.ts`.
- Default content and template metadata live in `src/config/templates.ts`.
- The email HTML rendering logic is isolated in `src/templates/renderEmailHtml.ts`.
- To add another template later:
  1. Extend the `EmailTemplateId` type in `src/types/email.ts`
  2. Add the template metadata and defaults in `src/config/templates.ts`
  3. Adjust the email rendering logic if the new template needs different structure

## Product decisions

- Built specifically for PrincePerelson recruiting and business outreach workflows, not as a generic newsletter tool.
- Prioritizes stability, clarity, and Outlook-friendly output over advanced front-end effects.
- Keeps email generation logic separate from the app UI so the tool remains easy to maintain.
