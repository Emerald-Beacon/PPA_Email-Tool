import { BRANDING } from '../config/branding';
import { TEMPLATE_MAP } from '../config/templates';
import type { EmailFormData } from '../types/email';

const EMAIL_MAX_WIDTH = 640;

interface RenderEmailOptions {
  logoSrc?: string;
}

export function renderEmailHtml(formData: EmailFormData, options: RenderEmailOptions = {}): string {
  if (formData.templateId === 'market-insights') {
    return renderMarketInsightsHtml(formData, options);
  }

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
        <td style="padding:0 36px 0 36px;">
          <img
            src="${escapeAttribute(formData.heroImage.dataUrl)}"
            alt="${escapeAttribute(formData.heroImage.alt || formData.headline)}"
            width="${EMAIL_MAX_WIDTH - 72}"
            style="display:block; width:100%; max-width:${EMAIL_MAX_WIDTH - 72}px; height:auto; border:0; border-radius:18px;"
          />
        </td>
      </tr>
      <tr><td style="height:26px; line-height:26px; font-size:0;">&nbsp;</td></tr>
    `
    : '';

  const headshotBlock = formData.headshotImage
    ? `
      <td width="84" valign="top" style="padding:0 18px 0 0;">
        <img
          src="${escapeAttribute(formData.headshotImage.dataUrl)}"
          alt="${escapeAttribute(formData.headshotImage.alt || formData.recruiter.name)}"
          width="84"
          style="display:block; width:84px; height:84px; border-radius:42px; object-fit:cover; border:2px solid #d9d1c3;"
        />
      </td>
    `
    : '';

  const signatureTextWidth = formData.headshotImage ? '430' : '532';

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
  <body style="margin:0; padding:0; background-color:#ede9e0;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      ${escapeHtml(formData.preheader)}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%; margin:0; padding:0; background-color:#ede9e0;">
      <tr>
        <td align="center" style="padding:28px 12px 40px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${EMAIL_MAX_WIDTH}" style="width:100%; max-width:${EMAIL_MAX_WIDTH}px;">
            <tr>
              <td style="padding:18px 0 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <img
                        src="${logoSrc}"
                        alt="${BRANDING.companyName}"
                        width="352"
                        style="display:block; width:352px; max-width:100%; height:auto; border:0;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:#fbf8f1; border:1px solid #d8cfbe; border-radius:28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding:30px 36px 18px 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="font-family:${BRANDING.emailFontStack}; font-size:12px; line-height:18px; letter-spacing:2.4px; text-transform:uppercase; color:${template.accentColor}; font-weight:700;">
                            ${escapeHtml(template.eyebrow)}
                          </td>
                        </tr>
                        <tr><td style="height:18px; line-height:18px; font-size:0;">&nbsp;</td></tr>
                        <tr>
                          <td align="center" style="font-family:Georgia, 'Times New Roman', serif; font-size:38px; line-height:45px; color:#1b2d4b; font-weight:400;">
                            ${escapeHtml(formData.headline)}
                          </td>
                        </tr>
                        ${
                          formData.subheadline.trim()
                            ? `
                        <tr><td style="height:16px; line-height:16px; font-size:0;">&nbsp;</td></tr>
                        <tr>
                          <td align="center" style="font-family:${BRANDING.emailFontStack}; font-size:17px; line-height:29px; color:#655f58; font-weight:500;">
                            ${escapeHtml(formData.subheadline)}
                          </td>
                        </tr>
                        `
                            : ''
                        }
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="border-top:1px solid #d8cfbe; font-size:0; line-height:0;">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>
                  ${heroImageBlock}
                  <tr>
                    <td style="padding:0 36px 12px 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        ${bodyParagraphs
                          .map(
                            (paragraph) => `
                          <tr>
                            <td style="font-family:${BRANDING.emailFontStack}; font-size:16px; line-height:29px; color:#2f3b4d; padding-bottom:18px;">
                              ${paragraph}
                            </td>
                          </tr>
                        `,
                          )
                          .join('')}
                        <tr>
                          <td style="padding-top:8px; padding-bottom:14px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td align="center" bgcolor="${template.accentColor}" style="border-radius:999px;">
                                  <a
                                    href="${escapeAttribute(formData.ctaUrl)}"
                                    style="display:inline-block; font-family:${BRANDING.emailFontStack}; font-size:14px; line-height:14px; color:#fbf8f1; text-decoration:none; padding:16px 24px; font-weight:700; letter-spacing:0.04em;"
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
                    <td style="padding:10px 36px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="border-top:1px solid #d8cfbe; font-size:0; line-height:0;">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 36px 24px 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          ${headshotBlock}
                          <td width="${signatureTextWidth}" valign="top" style="font-family:${BRANDING.emailFontStack}; color:#2f3b4d;">
                            <div style="font-size:19px; line-height:24px; font-weight:700; color:#1b2d4b; padding-bottom:4px;">
                              ${escapeHtml(formData.recruiter.name)}
                            </div>
                            <div style="font-size:13px; line-height:22px; color:#7b6e61; text-transform:uppercase; letter-spacing:1.6px; padding-bottom:12px;">
                              ${escapeHtml(formData.recruiter.title)}
                            </div>
                            <div style="font-size:14px; line-height:25px; color:#2f3b4d;">
                              <a href="tel:${escapeAttribute(formData.recruiter.phone)}" style="color:${template.accentColor}; text-decoration:none;">${escapeHtml(formData.recruiter.phone)}</a><br />
                              <a href="mailto:${escapeAttribute(formData.recruiter.email)}" style="color:${template.accentColor}; text-decoration:none;">${escapeHtml(formData.recruiter.email)}</a><br />
                              <a href="${BRANDING.websiteUrl}" style="color:${template.accentColor}; text-decoration:none;" target="_blank" rel="noreferrer">${BRANDING.websiteUrl.replace('https://', '')}</a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#1b2d4b; border-radius:0 0 28px 28px; padding:18px 28px 20px 28px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="font-family:${BRANDING.emailFontStack}; font-size:12px; line-height:20px; color:#f3ecdf;">
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
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

function renderMarketInsightsHtml(formData: EmailFormData, options: RenderEmailOptions = {}): string {
  const template = TEMPLATE_MAP[formData.templateId];
  const logoSrc = options.logoSrc || BRANDING.logoPrimaryPath;
  const accent = template.accentColor;

  const briefs = (formData.searchBriefs || '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n');
      return { title: lines[0].trim(), description: lines.slice(1).join(' ').trim() };
    })
    .filter((b) => b.title);

  const articleParagraphs = formData.bodyCopy
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => p.replace(/\n/g, '<br />'));

  const headshotBlock = formData.headshotImage
    ? `
      <td width="84" valign="top" style="padding:0 18px 0 0;">
        <img
          src="${escapeAttribute(formData.headshotImage.dataUrl)}"
          alt="${escapeAttribute(formData.headshotImage.alt || formData.recruiter.name)}"
          width="84"
          style="display:block; width:84px; height:84px; border-radius:42px; object-fit:cover; border:2px solid #d9d1c3;"
        />
      </td>
    `
    : '';
  const signatureTextWidth = formData.headshotImage ? '430' : '532';

  const heroImageBlock = formData.heroImage
    ? `
      <tr>
        <td style="padding:0 36px 0 36px;">
          <img
            src="${escapeAttribute(formData.heroImage.dataUrl)}"
            alt="${escapeAttribute(formData.heroImage.alt || formData.headline)}"
            width="${EMAIL_MAX_WIDTH - 72}"
            style="display:block; width:100%; max-width:${EMAIL_MAX_WIDTH - 72}px; height:auto; border:0; border-radius:12px;"
          />
        </td>
      </tr>
      <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>
    `
    : '';

  const briefsBlock = briefs.length > 0
    ? `
      <tr>
        <td style="padding:0 36px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            ${briefs
              .map(
                (brief, i) => `
              <tr>
                <td style="padding-bottom:${i < briefs.length - 1 ? '24px' : '8px'};">
                  <div style="font-family:${BRANDING.emailFontStack}; font-size:15px; line-height:22px; font-weight:700; color:#1b2d4b; padding-bottom:6px;">
                    ${escapeHtml(brief.title)}
                  </div>
                  <div style="font-family:${BRANDING.emailFontStack}; font-size:15px; line-height:27px; color:#2f3b4d;">
                    ${escapeHtml(brief.description)}
                  </div>
                </td>
              </tr>
            `,
              )
              .join('')}
          </table>
        </td>
      </tr>
      <tr><td style="height:20px; line-height:20px; font-size:0;">&nbsp;</td></tr>
    `
    : '';

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
  <body style="margin:0; padding:0; background-color:#ede9e0;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      ${escapeHtml(formData.preheader)}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%; margin:0; padding:0; background-color:#ede9e0;">
      <tr>
        <td align="center" style="padding:28px 12px 40px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${EMAIL_MAX_WIDTH}" style="width:100%; max-width:${EMAIL_MAX_WIDTH}px;">

            <!-- Logo -->
            <tr>
              <td style="padding:18px 0 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <img
                        src="${logoSrc}"
                        alt="${BRANDING.companyName}"
                        width="352"
                        style="display:block; width:352px; max-width:100%; height:auto; border:0;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background-color:#fbf8f1; border:1px solid #d8cfbe; border-radius:28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

                  <!-- Card header: eyebrow + intro -->
                  <tr>
                    <td style="padding:30px 36px 22px 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="font-family:${BRANDING.emailFontStack}; font-size:12px; line-height:18px; letter-spacing:2.4px; text-transform:uppercase; color:${accent}; font-weight:700;">
                            ${escapeHtml(template.eyebrow)}
                          </td>
                        </tr>
                        ${formData.subheadline.trim() ? `
                        <tr><td style="height:16px; line-height:16px; font-size:0;">&nbsp;</td></tr>
                        <tr>
                          <td align="center" style="font-family:${BRANDING.emailFontStack}; font-size:16px; line-height:27px; color:#655f58;">
                            ${escapeHtml(formData.subheadline)}
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:0 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr><td style="border-top:1px solid #d8cfbe; font-size:0; line-height:0;">&nbsp;</td></tr>
                      </table>
                    </td>
                  </tr>
                  <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

                  <!-- Section: Recent Searches -->
                  ${briefs.length > 0 ? `
                  <tr>
                    <td style="padding:0 36px 16px 36px;">
                      <div style="font-family:${BRANDING.emailFontStack}; font-size:11px; line-height:16px; letter-spacing:2px; text-transform:uppercase; color:${accent}; font-weight:700;">
                        Recent Searches We've Completed
                      </div>
                    </td>
                  </tr>
                  ${briefsBlock}
                  <tr>
                    <td style="padding:4px 36px 24px 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" bgcolor="${accent}" style="border-radius:999px;">
                            <a
                              href="${escapeAttribute(formData.ctaUrl)}"
                              style="display:inline-block; font-family:${BRANDING.emailFontStack}; font-size:14px; line-height:14px; color:#fbf8f1; text-decoration:none; padding:16px 24px; font-weight:700; letter-spacing:0.04em;"
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

                  <!-- Divider between sections -->
                  <tr>
                    <td style="padding:0 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr><td style="border-top:1px solid #d8cfbe; font-size:0; line-height:0;">&nbsp;</td></tr>
                      </table>
                    </td>
                  </tr>
                  <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>
                  ` : ''}

                  <!-- Section: Market Insights Article -->
                  ${articleParagraphs.length > 0 ? `
                  <tr>
                    <td style="padding:0 36px 10px 36px;">
                      <div style="font-family:${BRANDING.emailFontStack}; font-size:11px; line-height:16px; letter-spacing:2px; text-transform:uppercase; color:${accent}; font-weight:700; padding-bottom:14px;">
                        Market Insights
                      </div>
                      <div style="font-family:Georgia, 'Times New Roman', serif; font-size:30px; line-height:38px; color:#1b2d4b; font-weight:400;">
                        ${escapeHtml(formData.headline)}
                      </div>
                    </td>
                  </tr>
                  <tr><td style="height:20px; line-height:20px; font-size:0;">&nbsp;</td></tr>
                  ${heroImageBlock}
                  <tr>
                    <td style="padding:0 36px 12px 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        ${articleParagraphs
                          .map(
                            (p) => `
                          <tr>
                            <td style="font-family:${BRANDING.emailFontStack}; font-size:16px; line-height:29px; color:#2f3b4d; padding-bottom:18px;">
                              ${p}
                            </td>
                          </tr>
                        `,
                          )
                          .join('')}
                        ${briefs.length === 0 ? `
                        <tr>
                          <td style="padding-top:8px; padding-bottom:14px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td align="center" bgcolor="${accent}" style="border-radius:999px;">
                                  <a
                                    href="${escapeAttribute(formData.ctaUrl)}"
                                    style="display:inline-block; font-family:${BRANDING.emailFontStack}; font-size:14px; line-height:14px; color:#fbf8f1; text-decoration:none; padding:16px 24px; font-weight:700; letter-spacing:0.04em;"
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
                        ` : ''}
                      </table>
                    </td>
                  </tr>
                  ` : ''}

                  <!-- Divider before signature -->
                  <tr>
                    <td style="padding:10px 36px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr><td style="border-top:1px solid #d8cfbe; font-size:0; line-height:0;">&nbsp;</td></tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Recruiter signature -->
                  <tr>
                    <td style="padding:24px 36px 24px 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          ${headshotBlock}
                          <td width="${signatureTextWidth}" valign="top" style="font-family:${BRANDING.emailFontStack}; color:#2f3b4d;">
                            <div style="font-size:19px; line-height:24px; font-weight:700; color:#1b2d4b; padding-bottom:4px;">
                              ${escapeHtml(formData.recruiter.name)}
                            </div>
                            <div style="font-size:13px; line-height:22px; color:#7b6e61; text-transform:uppercase; letter-spacing:1.6px; padding-bottom:12px;">
                              ${escapeHtml(formData.recruiter.title)}
                            </div>
                            <div style="font-size:14px; line-height:25px; color:#2f3b4d;">
                              <a href="tel:${escapeAttribute(formData.recruiter.phone)}" style="color:${accent}; text-decoration:none;">${escapeHtml(formData.recruiter.phone)}</a><br />
                              <a href="mailto:${escapeAttribute(formData.recruiter.email)}" style="color:${accent}; text-decoration:none;">${escapeHtml(formData.recruiter.email)}</a><br />
                              <a href="${BRANDING.websiteUrl}" style="color:${accent}; text-decoration:none;" target="_blank" rel="noreferrer">${BRANDING.websiteUrl.replace('https://', '')}</a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color:#1b2d4b; border-radius:0 0 28px 28px; padding:18px 28px 20px 28px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="font-family:${BRANDING.emailFontStack}; font-size:12px; line-height:20px; color:#f3ecdf;">
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
