"use client";

import { useActionState } from "react";
import {
  FormError,
  FormSuccess,
  SubmitButton,
  TextField,
} from "@/components/admin/form-fields";
import { changePassword, type ActionState } from "../../actions";

export function PasswordForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(changePassword, {});

  return (
    <form action={formAction} className="space-y-4">
      <FormError message={state.error} />
      <FormSuccess message={state.ok ? "Password updated." : undefined} />

      <TextField
        name="currentPassword"
        label="Current password"
        type="password"
        required
      />
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          name="newPassword"
          label="New password"
          type="password"
          required
          hint="At least 12 characters."
        />
        <TextField
          name="confirmPassword"
          label="Confirm new password"
          type="password"
          required
        />
      </div>

      <SubmitButton>Update password</SubmitButton>
    </form>
  );
}
