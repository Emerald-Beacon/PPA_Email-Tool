import { BRANDING } from '../config/branding';

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="brand-lockup editorial-lockup">
        <div className="brand-intro">
          <p className="eyebrow">Internal Recruiting Tool</p>
          <h1>{BRANDING.appTitle}</h1>
          <p className="intro">
            Create polished PrincePerelson recruiting outreach with a calmer, brand-led layout
            built for Outlook copy and paste.
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
            Based on PrincePerelson outreach workflows and refined with your Canva reference
            direction.
          </p>
        </div>
      </div>
    </header>
  );
}
