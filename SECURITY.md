# Security Policy

## Security Measures

### Anti-Phishing
- CORS restricted to ALLOWED_ORIGIN env variable only
- HTTPS enforced in production via Vercel
- No user-facing redirect links generated from user input

### Anti-DDoS
- Vercel Edge Functions have built-in rate limiting
- Gemini API calls gated behind payload validation
- Honeypot field rejects automated form submissions silently

### Anti-Spam
- Honeypot field in consultation form blocks bot submissions
- All fields (name, email, enquiry) validated before processing
- Email format validated before use
- Enquiry text length-capped before Gemini call

## Reporting a Vulnerability

Report via GitHub Issues with label `security`.
