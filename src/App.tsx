import { useEffect, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { ActionBar } from './components/ActionBar';
import { EmailForm } from './components/EmailForm';
import { PreviewPane } from './components/PreviewPane';
import { BRANDING } from './config/branding';
import { TEMPLATE_DEFINITIONS } from './config/templates';
import type { EmailFormData, EmailTemplateId, ValidationErrors } from './types/email';
import { copyHtml, copyRenderedEmail } from './utils/clipboard';
import { assetPathToDataUrl } from './utils/assets';
import { cloneEmailData } from './utils/defaults';
import { downloadHtmlFile } from './utils/download';
import { fileToUploadedImage } from './utils/file';
import { renderEmailHtml } from './templates/renderEmailHtml';
import { validateEmailForm } from './utils/validation';

const INITIAL_TEMPLATE: EmailTemplateId = 'job-opportunity';

export default function App() {
  const [formData, setFormData] = useState<EmailFormData>(() => cloneEmailData(INITIAL_TEMPLATE));
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [embeddedLogo, setEmbeddedLogo] = useState<string>(BRANDING.logoPrimaryPath);
  const [statusMessage, setStatusMessage] = useState(
    'Tip: Copy the rendered email first for the best Outlook paste result. Use Copy HTML if you need the raw markup.',
  );

  useEffect(() => {
    let isMounted = true;

    void assetPathToDataUrl(BRANDING.logoPrimaryPath)
      .then((dataUrl) => {
        if (isMounted && dataUrl) {
          setEmbeddedLogo(dataUrl);
        }
      })
      .catch(() => {
        // Fall back to the public path if the asset cannot be embedded.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const html = renderEmailHtml(formData, { logoSrc: embeddedLogo });

  const updateField = <K extends keyof EmailFormData>(field: K, value: EmailFormData[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [String(field)]: undefined }));
  };

  const updateRecruiter = (field: keyof EmailFormData['recruiter'], value: string) => {
    setFormData((current) => ({
      ...current,
      recruiter: {
        ...current.recruiter,
        [field]: value,
      },
    }));
    setErrors((current) => ({ ...current, [`recruiter.${field}`]: undefined }));
  };

  const updateTemplate = (templateId: EmailTemplateId) => {
    setFormData(cloneEmailData(templateId));
    setErrors({});
    setStatusMessage('Loaded the selected template with PrincePerelson defaults. Update any field to customize it.');
  };

  const updateImage = async (field: 'heroImage' | 'headshotImage', file: File | null) => {
    if (!file) {
      updateField(field, null);
      return;
    }

    const alt = field === 'heroImage' ? formData.headline : formData.recruiter.name;
    const uploadedImage = await fileToUploadedImage(file, alt);
    updateField(field, uploadedImage);
  };

  const ensureValid = (): boolean => {
    const nextErrors = validateEmailForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage('A few required fields still need attention before export.');
      return false;
    }

    return true;
  };

  const handleCopyHtml = async () => {
    if (!ensureValid()) return;

    await copyHtml(html);
    setStatusMessage('HTML copied. Paste into your editor or save it as an email file if needed.');
  };

  const handleCopyRendered = async () => {
    if (!ensureValid()) return;

    const copiedAsRichContent = await copyRenderedEmail(html);
    setStatusMessage(
      copiedAsRichContent
        ? 'Rendered email copied. Paste directly into Outlook desktop and review formatting before sending.'
        : 'Your browser copied the HTML text fallback. If Outlook formatting looks off, try Copy HTML or another browser.',
    );
  };

  const handleDownload = () => {
    if (!ensureValid()) return;

    const safeSubject = formData.subjectLine
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48);

    downloadHtmlFile(`${safeSubject || 'princeperelson-email'}.html`, html);
    setStatusMessage('HTML downloaded. Open it in a browser if you want one more visual QA check.');
  };

  const resetCurrentTemplate = () => {
    setFormData(cloneEmailData(formData.templateId));
    setErrors({});
    setStatusMessage('Current template reset to its default PrincePerelson content.');
  };

  const startNewEmail = () => {
    setFormData(cloneEmailData(TEMPLATE_DEFINITIONS[0].id));
    setErrors({});
    setStatusMessage('Started a new email using the default Job Opportunity template.');
  };

  return (
    <div className="app-shell">
      <AppHeader />

      <main className="workspace">
        <div className="workspace-main">
          <EmailForm
            formData={formData}
            errors={errors}
            onTemplateChange={updateTemplate}
            onFieldChange={updateField}
            onRecruiterChange={updateRecruiter}
            onImageSelected={(field, file) => {
              void updateImage(field, file);
            }}
          />
        </div>

        <aside className="workspace-side">
          <ActionBar
            onCopyHtml={() => {
              void handleCopyHtml();
            }}
            onCopyRendered={() => {
              void handleCopyRendered();
            }}
            onDownloadHtml={handleDownload}
            onResetCurrent={resetCurrentTemplate}
            onStartNew={startNewEmail}
            statusMessage={statusMessage}
          />
          <PreviewPane html={html} />
        </aside>
      </main>
    </div>
  );
}
