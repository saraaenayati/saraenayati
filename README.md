# Sara Enayati — Personal Portfolio

A responsive, English, one-page portfolio built with plain HTML, CSS and JavaScript. No build step or dependencies are required.

## Intended audience and action

Audience: product leaders and recruiters hiring for product teams.
Primary action: explore Sara's work, download her resume and contact her by email or LinkedIn.

## Preview

Open `index.html` in a browser. For a local server, run `python3 -m http.server 8000` in this folder, then open `http://localhost:8000`.

## Publish on GitHub Pages

1. Extract this ZIP.
2. Upload **the files inside this folder** into the root of your GitHub repository. Keep the `assets` folder and its contents together. `index.html` must sit at the root, not inside another `sara-portfolio` folder. Do not upload the ZIP itself.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your `main` branch and `/(root)`, then click **Save**.
6. Wait for deployment and open the website address shown on that page.

All asset paths are relative, so the site works on both a user Pages site and a repository Pages site.

## Files

- `index.html` — content and structure
- `styles.css` — approved beige, nude rose and light blue design; navy and white typography
- `script.js` — mobile navigation, scroll reveals, reading progress and subtle portrait motion
- `assets/sara-enayati.jpg` — optimized supplied portrait; no AI modification
- `assets/sara-enayati-resume.pdf` — supplied resume
- `assets/favicon.svg` — site icon

## Edit

Change text and links in `index.html`; edit the palette near the beginning of `styles.css`. Contact details are from the supplied resume. The PMA360 visual is a conceptual illustration rather than a product screenshot.

Google Fonts provides DM Sans and Playfair Display. Local system fonts are used if it cannot load. No analytics, cookies, tracking or backend are included.

Motion respects the visitor's reduced-motion setting. Content and contact links work with JavaScript disabled; the resume is a direct PDF download.

## Themes and hover effects

Use the header theme button to switch between the original day palette and navy night palette. This preference is saved only in your own browser. Hover effects include subtle portrait motion, skill tilt and spotlight, magnetic buttons with a shine sweep, and a moving project illustration. Touch users can still access all content. Reduced-motion preferences disable animated movement.
