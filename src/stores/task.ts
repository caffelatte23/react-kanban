import { TaskModel, TaskStatus } from "@/types/task";
import { create } from "zustand";

type TaskStore = {
  tasks: TaskModel[];
  createTask: (name: string, status: TaskStatus) => void;
  updateTask: (id: number, status: TaskStatus) => void;
  updateTaskOrder: (id: number, listOrder: number) => void;
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
      listOrder: 0,
    },
    {
      id: 2,
      name: "hello",
      status: "TODO",
      listOrder: 1,
    },
    {
      id: 3,
      name: "hello",
      status: "TODO",
      listOrder: 2,
    },
  ],
  createTask: (name: string, status: TaskStatus) => {
    const tasks = get().tasks;

    const orderArray = tasks.map((d) => d.listOrder);
    const nextOrder = orderArray.reduce((a, b) => Math.max(a, b), -1);

    const newTask: TaskModel = {
      id: newTaskId,
      name,
      status,
      listOrder: nextOrder + 1,
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
  updateTaskOrder: (id: number, listOrder: number) => {
    const tasks = get().tasks;

    const changedTaskIdx = tasks.findIndex((d) => d.id === id);

    if (changedTaskIdx !== -1) {
      const beforeOrder = tasks[changedTaskIdx].listOrder;
      const newTask = tasks
        .sort((a, b) => a.listOrder - b.listOrder)
        .map((d) => {
          if (d.id === id) {
            return { ...d, listOrder };
          } else if (
            d.listOrder >= Math.min(listOrder, beforeOrder) &&
            d.listOrder <= Math.max(listOrder, beforeOrder)
          ) {
            const order = beforeOrder > listOrder ? 1 : -1;
            return { ...d, listOrder: d.listOrder + order };
          }
          return d;
        });
      console.log(newTask);

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
