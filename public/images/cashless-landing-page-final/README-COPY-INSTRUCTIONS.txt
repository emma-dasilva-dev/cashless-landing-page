CASHLESS LANDING PAGE - REPLACEMENT PACKAGE

1. Extract this ZIP.
2. Copy the extracted contents into your existing cashless-landing-page project folder.
3. Keep your existing assets in public/images, especially:
   - cashless-mark.png
   - cashless-logo.png (optional, no longer used by the main page)
   - cashless-virtual-card.png (optional, no longer used by the main page)
4. Add the finished logo animation later as either:
   public/animation/cashless-logo-animation.webm
   OR
   public/animation/cashless-logo-animation.mp4
   The page automatically falls back to a lightweight temporary Cashless animation until the real file is present.
5. Run: npm install
6. Run: npm run dev -- --hostname 0.0.0.0

INVESTOR ACCESS
- /investors contains the finished access-code UI.
- /investors/portal is an empty investor-content placeholder.
- No real code verification is wired yet. This is deliberate.
- After Cashless approves the access method, store the real code server-side in an environment variable such as INVESTOR_ACCESS_CODE. Never put the production access code in frontend JavaScript.
