export const TASK_STATUS = {
  open: 'OPEN',
  inprogress: 'IN_PROGRESS',
  done: 'DONE'
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];

export const TAKS_STATUS_LIST_VALUES: TaskStatus[] = Object.values(TASK_STATUS);

export const TAKS_STATUS_LIST_KEY_VALUES = Object.entries(TASK_STATUS);

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TASK_STATUS.open]: 'Open',
  [TASK_STATUS.inprogress]: 'In progress',
  [TASK_STATUS.done]: 'Done',
};

export const TASK_STATUS_FALLBACK_LABEL = 'Open';

/*
[
  { key: "open", value: "OPEN", label: "Open" },
  { key: "inprogress", value: "IN_PROGRESS", label: "In progress" },
  { key: "done", value: "DONE", label: "Done" }
]
*/
export const TASK_STATUS_OPTIONS = Object.entries(TASK_STATUS).map(
  ([key, value]) => ({
    key,          // "open"
    value,        // "OPEN"
    label: TASK_STATUS_LABELS[value], // "Open"
  })
);

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskInput{
  title: string,
  description: string
}

