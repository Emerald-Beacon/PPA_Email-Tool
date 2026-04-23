import { BRANDING } from '../config/branding';

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="brand-lockup editorial-lockup">
        <div className="brand-intro">
          <p className="eyebrow">Internal Recruiting Tool</p>
          <h1>{BRANDING.appTitle}</h1>
          <p className="intro">
            Help PrincePerelson team members create polished, branded outreach emails for Outlook
            with a simple workflow and reliable copy-and-paste output.
          </p>
          <div className="intro-chips">
            <span>Outlook-ready HTML</span>
            <span>Recruiter-friendly workflow</span>
            <span>Branded templates</span>
          </div>
        </div>
        <div className="brand-hero-card">
          <img src={BRANDING.logoPrimaryPath} alt={BRANDING.companyName} className="brand-logo" />
          <p className="brand-hero-note">
            Built for PrincePerelson's internal recruiting and business development outreach
            workflows.
          </p>
        </div>
      </div>
    </header>
  );
}
