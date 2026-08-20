CASHLESS — WEBSITE CTA + INVESTOR CONTACT VALIDATION UPDATE

This patch was prepared against the latest main-branch component structure.

FILES TO COPY INTO THE EXISTING PROJECT
- package.json
- components/Hero.tsx
- components/InvestorAccessForm.tsx
- components/InternationalPhoneInput.tsx
- styles/heroSecondaryActions.module.css
- styles/internationalPhoneInput.module.css
- app/api/validate-investor-details/route.ts

WHAT CHANGED
1. Landing page now has four actions total:
   - App Store
   - Google Play
   - Visit our website / Visiter notre site
   - Investor access / Espace investisseurs

2. Cashless website CTA opens:
   https://cashless.africa/fr

3. Investor form phone field now supports every country using a country selector
   and validates the number according to the selected country.

4. Investor email is checked in two stages:
   - client/server email syntax
   - server-side MX lookup to confirm the email domain can receive email

IMPORTANT EMAIL LIMITATION
MX validation confirms that the DOMAIN can receive email.
It cannot prove that an individual mailbox such as person@example.com actually exists.
The only dependable way to prove mailbox ownership/existence is to send an email verification link or OTP.
That requires an email provider (for example Resend, AWS SES, SendGrid, etc.) and is deliberately not faked in this patch.

5. After the investor enters the correct Cashless access code, the browser redirects to:
   https://staging.merchant/cashlessflo.com/auth/login

IMPORTANT URL CHECK
The destination above is included EXACTLY as supplied.
Its hostname is "staging.merchant" and "cashlessflo.com/auth/login" becomes part of the path.
Please confirm this with Cashless before production. A common-looking alternative would be:
https://staging.merchant.cashlessflo.com/auth/login
but this patch DOES NOT guess or silently change the URL.

INSTALL
After copying the files into the project:

npm.cmd install
npm.cmd run build

ENVIRONMENT
Keep the existing:
INVESTOR_ACCESS_CODE
INVESTOR_SESSION_SECRET

Do not commit .env.local.
