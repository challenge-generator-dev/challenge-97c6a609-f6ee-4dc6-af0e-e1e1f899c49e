export interface ValidationRule<T = unknown> {
  validate: (value: T) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const documentRegex = /^\d{6,12}$/;

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
}

export function validateDocument(document: string): boolean {
  if (!document || typeof document !== 'string') return false;
  return documentRegex.test(document.replace(/\D/g, ''));
}

export function validateRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function validateMinLength(min: number): ValidationRule<string> {
  return {
    validate: (value: string) => typeof value === 'string' && value.length >= min,
    message: `El campo debe tener al menos ${min} caracteres`
  };
}

export function validateMaxLength(max: number): ValidationRule<string> {
  return {
    validate: (value: string) => typeof value === 'string' && value.length <= max,
    message: `El campo debe tener como máximo ${max} caracteres`
  };
}

export function validateRange(min: number, max: number): ValidationRule<number> {
  return {
    validate: (value: number) => typeof value === 'number' && value >= min && value <= max,
    message: `El valor debe estar entre ${min} y ${max}`
  };
}

export function validatePattern(pattern: RegExp, message: string): ValidationRule<string> {
  return {
    validate: (value: string) => typeof value === 'string' && pattern.test(value),
    message
  };
}

export function validateEmailField(value: string): ValidationResult {
  const errors: string[] = [];
  
  if (!validateRequired(value)) {
    errors.push('El correo electrónico es requerido');
  } else if (!validateEmail(value)) {
    errors.push('El formato del correo electrónico no es válido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePhoneField(value: string): ValidationResult {
  const errors: string[] = [];
  
  if (!validateRequired(value)) {
    errors.push('El teléfono es requerido');
  } else if (!validatePhone(value)) {
    errors.push('El formato del teléfono no es válido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDocumentField(value: string): ValidationResult {
  const errors: string[] = [];
  
  if (!validateRequired(value)) {
    errors.push('El documento es requerido');
  } else if (!validateDocument(value)) {
    errors.push('El documento debe tener entre 6 y 12 dígitos');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateField<T>(value: T, rules: ValidationRule<T>[]): ValidationResult {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateForm<T extends Record<string, unknown>>(
  formData: T,
  validationRules: Partial<Record<keyof T, ValidationRule<unknown>[]>>
): ValidationResult {
  const errors: string[] = [];

  for (const [fieldName, rules] of Object.entries(validationRules)) {
    if (rules && Array.isArray(rules)) {
      const fieldValue = formData[fieldName as keyof T];
      const fieldResult = validateField(fieldValue, rules as ValidationRule<unknown>[]);
      
      if (!fieldResult.isValid) {
        errors.push(...fieldResult.errors.map(err => `${fieldName}: ${err}`));
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeString(value: string): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, '');
}

export function sanitizeNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
}

export function validateDateRange(startDate: Date, endDate: Date): boolean {
  return startDate <= endDate;
}

export function validateAge(birthDate: Date, minAge: number = 18): boolean {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= minAge;
  }
  
  return age >= minAge;
}

export class FormValidator<T extends Record<string, unknown>> {
  private rules: Partial<Record<keyof T, ValidationRule<unknown>[]>> = {};
  private errors: Record<string, string[]> = {};

  setRules(rules: Partial<Record<keyof T, ValidationRule<unknown>[]>>): void {
    this.rules = rules;
  }

  validate(formData: T): boolean {
    this.errors = {};
    let isValid = true;

    for (const [fieldName, fieldRules] of Object.entries(this.rules)) {
      if (fieldRules && Array.isArray(fieldRules)) {
        const fieldValue = formData[fieldName as keyof T];
        const result = validateField(fieldValue, fieldRules as ValidationRule<unknown>[]);
        
        if (!result.isValid) {
          this.errors[fieldName] = result.errors;
          isValid = false;
        }
      }
    }

    return isValid;
  }

  getErrors(): Record<string, string[]> {
    return { ...this.errors };
  }

  getFieldError(fieldName: string): string | undefined {
    return this.errors[fieldName]?.[0];
  }

  clearErrors(): void {
    this.errors = {};
  }
}