import type { EmailFormData, EmailTemplateId, TemplateDefinition } from '../types/email';

const recruiter = {
  name: 'Taylor Morgan',
  title: 'Senior Recruiting Partner',
  phone: '(801) 555-0142',
  email: 'tmorgan@princeperelson.com',
};

export const TEMPLATE_DEFINITIONS: TemplateDefinition[] = [
  {
    id: 'job-opportunity',
    label: 'Job Opportunity',
    description: 'Recruiting outreach for an open role, opportunity, or confidential search.',
    accentColor: '#0f4c5c',
    eyebrow: 'Career Opportunity',
  },
  {
    id: 'candidate-introduction',
    label: 'Candidate Introduction',
    description: 'Introduce a standout candidate to a client or hiring manager.',
    accentColor: '#4d6c50',
    eyebrow: 'Candidate Introduction',
  },
  {
    id: 'event-invitation',
    label: 'Event Invitation',
    description: 'Invite contacts to networking events, webinars, or hiring events.',
    accentColor: '#7a4930',
    eyebrow: 'Upcoming Event',
  },
  {
    id: 'general-outreach',
    label: 'General Outreach / Update',
    description: 'Share market updates, check-ins, or relationship-building messages.',
    accentColor: '#405c74',
    eyebrow: 'PrincePerelson Update',
  },
];

export const TEMPLATE_MAP = Object.fromEntries(
  TEMPLATE_DEFINITIONS.map((definition) => [definition.id, definition]),
) as Record<EmailTemplateId, TemplateDefinition>;

export const DEFAULT_EMAILS: Record<EmailTemplateId, EmailFormData> = {
  'job-opportunity': {
    templateId: 'job-opportunity',
    subjectLine: 'A career opportunity I thought you should see',
    preheader:
      'A PrincePerelson recruiter is sharing a role that aligns with your experience.',
    headline: 'An opportunity worth a conversation',
    subheadline: 'We are partnering on a role that could be a strong next move for the right person.',
    bodyCopy:
      "Hi there,\n\nI wanted to reach out because I’m working on a search for a client that is looking for someone with your background. The role offers strong visibility, a collaborative team, and meaningful room to grow.\n\nIf you'd be open to a brief conversation, I’d be happy to share more details and learn what you’re considering next.",
    ctaText: 'Schedule a quick call',
    ctaUrl: 'https://www.princeperelson.com',
    recruiter,
    footerText:
      'PrincePerelson & Associates is a Utah-based recruiting and staffing firm connecting exceptional talent with leading organizations.',
    heroImage: null,
    headshotImage: null,
  },
  'candidate-introduction': {
    templateId: 'candidate-introduction',
    subjectLine: 'Candidate introduction from PrincePerelson',
    preheader: 'Sharing a candidate profile that may align with your hiring priorities.',
    headline: 'A candidate you should consider',
    subheadline: 'We recently met with a professional whose background stands out for your team.',
    bodyCopy:
      "Hello,\n\nI wanted to introduce a candidate who brings a rare combination of leadership, technical capability, and strong communication skills. Based on what we know about your team, I believe this person could make an immediate impact.\n\nIf you'd like, I can send a resume and share more context around motivation, compensation, and availability.",
    ctaText: 'Request candidate details',
    ctaUrl: 'https://www.princeperelson.com',
    recruiter,
    footerText:
      'PrincePerelson partners with employers across Utah and beyond to help teams hire with confidence.',
    heroImage: null,
    headshotImage: null,
  },
  'event-invitation': {
    templateId: 'event-invitation',
    subjectLine: 'You’re invited: PrincePerelson networking event',
    preheader: 'Join us for a PrincePerelson event designed to connect talent and hiring leaders.',
    headline: 'Join us for an upcoming PrincePerelson event',
    subheadline: 'A practical, relationship-focused event for professionals and employers in our network.',
    bodyCopy:
      "Hello,\n\nWe’d love to have you join us for an upcoming PrincePerelson event. It’s a great opportunity to connect with peers, exchange market insights, and strengthen relationships across our professional community.\n\nWe hope you can join us and would be glad to answer any questions before the event.",
    ctaText: 'Reserve your spot',
    ctaUrl: 'https://www.princeperelson.com',
    recruiter,
    footerText:
      'Thank you for being part of the PrincePerelson network. We value long-term relationships and meaningful connections.',
    heroImage: null,
    headshotImage: null,
  },
  'general-outreach': {
    templateId: 'general-outreach',
    subjectLine: 'Checking in from PrincePerelson',
    preheader: 'A quick update and invitation to connect from your PrincePerelson team.',
    headline: 'A quick note from PrincePerelson',
    subheadline: 'Sharing an update, a market perspective, and an open invitation to connect.',
    bodyCopy:
      "Hello,\n\nI wanted to reach out with a quick update and to stay in touch. We continue to see movement across the market, and I’d be glad to be a resource if you’re hiring, exploring your next move, or simply want a fresh perspective.\n\nIf a conversation would be helpful, I’m always happy to connect.",
    ctaText: 'Connect with me',
    ctaUrl: 'https://www.princeperelson.com',
    recruiter,
    footerText:
      'PrincePerelson & Associates helps employers and professionals move forward with confidence through thoughtful recruiting partnerships.',
    heroImage: null,
    headshotImage: null,
  },
};
