import type { ChangeEvent } from 'react';
import { TEMPLATE_DEFINITIONS } from '../config/templates';
import type { EmailFormData, ValidationErrors } from '../types/email';
import { Field, Textarea, TextInput } from './Field';
import { FormSection } from './FormSection';

interface EmailFormProps {
  formData: EmailFormData;
  errors: ValidationErrors;
  onTemplateChange: (templateId: EmailFormData['templateId']) => void;
  onFieldChange: <K extends keyof EmailFormData>(field: K, value: EmailFormData[K]) => void;
  onRecruiterChange: (field: keyof EmailFormData['recruiter'], value: string) => void;
  onImageSelected: (field: 'heroImage' | 'headshotImage', file: File | null) => void;
}

export function EmailForm({
  formData,
  errors,
  onTemplateChange,
  onFieldChange,
  onRecruiterChange,
  onImageSelected,
}: EmailFormProps) {
  const currentTemplate = TEMPLATE_DEFINITIONS.find((item) => item.id === formData.templateId);

  return (
    <div className="form-column">
      <FormSection
        title="Template"
        description="Choose a recruiting workflow, then tailor the message for the recipient."
      >
        <div className="template-grid">
          {TEMPLATE_DEFINITIONS.map((template) => (
            <button
              key={template.id}
              type="button"
              className={`template-card ${template.id === formData.templateId ? 'is-active' : ''}`}
              onClick={() => onTemplateChange(template.id)}
            >
              <span className="template-card-title">{template.label}</span>
              <span className="template-card-description">{template.description}</span>
            </button>
          ))}
        </div>
        {currentTemplate ? (
          <p className="template-footnote">
            Selected template: <strong>{currentTemplate.label}</strong>
          </p>
        ) : null}
      </FormSection>

      <FormSection title="Email Content" description="These fields control the message and its Outlook preview.">
        <div className="field-grid">
          <Field label="Subject line" error={errors.subjectLine}>
            <TextInput
              value={formData.subjectLine}
              onChange={(event) => onFieldChange('subjectLine', event.target.value)}
              placeholder="A career opportunity I thought you should see"
            />
          </Field>
          <Field
            label="Preheader"
            description="This short summary often appears next to the subject line in inbox previews."
            error={errors.preheader}
          >
            <TextInput
              value={formData.preheader}
              onChange={(event) => onFieldChange('preheader', event.target.value)}
              placeholder="A short preview of the email content"
            />
          </Field>
          <Field
            label={formData.templateId === 'market-insights' ? 'Article headline' : 'Headline'}
            error={errors.headline}
          >
            <TextInput
              value={formData.headline}
              onChange={(event) => onFieldChange('headline', event.target.value)}
              placeholder={
                formData.templateId === 'market-insights'
                  ? 'What We Are Seeing in the Market Right Now'
                  : 'An opportunity worth a conversation'
              }
            />
          </Field>
          <Field
            label={formData.templateId === 'market-insights' ? 'Intro text' : 'Subheadline'}
            description={
              formData.templateId === 'market-insights'
                ? 'Short descriptor shown beneath the PrincePerelson Insights eyebrow at the top of the email.'
                : undefined
            }
          >
            <TextInput
              value={formData.subheadline}
              onChange={(event) => onFieldChange('subheadline', event.target.value)}
              placeholder={
                formData.templateId === 'market-insights'
                  ? 'A brief from the PrincePerelson team on executive talent trends'
                  : 'Supporting line beneath the headline'
              }
            />
          </Field>
          <Field
            label={formData.templateId === 'market-insights' ? 'Article body' : 'Body copy'}
            description="Use blank lines between paragraphs. Line breaks inside a paragraph are preserved."
            error={errors.bodyCopy}
          >
            <Textarea
              value={formData.bodyCopy}
              onChange={(event) => onFieldChange('bodyCopy', event.target.value)}
              rows={10}
            />
          </Field>
        </div>
      </FormSection>

      {formData.templateId === 'market-insights' && (
        <FormSection
          title="Search Briefs"
          description="Each brief appears as a bold title and a short paragraph. Separate briefs with a blank line. Format each as: Role Title | Company Type on the first line, then the description on the next line."
        >
          <div className="field-grid">
            <Field label="Recent search case studies">
              <Textarea
                value={formData.searchBriefs ?? ''}
                onChange={(event) => onFieldChange('searchBriefs', event.target.value)}
                rows={10}
              />
            </Field>
          </div>
        </FormSection>
      )}

      <FormSection title="Call To Action" description="Give recipients a clear next step.">
        <div className="split-grid">
          <Field label="CTA text" error={errors.ctaText}>
            <TextInput
              value={formData.ctaText}
              onChange={(event) => onFieldChange('ctaText', event.target.value)}
              placeholder="Schedule a quick call"
            />
          </Field>
          <Field label="CTA URL" error={errors.ctaUrl}>
            <TextInput
              value={formData.ctaUrl}
              onChange={(event) => onFieldChange('ctaUrl', event.target.value)}
              type="url"
              placeholder="https://perelson.com"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Recruiter Signature" description="This information appears in the email signature block.">
        <div className="field-grid">
          <div className="split-grid">
            <Field label="Recruiter name" error={errors['recruiter.name']}>
              <TextInput
                value={formData.recruiter.name}
                onChange={(event) => onRecruiterChange('name', event.target.value)}
                placeholder="Taylor Morgan"
              />
            </Field>
            <Field label="Title" error={errors['recruiter.title']}>
              <TextInput
                value={formData.recruiter.title}
                onChange={(event) => onRecruiterChange('title', event.target.value)}
                placeholder="Senior Recruiting Partner"
              />
            </Field>
          </div>
          <div className="split-grid">
            <Field label="Phone" error={errors['recruiter.phone']}>
              <TextInput
                value={formData.recruiter.phone}
                onChange={(event) => onRecruiterChange('phone', event.target.value)}
                placeholder="(801) 555-0142"
              />
            </Field>
            <Field label="Email" error={errors['recruiter.email']}>
              <TextInput
                value={formData.recruiter.email}
                onChange={(event) => onRecruiterChange('email', event.target.value)}
                type="email"
                placeholder="tmorgan@perelson.com"
              />
            </Field>
          </div>
          <Field label="Footer text">
            <Textarea
              value={formData.footerText}
              onChange={(event) => onFieldChange('footerText', event.target.value)}
              rows={3}
              placeholder="Optional company footer text"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Images" description="Optional images are embedded for a more reliable Outlook copy/paste experience.">
        <div className="split-grid">
          <ImageUploadField
            label="Hero / banner image"
            helpText="Wide image shown near the top of the email."
            selectedFile={formData.heroImage?.filename}
            onChange={(file) => onImageSelected('heroImage', file)}
          />
          <ImageUploadField
            label="Recruiter headshot"
            helpText="Square headshot shown in the signature area."
            selectedFile={formData.headshotImage?.filename}
            onChange={(file) => onImageSelected('headshotImage', file)}
          />
        </div>
      </FormSection>
    </div>
  );
}

interface ImageUploadFieldProps {
  label: string;
  helpText: string;
  selectedFile?: string;
  onChange: (file: File | null) => void;
}

function ImageUploadField({ label, helpText, selectedFile, onChange }: ImageUploadFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] ?? null);
  };

  return (
    <Field label={label} description={helpText}>
      <input className="file-input" type="file" accept="image/*" onChange={handleChange} />
      <span className="field-help">{selectedFile ? `Selected: ${selectedFile}` : 'No image selected.'}</span>
      {selectedFile ? (
        <button type="button" className="text-link" onClick={() => onChange(null)}>
          Remove image
        </button>
      ) : null}
    </Field>
  );
}
