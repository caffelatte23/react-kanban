export type TaskStatus = "DONE" | "IN_PROGRESS" | "TODO";

export type TaskModel = {
  id: number;
  name: string;
  status: TaskStatus;
  listOrder: number;
};
