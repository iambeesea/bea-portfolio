# Bea Portfolio

Beatrice Capule's portfolio site, built from her Claude Design project "Bea Portfolio (Try)".

It is a static site: no server code and no install step. Any static host can serve the repository root.

## Layout

- `index.html` — the live site. Generated; do not edit by hand.
- `assets/` — web-sized photos used by the site.
- `vendor/` — React 18 and the Claude Design runtime, served locally so the site depends on no script CDN.
- `favicon.svg` — the browser tab icon.
- `design/` — the untouched Claude Design export (design file, runtime, full-size photos). This is the source of truth.
- `scripts/build.mjs` — turns `design/` into `index.html`.

## Updating the site from Claude Design

1. Export the project from Claude Design and replace the files in `design/`.
2. Rebuild:

   ```bash
   node scripts/build.mjs
   ```

3. If a photo changed, re-export a web-sized copy into `assets/` (the build does not resize images).

The build removes the review-only parts of the design (the "Portfolio mockup" bar and the Mobile and System tabs), adds the page title and sharing metadata, and points the page at the local libraries. It stops with an error if a new export no longer matches what it expects.

## Running locally

Serve the folder with any static file server and open the root URL, for example:

```bash
npx serve .
```

## Still to do

- Replace the remaining `[PH]` placeholders in the design (hero tagline, case-study screenshots and feature text).
- Set the site's final address in the sharing metadata (`og:image` is a relative path until then).
