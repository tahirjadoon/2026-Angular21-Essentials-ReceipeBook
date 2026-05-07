
export const TEMP_UNITS = {
  cel: 'cel',
  far: 'far',
} as const;

export type TempUnit = typeof TEMP_UNITS[keyof typeof TEMP_UNITS];

export const TEMP_UNIT_LIST_VALUES: TempUnit[] = Object.values(TEMP_UNITS);

export const TEMP_UNIT_LIST_KEY_VALUES = Object.entries(TEMP_UNITS);

