# ESPRESSO TECH — Coming Soon Website

A minimalist, high-performance "Brewing Soon" landing page for **ESPRESSO TECH** (Software Development Company). Built with React 19, TypeScript, Vite, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS 3
- **Icons:** Inline SVG / Lucide Icons
- **Deployment:** GitHub Pages (Automated via GitHub Actions)

---

## 📂 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions automated deployment
├── dist/                   # Production build output
├── src/
│   ├── components/
│   │   ├── BrandHeader.tsx # Header branding & subtitle
│   │   ├── BrewingText.tsx # Hero headline & mini-game trigger CTA
│   │   ├── BrewGame.tsx    # Interactive "Brew The Bean" mini-game modal
│   │   └── Footer.tsx      # Minimal brand footer
│   ├── App.tsx             # Root application component
│   ├── index.css           # Global typography & Tailwind styles
│   └── main.tsx            # Vite React entrypoint
├── index.html              # HTML shell & SEO meta tags
├── package.json            # Project dependencies & build scripts
├── tailwind.config.js      # Custom theme colors & shadows
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration with GitHub Pages base path
```

---

## 🛠️ Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/ESPRESSO-TECH/](http://localhost:5173/ESPRESSO-TECH/) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```
   Generates optimized static assets inside the `dist/` directory.

---

## 🌐 Deploying to GitHub Pages

### Method 1: Automated via GitHub Actions (Recommended)
1. Push this repository to GitHub.
2. In your GitHub repository, navigate to:
   **Settings** → **Pages**
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site upon every push to `main` or `master`.

> **Note on Base URL:**
> If your GitHub repository name is different from `ESPRESSO-TECH`, update the `base` property in `vite.config.ts`:
> ```ts
> export default defineConfig({
>   base: '/<your-repo-name>/',
>   plugins: [react()],
> })
> ```
> For user or organization root sites (`<username>.github.io`), set `base: '/'`.
