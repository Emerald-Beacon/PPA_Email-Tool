import { BRANDING } from '../config/branding';

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="brand-lockup">
        <img src={BRANDING.logoPrimaryPath} alt={BRANDING.companyName} className="brand-logo" />
        <div>
          <p className="eyebrow">Internal Recruiting Tool</p>
          <h1>{BRANDING.appTitle}</h1>
          <p className="intro">
            Build polished Outlook-ready recruiting emails without touching code. Choose a
            template, update the content, and copy the final result into Outlook.
          </p>
        </div>
      </div>
    </header>
  );
}
