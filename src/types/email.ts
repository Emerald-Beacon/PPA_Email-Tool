export type EmailTemplateId =
  | 'job-opportunity'
  | 'candidate-introduction'
  | 'event-invitation'
  | 'general-outreach'
  | 'market-insights';

export interface RecruiterDetails {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface UploadedImage {
  alt: string;
  dataUrl: string;
  filename: string;
}

export interface EmailFormData {
  templateId: EmailTemplateId;
  subjectLine: string;
  preheader: string;
  headline: string;
  subheadline: string;
  bodyCopy: string;
  searchBriefs?: string;
  ctaText: string;
  ctaUrl: string;
  recruiter: RecruiterDetails;
  footerText: string;
  heroImage: UploadedImage | null;
  headshotImage: UploadedImage | null;
}

export type ValidationErrors = Partial<Record<string, string>>;

export interface TemplateDefinition {
  id: EmailTemplateId;
  label: string;
  description: string;
  accentColor: string;
  eyebrow: string;
}
