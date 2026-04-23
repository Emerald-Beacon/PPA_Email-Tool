import type { ChangeEventHandler, ReactNode } from 'react';

interface FieldProps {
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, description, error, children }: FieldProps) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {description ? <span className="field-help">{description}</span> : null}
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}

interface InputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: 'text' | 'url' | 'email';
}

export function TextInput({ value, onChange, placeholder, type = 'text' }: InputProps) {
  return (
    <input className="text-input" value={value} onChange={onChange} placeholder={placeholder} type={type} />
  );
}

interface TextareaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  rows?: number;
}

export function Textarea({ value, onChange, placeholder, rows = 5 }: TextareaProps) {
  return (
    <textarea
      className="text-area"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
}
