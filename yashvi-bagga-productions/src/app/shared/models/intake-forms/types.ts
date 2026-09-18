/**
 * Shared field types for config-driven intake forms.
 */
import { AllowedFileKind } from '../document-upload.model';

export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'chips' | 'checkbox' | 'file';

export interface IntakeField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  fullWidth?: boolean;
  accept?: AllowedFileKind[];
  maxSizeMb?: number;
  purpose?: string;
  multiple?: boolean;
}

export interface IntakeStep {
  title: string;
  subtitle?: string;
  fields: IntakeField[];
}

export interface IntakeFormDef {
  slug: string;
  idType: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: IntakeStep[];
  successNote: string;
}
