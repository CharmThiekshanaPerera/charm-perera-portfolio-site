"use client";

import { useActionState } from "react";
import {
  FormError,
  SubmitButton,
  SwitchField,
  TextAreaField,
  TextField,
} from "./form-fields";
import type { ActionState } from "@/app/admin/actions";

export type FieldSpec = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "date" | "switch";
  hint?: string;
  required?: boolean;
  rows?: number;
  mono?: boolean;
  /** Half-width on medium screens and up. */
  half?: boolean;
};

/**
 * Spec-driven form used by the simpler content types (testimonials, packages,
 * experience, skills). Each resource supplies a field list and its own server
 * action rather than duplicating a near-identical form component.
 */
export function ResourceForm({
  action,
  fields,
  values,
  id,
  submitLabel,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  fields: FieldSpec[];
  values?: Record<string, unknown>;
  id?: string;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, {});
  const errors = state.fieldErrors ?? {};

  const valueFor = (field: FieldSpec): string => {
    const raw = values?.[field.name];
    if (raw === undefined || raw === null) return "";
    if (Array.isArray(raw)) {
      // Arrays are edited as one item per line.
      return raw.join("\n");
    }
    if (field.type === "date") {
      const date = new Date(raw as string);
      return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
    }
    return String(raw);
  };

  return (
    <form action={formAction} className="space-y-4">
      {id ? <input type="hidden" name="id" value={id} /> : null}

      <FormError message={state.error} />

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => {
          const className = field.half ? "" : "md:col-span-2";

          if (field.type === "switch") {
            return (
              <div key={field.name} className={className}>
                <SwitchField
                  name={field.name}
                  label={field.label}
                  hint={field.hint}
                  defaultChecked={Boolean(values?.[field.name])}
                />
              </div>
            );
          }

          if (field.type === "textarea") {
            return (
              <TextAreaField
                key={field.name}
                name={field.name}
                label={field.label}
                hint={field.hint}
                required={field.required}
                rows={field.rows ?? 4}
                mono={field.mono}
                defaultValue={valueFor(field)}
                error={errors[field.name]}
                className={className}
              />
            );
          }

          return (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              hint={field.hint}
              required={field.required}
              type={field.type === "number" ? "number" : field.type === "url" ? "url" : field.type === "date" ? "date" : "text"}
              defaultValue={valueFor(field)}
              error={errors[field.name]}
              className={className}
            />
          );
        })}
      </div>

      <SubmitButton>{submitLabel ?? "Save"}</SubmitButton>
    </form>
  );
}
