import { BRANDING } from '../config/branding';
import { TEMPLATE_MAP } from '../config/templates';
import type { EmailFormData } from '../types/email';

const EMAIL_MAX_WIDTH = 640;

interface RenderEmailOptions {
  logoSrc?: string;
}

export function renderEmailHtml(formData: EmailFormData, options: RenderEmailOptions = {}): string {
  const template = TEMPLATE_MAP[formData.templateId];
  const logoSrc = options.logoSrc || BRANDING.logoPrimaryPath;
  const bodyParagraphs = formData.bodyCopy
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => paragraph.replace(/\n/g, '<br />'));

  const heroImageBlock = formData.heroImage
    ? `
      <tr>
        <td style="padding:0;">
          <img
            src="${escapeAttribute(formData.heroImage.dataUrl)}"
            alt="${escapeAttribute(formData.heroImage.alt || formData.headline)}"
            width="${EMAIL_MAX_WIDTH}"
            style="display:block; width:100%; max-width:${EMAIL_MAX_WIDTH}px; height:auto; border:0;"
          />
        </td>
      </tr>
    `
    : '';

  const headshotBlock = formData.headshotImage
    ? `
      <td width="88" valign="top" style="padding:0 18px 0 0;">
        <img
          src="${escapeAttribute(formData.headshotImage.dataUrl)}"
          alt="${escapeAttribute(formData.headshotImage.alt || formData.recruiter.name)}"
          width="88"
          style="display:block; width:88px; height:88px; border-radius:44px; object-fit:cover;"
        />
      </td>
    `
    : '';

  const signatureTextWidth = formData.headshotImage ? '454' : '560';

  return `
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>${escapeHtml(formData.subjectLine)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#eef2f4;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      ${escapeHtml(formData.preheader)}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#eef2f4; margin:0; padding:0; width:100%;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${EMAIL_MAX_WIDTH}" style="width:100%; max-width:${EMAIL_MAX_WIDTH}px; background-color:#ffffff;">
            <tr>
              <td style="padding:20px 28px; background-color:#ffffff; border-bottom:4px solid ${template.accentColor};">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td valign="middle" align="left">
                      <img
                        src="${logoSrc}"
                        alt="${BRANDING.companyName}"
                        width="212"
                        style="display:block; width:212px; max-width:100%; height:auto; border:0;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${heroImageBlock}
            <tr>
              <td style="padding:28px 28px 18px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-family:${BRANDING.emailFontStack}; font-size:12px; line-height:18px; letter-spacing:1.2px; text-transform:uppercase; color:${template.accentColor}; font-weight:700; padding-bottom:12px;">
                      ${escapeHtml(template.eyebrow)}
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:${BRANDING.emailFontStack}; font-size:31px; line-height:38px; color:#14212b; font-weight:700; padding-bottom:10px;">
                      ${escapeHtml(formData.headline)}
                    </td>
                  </tr>
                  ${
                    formData.subheadline.trim()
                      ? `
                    <tr>
                      <td style="font-family:${BRANDING.emailFontStack}; font-size:18px; line-height:28px; color:#4b5963; font-weight:500; padding-bottom:18px;">
                        ${escapeHtml(formData.subheadline)}
                      </td>
                    </tr>
                  `
                      : ''
                  }
                  ${bodyParagraphs
                    .map(
                      (paragraph) => `
                    <tr>
                      <td style="font-family:${BRANDING.emailFontStack}; font-size:16px; line-height:27px; color:#24323c; padding-bottom:16px;">
                        ${paragraph}
                      </td>
                    </tr>
                  `,
                    )
                    .join('')}
                  <tr>
                    <td style="padding:8px 0 20px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" bgcolor="${template.accentColor}" style="border-radius:4px;">
                            <a
                              href="${escapeAttribute(formData.ctaUrl)}"
                              style="display:inline-block; font-family:${BRANDING.emailFontStack}; font-size:15px; line-height:15px; color:#ffffff; text-decoration:none; padding:15px 22px; font-weight:700;"
                              target="_blank"
                              rel="noreferrer"
                            >
                              ${escapeHtml(formData.ctaText)}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 24px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid #d8dee4;">
                  <tr>
                    <td style="padding-top:22px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          ${headshotBlock}
                          <td width="${signatureTextWidth}" valign="top" style="font-family:${BRANDING.emailFontStack}; color:#24323c;">
                            <div style="font-size:18px; line-height:24px; font-weight:700; color:#14212b; padding-bottom:3px;">
                              ${escapeHtml(formData.recruiter.name)}
                            </div>
                            <div style="font-size:14px; line-height:22px; color:#4b5963; padding-bottom:10px;">
                              ${escapeHtml(formData.recruiter.title)}
                            </div>
                            <div style="font-size:14px; line-height:24px; color:#24323c;">
                              <a href="tel:${escapeAttribute(formData.recruiter.phone)}" style="color:${template.accentColor}; text-decoration:none;">${escapeHtml(formData.recruiter.phone)}</a><br />
                              <a href="mailto:${escapeAttribute(formData.recruiter.email)}" style="color:${template.accentColor}; text-decoration:none;">${escapeHtml(formData.recruiter.email)}</a><br />
                              <a href="${BRANDING.websiteUrl}" style="color:${template.accentColor}; text-decoration:none;" target="_blank" rel="noreferrer">${BRANDING.websiteUrl.replace('https://', '')}</a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 28px 28px; background-color:#f6f8fa;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-family:${BRANDING.emailFontStack}; font-size:12px; line-height:19px; color:#5d6b75;">
                      ${escapeHtml(formData.footerText || BRANDING.companyName)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
