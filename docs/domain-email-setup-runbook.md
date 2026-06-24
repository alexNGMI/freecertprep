# Domain Email Setup Runbook

Updated: June 24, 2026

## Intended Outcome

The product should have:

- `support@yourdomain.com` for learner and technical help;
- `admin@yourdomain.com` for the private owner/admin identity;
- `no-reply@yourdomain.com` for Supabase authentication messages.

The repository is ready for the public support address. `/support` reads `VITE_SUPPORT_EMAIL` at build time and shows an email action only when the value is a valid address. The admin address is deliberately not shipped in the browser bundle.

## Recommended Small-Product Setup

Use Cloudflare Email Routing for inbound forwarding while message volume is low. It can forward `support@` and `admin@` to an existing private inbox, but Cloudflare custom addresses are forwarding addresses only; they are not outbound mailboxes.

Use a transactional SMTP provider such as Resend, Postmark, Brevo, or Amazon SES for Supabase magic-link delivery. Supabase's default sender is intended for testing and has restrictive delivery limits.

If replies must visibly come from `support@yourdomain.com`, use a real mailbox provider such as Google Workspace or Zoho Mail instead of relying only on forwarding.

## Activation Order

1. Add the custom domain to Cloudflare and confirm the site resolves over HTTPS.
2. In Cloudflare Email Routing, verify the private destination inbox.
3. Create forwarding routes for `support@yourdomain.com` and `admin@yourdomain.com`.
4. Let Cloudflare add or verify the required inbound MX and SPF-related DNS records.
5. Send test messages from an unrelated address to both routes and confirm delivery.
6. Choose an SMTP provider and verify the sending domain.
7. Add the SMTP provider's SPF and DKIM records. Publish a DMARC policy after SPF/DKIM alignment is confirmed.
8. In Supabase Authentication email settings, configure custom SMTP and use `no-reply@yourdomain.com` as the sender.
9. Send a production magic link to a non-team test address and verify delivery, branding, and the `/account` redirect.
10. Add `VITE_SUPPORT_EMAIL=support@yourdomain.com` to the Cloudflare production build variables and redeploy `main`.
11. Open `/support` and confirm the email button targets the correct address.

## Repository Configuration

Local example:

```text
VITE_SUPPORT_EMAIL=support@example.com
```

The full example is in `.env.example`. Only the support address is a public Vite variable. SMTP passwords, provider API keys, private forwarding destinations, and the administrator address must never use a `VITE_` variable because Vite exposes those values to the client bundle.

## Verification Checklist

- `support@` receives from Gmail, Outlook, and another independent sender;
- `admin@` forwards only to the private owner inbox;
- Supabase magic links arrive from the intended domain;
- SPF and DKIM pass in received-message headers;
- DMARC reports show alignment;
- replying to a learner does not reveal an unintended personal address;
- `/support` works with JavaScript navigation and direct URL refresh;
- no secret or private destination appears in the production JavaScript bundle.

## Official References

- Cloudflare Email Routing: https://developers.cloudflare.com/email-routing/
- Cloudflare Email Routing limits: https://developers.cloudflare.com/email-routing/limits/
- Supabase custom SMTP: https://supabase.com/docs/guides/auth/auth-smtp
- Supabase production checklist: https://supabase.com/docs/guides/deployment/going-into-prod
