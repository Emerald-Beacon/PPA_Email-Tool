import { DEFAULT_EMAILS } from '../config/templates';
import type { EmailFormData, EmailTemplateId } from '../types/email';

export function cloneEmailData(templateId: EmailTemplateId): EmailFormData {
  return structuredClone(DEFAULT_EMAILS[templateId]);
}
