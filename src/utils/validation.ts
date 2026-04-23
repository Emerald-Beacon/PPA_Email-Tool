import type { EmailFormData, ValidationErrors } from '../types/email';

export function validateEmailForm(formData: EmailFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.subjectLine.trim()) errors.subjectLine = 'Subject line is required.';
  if (!formData.preheader.trim()) errors.preheader = 'Preheader is required.';
  if (!formData.headline.trim()) errors.headline = 'Headline is required.';
  if (!formData.bodyCopy.trim()) errors.bodyCopy = 'Body copy is required.';
  if (!formData.ctaText.trim()) errors.ctaText = 'CTA text is required.';
  if (!formData.ctaUrl.trim()) {
    errors.ctaUrl = 'CTA URL is required.';
  } else if (!isValidUrl(formData.ctaUrl)) {
    errors.ctaUrl = 'Enter a valid URL starting with http:// or https://';
  }

  if (!formData.recruiter.name.trim()) errors['recruiter.name'] = 'Recruiter name is required.';
  if (!formData.recruiter.title.trim()) errors['recruiter.title'] = 'Recruiter title is required.';
  if (!formData.recruiter.phone.trim()) errors['recruiter.phone'] = 'Recruiter phone is required.';
  if (!formData.recruiter.email.trim()) {
    errors['recruiter.email'] = 'Recruiter email is required.';
  } else if (!isValidEmail(formData.recruiter.email)) {
    errors['recruiter.email'] = 'Enter a valid email address.';
  }

  return errors;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
