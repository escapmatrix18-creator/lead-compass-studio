# Security Policy

## Reporting Security Vulnerabilities

We take the security of Campaign Studio seriously. If you discover a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

## How to Report a Security Vulnerability

Please report security vulnerabilities by emailing **security@campaignstudio.com** with the following information:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Response Timeline

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 7 days
- **Status Updates**: We will provide regular status updates every 7 days until resolution
- **Resolution**: We aim to resolve critical vulnerabilities within 30 days

## Security Best Practices

### For Users
- Keep your Campaign Studio installation updated
- Use strong, unique passwords
- Enable two-factor authentication when available
- Regularly review your account activity
- Report suspicious activity immediately

### For Developers
- Follow secure coding practices
- Validate all user inputs
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Keep dependencies updated
- Use HTTPS for all communications
- Sanitize data before displaying to users

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅ Yes    |
| < 1.0   | ❌ No     |

We only support the latest version of Campaign Studio with security updates.

## Security Features

Campaign Studio includes several built-in security features:

- **CSRF Protection**: All forms include CSRF tokens
- **Data Encryption**: Sensitive data is encrypted at rest and in transit
- **Input Validation**: All user inputs are validated and sanitized
- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
- **Audit Logging**: All security-relevant actions are logged
- **Compliance**: GDPR and CAN-SPAM compliance features built-in

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported releases
4. Release patches as soon as possible

## Recognition

We appreciate the security research community's efforts to responsibly disclose vulnerabilities. Researchers who report valid security vulnerabilities may be acknowledged in our security advisories (with their permission).