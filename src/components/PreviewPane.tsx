interface PreviewPaneProps {
  html: string;
}

export function PreviewPane({ html }: PreviewPaneProps) {
  return (
    <section className="panel preview-panel">
      <div className="panel-heading">
        <div>
          <h2>Email Preview</h2>
          <p>Preview the generated email in a more presentation-ready frame before exporting.</p>
        </div>
      </div>
      <div className="preview-frame-wrap">
        <div className="preview-chrome">
          <span />
          <span />
          <span />
        </div>
        <iframe title="Email preview" className="preview-frame" srcDoc={html} />
      </div>
    </section>
  );
}
