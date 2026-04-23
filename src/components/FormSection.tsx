import type { PropsWithChildren, ReactNode } from 'react';

interface FormSectionProps extends PropsWithChildren {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function FormSection({ title, description, actions, children }: FormSectionProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="panel-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
