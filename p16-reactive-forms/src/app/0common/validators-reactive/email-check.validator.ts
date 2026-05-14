import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Error key on `AbstractControl.errors` when {@link emailCheck} fails. */
export const EMAIL_CHECK_ERROR_KEY = 'emailCheck' as const;

/**
 * Structured payload under {@link EMAIL_CHECK_ERROR_KEY} so templates can branch on `code`.
 */
export type EmailCheckErrorCode =
  | 'missing_at'
  | 'multiple_at'
  | 'missing_local'
  | 'local_too_long'
  | 'invalid_local'
  | 'missing_domain'
  | 'missing_dot_in_domain'
  | 'invalid_domain'
  | 'invalid_tld'
  | 'address_too_long';

export interface EmailCheckErrorPayload {
  code: EmailCheckErrorCode;
}

const ADDRESS_MAX_LENGTH = 254;
const LOCAL_MAX_LENGTH = 64;
const HOST_LABEL_MAX = 63;

/** Dot-atom–style local part (simplified; not full RFC 5322 quoted strings). */
const LOCAL_PART_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?$/;

/** LDH hostname label (letters, digits, hyphen; no leading/trailing hyphen). */
const HOST_LABEL_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

function isValidLocalPart(local: string): boolean {
  if (local.includes('..')) {
    return false;
  }
  return LOCAL_PART_REGEX.test(local);
}

function isValidHostnameLabel(label: string): boolean {
  if (label.length === 0 || label.length > HOST_LABEL_MAX) {
    return false;
  }
  return HOST_LABEL_REGEX.test(label);
}

/**
 * TLD = last domain label: at least two letters (common gTLD / ccTLD shape).
 * Does not model every possible ICANN rule or punycode `xn--`.
 */
function isValidTld(tld: string): boolean {
  return /^[a-zA-Z]{2,}$/.test(tld);
}

function evaluateEmailCheck(trimmed: string): EmailCheckErrorCode | null {
  if (trimmed.length > ADDRESS_MAX_LENGTH) {
    return 'address_too_long';
  }

  const atCount = (trimmed.match(/@/g) ?? []).length;
  if (atCount === 0) {
    return 'missing_at';
  }
  if (atCount > 1) {
    return 'multiple_at';
  }

  const at = trimmed.indexOf('@');
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);

  if (local.length === 0) {
    return 'missing_local';
  }
  if (local.length > LOCAL_MAX_LENGTH) {
    return 'local_too_long';
  }
  if (!isValidLocalPart(local)) {
    return 'invalid_local';
  }

  if (domain.length === 0) {
    return 'missing_domain';
  }
  if (!domain.includes('.')) {
    return 'missing_dot_in_domain';
  }

  const labels = domain.split('.');
  if (labels.some((label) => label.length === 0)) {
    return 'invalid_domain';
  }

  for (const label of labels) {
    if (!isValidHostnameLabel(label)) {
      return 'invalid_domain';
    }
  }

  const tld = labels[labels.length - 1]!;
  if (!isValidTld(tld)) {
    return 'invalid_tld';
  }

  return null;
}

/**
 * **EmailCheck** — synchronous custom email shape validator.
 *
 * Rules (summary):
 * - Requires exactly one `@`.
 * - **Local part** (before `@`): non-empty, ≤64 chars, no `..`, allowed charset
 *   `[a-zA-Z0-9._%+-]` with sensible start/end (dot-atom–style simplification).
 * - **Domain** (after `@`): non-empty, must contain at least one `.`.
 * - **Labels** between dots: LDH-style hostname labels (length 1–63, no leading/trailing `-`).
 * - **TLD** (last label): at least two ASCII letters (`com`, `uk`, `museum`, …).
 *
 * Empty / whitespace-only values return `null` so you can pair this with `Validators.required`.
 * 
 * @if (emailIsInvalid && emailCtrl.errors?.['emailCheck']; as ec) {
  @switch (ec.code) {
    @case ('missing_at') {
      <p class="control-error">The address must include an @ sign.</p>
    }
    @case ('multiple_at') {
      <p class="control-error">The address can only contain one @ sign.</p>
    }
    @case ('missing_local') {
      <p class="control-error">Enter the part of the email before @.</p>
    }
    @case ('local_too_long') {
      <p class="control-error">The part before @ is too long.</p>
    }
    @case ('invalid_local') {
      <p class="control-error">The part before @ is not valid.</p>
    }
    @case ('missing_domain') {
      <p class="control-error">Enter the domain after @.</p>
    }
    @case ('missing_dot_in_domain') {
      <p class="control-error">The domain after @ must include a dot (e.g. .com).</p>
    }
    @case ('invalid_domain') {
      <p class="control-error">The domain is not valid.</p>
    }
    @case ('invalid_tld') {
      <p class="control-error">The ending after the last dot must be at least two letters (e.g. com, org).</p>
    }
    @case ('address_too_long') {
      <p class="control-error">This email address is too long.</p>
    }
  }
}
 */
export function emailCheck(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined) {
      return null;
    }
    if (typeof value !== 'string') {
      return { [EMAIL_CHECK_ERROR_KEY]: { code: 'invalid_local' } satisfies EmailCheckErrorPayload };
    }

    const trimmed = value.trim();
    if (trimmed === '') {
      return null;
    }

    const code = evaluateEmailCheck(trimmed);
    if (code === null) {
      return null;
    }

    return {
      [EMAIL_CHECK_ERROR_KEY]: { code } satisfies EmailCheckErrorPayload,
    };
  };
}
