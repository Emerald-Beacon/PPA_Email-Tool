interface ActionBarProps {
  onCopyHtml: () => void;
  onCopyRendered: () => void;
  onDownloadHtml: () => void;
  onResetCurrent: () => void;
  onStartNew: () => void;
  statusMessage: string;
}

export function ActionBar({
  onCopyHtml,
  onCopyRendered,
  onDownloadHtml,
  onResetCurrent,
  onStartNew,
  statusMessage,
}: ActionBarProps) {
  return (
    <div className="action-bar panel">
      <div className="action-grid">
        <button type="button" className="btn btn-primary" onClick={onCopyHtml}>
          Copy HTML
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCopyRendered}>
          Copy Rendered Email for Outlook
        </button>
        <button type="button" className="btn btn-secondary" onClick={onDownloadHtml}>
          Download HTML
        </button>
        <button type="button" className="btn btn-ghost" onClick={onResetCurrent}>
          Reset This Template
        </button>
        <button type="button" className="btn btn-ghost" onClick={onStartNew}>
          Start New Email
        </button>
      </div>
      <p className="status-note">{statusMessage}</p>
    </div>
  );
}
