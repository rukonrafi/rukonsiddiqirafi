# ラフィ・ルコン・シディキ - ポートフォリオサイト (Rafi Rukon Siddiqi — Portfolio Website)

A modern, professional, bilingual (Japanese / English, Japanese by default) personal portfolio
website built with **plain HTML5, CSS3, and Vanilla JavaScript**. No frameworks, no build tools,
no npm, no backend — just open it in a browser.

---

## 1. Project Overview

This site presents Rafi Rukon Siddiqi's education, skills, work experience, internships, and
personal projects to Japanese recruiters and companies. Content was sourced from the resume
(履歴書) and work-history document (職務経歴書) provided, with sensitive personal details
(full address, phone number, date of birth, visa expiration date) intentionally left out of the
public site.

Key features:
- Dark / light mode with saved preference (localStorage)
- Japanese ⇄ English language toggle (Japanese is the default)
- Glassmorphism cards, gradients, scroll-reveal animations, animated background
- Fully responsive from 320px mobile up to large desktop
- Frontend-only contact form (opens the visitor's email app via `mailto:`)
- Loading screen, typing animation, back-to-top button, animated copyright year

---

## 2. Folder Structure

```
rafi-portfolio/
│
├── index.html                  ← Main page (all content lives here)
├── README.md                   ← This file
│
├── css/
│   ├── style.css                ← Core styles, variables, components, animations
│   └── responsive.css           ← Media queries (tablet / phone / 320px)
│
├── js/
│   └── script.js                ← All interactivity (theme, language, form, etc.)
│
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   ├── profile-main.jpg       ← Hero / formal portrait photo
│   │   │   ├── profile-secondary.jpg  ← About Me photo
│   │   │   └── profile-extra.jpg      ← Extra photo (not yet used — see below)
│   │   ├── projects/
│   │   │   ├── classorbit-logo.png       ← ClassOrbit project logo (uploaded)
│   │   │   ├── classorbit-preview.jpg    ← ClassOrbit screenshot placeholder
│   │   │   └── rsr-scanner-preview.jpg   ← RSR Scanner screenshot placeholder
│   │   └── placeholders/
│   │       └── project-placeholder.jpg   ← Generic fallback project image
│   │
│   ├── icons/
│   │   └── favicon.svg
│   │
│   ├── documents/
│   │   └── resume.pdf           ← PLACEHOLDER —  resume (see below)
│   │
│   └── fonts/                   ← Empty; site currently uses Google Fonts (Noto Sans JP,
│                                    Space Grotesk) loaded via CDN in index.html <head>
│
└── .vscode/
    └── settings.json            ← Live Server configuration
```

**Note on `profile-extra.jpg`:** to avoid an overcrowded page, this third photo isn't placed in
the layout by default. If you'd like a small personal gallery, you can add an `<img>` referencing
`assets/images/profile/profile-extra.jpg` inside the About section of `index.html`.

---

## 3. Opening the Project in VS Code

1. Download / unzip the `rafi-portfolio` folder anywhere on your computer.
2. Open **Visual Studio Code**.
3. Go to `File → Open Folder...` and select the `rafi-portfolio` folder.
4. You'll see the full file tree in the Explorer sidebar on the left.

---

## 4. Installing the Live Server Extension

1. In VS Code, click the **Extensions** icon in the left sidebar (or press `Ctrl+Shift+X` /
   `Cmd+Shift+X`).
2. Search for **"Live Server"** by Ritwick Dey.
3. Click **Install**.

---

## 5. Running the Website with Live Server

1. Right-click on `index.html` in the file explorer.
2. Select **"Open with Live Server"**.
3. Your default browser opens automatically at `http://127.0.0.1:5500/index.html`
   (port 5500 is pre-configured in `.vscode/settings.json`).
4. Any time you save a file, the page reloads automatically.

---

## 6. Running `index.html` Without Live Server

You don't need Live Server or any server at all:

1. Locate `index.html` in the `rafi-portfolio` folder using File Explorer / Finder.
2. Double-click it (or right-click → "Open with" → your browser).
3. The site opens directly using the `file://` protocol — all CSS, JS, and images load correctly
   because every reference in the code uses **relative paths**.

---

## 7. Replacing the Profile Image

The hero section uses:
```
assets/images/profile/profile-main.jpg
```
The About section uses:
```
assets/images/profile/profile-secondary.jpg
```
To replace either photo:
1. Add your new image file into `assets/images/profile/`.
2. Either rename your file to match the existing filename above, **or**
3. Update the `src="..."` path in `index.html` (search for `<!-- Add profile photo here -->`
   and `<!-- Secondary professional photo -->`).

Recommended: square-ish or portrait-oriented photos work best; the CSS uses `object-fit: cover`,
so photos are cropped neatly without stretching.

---

## 8. Adding the Resume PDF

The **Download Resume** button in the hero section points to:
```
assets/documents/resume.pdf
```

職務経歴書は次のファイル名で保存してください。

```text
assets/documents/work-history.pdf
```
Currently this is a placeholder file. To add your real resume:
1. Export/save your resume as a PDF.
2. Replace `assets/documents/resume.pdf` with your file (keep the same filename, or update the
   `href` in `index.html` where you see `<!-- Add CV file here -->`).

⚠️ **Privacy reminder:** since this file will be publicly downloadable from your live website,
consider removing your full home address, phone number, date of birth, and visa expiration date
from the PDF version you publish — the same privacy rule applied to the rest of this site.

---

## 9. Editing Personal Information

Personal info lives directly in `index.html`. Look for these comment markers:
```html
<!-- Change profile information here -->
```
Key places to update:
- **Hero section** (`id="home"`): name, title, short intro, typing-animation phrases
  (in `js/script.js`, look for `typingPhrases`)
- **About section** (`id="about"`): self-introduction paragraphs and the `.info-card` (safe
  personal details: nationality, location, status, graduation date, hobbies)
- **Contact section** (`id="contact"`): email address (appears twice — in the info card and in
  `js/script.js` inside the `recipient` constant)

Each bilingual text element uses two attributes:
```html
<span data-ja="日本語テキスト" data-en="English text">日本語テキスト</span>
```
Edit both `data-ja` and `data-en` (and the visible text between the tags, which should match
`data-ja` since Japanese is the default language).

---

## 10. Changing GitHub and LinkedIn Links

Search `index.html` for these comments and update the `href` values:
```html
<!-- Add GitHub link here -->
<a href="https://github.com/rukonrafi" ...>

<!-- Add LinkedIn link here -->
<a href="https://www.linkedin.com/in/rukonrafi" ...>
```
These appear in the **hero section**, the **footer**, and the **contact section**.

---

## 11. Adding Project Links

Each project card in the `id="projects"` section has a `<!-- Add live project link here -->` or
similar comment above its GitHub / Live Demo buttons. Currently:

- **ClassOrbit**: GitHub points to `https://github.com/rukonrafi` (update to the exact repo URL
  once available) and the Live Demo already links to `https://classorbit-tan.vercel.app`.
- **RSR Scanner**: both GitHub and Live Demo currently use `href="#"` placeholders. Replace the
  `#` with your real repository and deployed app URLs once available.

---

## 12. Changing Colors

All colors are defined as CSS variables at the top of `css/style.css` inside `:root`:
```css
:root {
  --color-primary: #1E3A5F;
  --color-primary-light: #2C5A8C;
  --color-secondary: #D4A054;
  --color-secondary-light: #E8C285;
  --color-bg: #F5F7FA;
  --color-bg-alt: #ECEFF4;
  --color-text: #1C2430;
  --color-text-muted: #5B6472;
  --color-card-bg: rgba(255, 255, 255, 0.65);
  --color-border: rgba(30, 58, 95, 0.12);
  --color-shadow: rgba(30, 58, 95, 0.12);
  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 28px;
}
```
Dark mode overrides are in the `[data-theme="dark"]` block right below. Change any hex/rgba value
and the entire site updates automatically — no other files need to change.

---

## 13. Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `rafi-portfolio`).
2. Push this folder's contents to the repository:
   ```bash
   cd rafi-portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/rafi-portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder
   `/ (root)`.
5. Save. Your site will be live at `https://<your-username>.github.io/rafi-portfolio/` within a
   few minutes.

---

## 14. Deploying to Netlify

**Option A — Drag and drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire `rafi-portfolio` folder onto the page.
3. Netlify builds and hosts it instantly, giving you a live URL.

**Option B — Git-based deploy:**
1. Push the project to GitHub (see steps above).
2. In Netlify, click **Add new site → Import an existing project**.
3. Connect your GitHub account and select the repository.
4. Leave the build command empty and set the publish directory to `/` (root), since this is a
   static site with no build step.
5. Click **Deploy site**.

(Deploying to Vercel is nearly identical: import the GitHub repo, leave "Framework Preset" as
"Other", and leave build/output settings at their defaults.)

---

## 15. Troubleshooting

**Images or styles don't load when opening `index.html` directly:**
Make sure you didn't rename or move any folders (`css/`, `js/`, `assets/`) — all paths in the code
are relative to `index.html`'s location.

**Live Server doesn't reload automatically:**
Check that Live Server is actually running (look for "Port: 5500" in the VS Code status bar).
Restart it by clicking the status bar item and selecting "Open with Live Server" again.

**Dark mode / language choice doesn't persist:**
This is stored in your browser's `localStorage`. If you're in a private/incognito window, or have
site data blocked, preferences won't be saved between visits.

**The contact form doesn't "send" an email:**
This is expected — there is no backend server. Submitting the form opens the visitor's *default
email application* with a pre-filled message (via a `mailto:` link). If their device has no email
app configured, nothing will visibly open; in that case they should email the address shown in
the Contact section directly. To use a real backend instead (e.g. Formspree), replace the
`mailto:` logic inside the form submit handler in `js/script.js`.

**Fonts look different than expected:**
The site loads "Noto Sans JP" and "Space Grotesk" from Google Fonts via CDN links in
`index.html`'s `<head>`. This requires an internet connection. If you're fully offline, the site
will fall back to system fonts automatically — everything still works, just with a slightly
different look.

**Mobile menu doesn't close after clicking a link:**
This should happen automatically via `js/script.js`. If you've heavily edited the navigation
markup, make sure each link still has the `nav-link` class, since the script listens for clicks
on that class.

---

Made with HTML, CSS, and JavaScript — no frameworks required. 🎓
