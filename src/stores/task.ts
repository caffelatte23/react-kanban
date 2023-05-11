import { TaskModel, TaskStatus } from "@/types/task";
import { create } from "zustand";

type TaskStore = {
  tasks: TaskModel[];
  createTask: (name: string, status: TaskStatus) => void;
  updateTask: (id: number, status: TaskStatus) => void;
  deleteTask: (id: number) => void;
};

export const taskStatus: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

const findIndex = (get: () => TaskStore, id: number): number => {
  return get().tasks.findIndex((d) => d.id === id);
};

let newTaskId = 4;

export const useStore = create<TaskStore>((set, get) => ({
  tasks: [
    {
      id: 1,
      name: "hello",
      status: "TODO",
    },
    {
      id: 2,
      name: "hello",
      status: "TODO",
    },
    {
      id: 3,
      name: "hello",
      status: "TODO",
    },
  ],
  createTask: (name: string, status: TaskStatus) => {
    const tasks = get().tasks;

    const newTask: TaskModel = {
      id: newTaskId,
      name,
      status,
    };

    set((_state) => ({ tasks: [...tasks, newTask] }), false);

    newTaskId++;
  },
  updateTask: (id: number, status: TaskStatus) => {
    const newTask = get().tasks;

    const changedTaskIdx = newTask.findIndex((d) => d.id === id);

    if (changedTaskIdx !== -1) {
      newTask[changedTaskIdx].status = status;

      set((_state) => ({ tasks: [...newTask] }), false);
    }
  },
  deleteTask: (id: number) => {
    const tasks = get().tasks;
    const changedTaskIdx = findIndex(get, id);

    if (changedTaskIdx !== -1) {
      set((_state) => ({ tasks: tasks.filter((d) => d.id !== id) }), false);
    }
  },
}));
