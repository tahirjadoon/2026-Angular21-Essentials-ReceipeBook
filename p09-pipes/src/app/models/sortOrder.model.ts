export const SORT_ORDER = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortOrder = typeof SORT_ORDER[keyof typeof SORT_ORDER];

export const SORT_ORDER_LIST_VALUES: SortOrder[] = Object.values(SORT_ORDER);

export const SORT_ORDER_LIST_KEY_VALUES = Object.entries(SORT_ORDER);
