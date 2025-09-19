This folder serves static assets for the React app at the /assets/* path.

If you add image attachments to the project (e.g., under /attachments), copy them into this folder so they can be loaded by the app.

Examples used by the app code:
- /assets/20250919_044955_headphone.jpg
- /assets/20250919_045216_fridge.jpg
- /assets/20250919_045641_image.png
- /assets/20250919_050518_image.png
- /assets/20250919_051117_image.png
- /assets/20250919_051905_image.png
- /assets/20250919_053253_image.png
- /assets/bike.png

Note: Do not import these into src/assets if they are referenced via /assets/* paths; they must live here in public/assets.
