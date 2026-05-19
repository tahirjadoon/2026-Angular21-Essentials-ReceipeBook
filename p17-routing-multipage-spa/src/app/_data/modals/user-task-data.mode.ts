export interface UserTaskData {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string; // keep as string since your dummy data uses ISO strings
}

export interface UserTaskCreateData {
  title: string;
  summary: string;
  dueDate: string;
}