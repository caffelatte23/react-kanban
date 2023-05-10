import { useEffect, useState } from "react";
import TaskContainer from "@/components/TaskContainer";
import { TaskModel, TaskStatus } from "@/types/task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import "./style.css";

const tasks: TaskModel[] = [
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
];

const Main: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskModel[]>([]);
  const status: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];
  //

  const onUpdateTask = (result: DropResult) => {
    const newTask = [...taskList];
    const changedTaskIdx = taskList.findIndex(
      (d) => d.id === parseInt(result.draggableId)
    );

    if (changedTaskIdx !== -1) {
      newTask[changedTaskIdx].status = result.destination
        ?.droppableId as TaskStatus;

      setTaskList(newTask);
    }
  };

  useEffect(() => {
    setTaskList(tasks);
  }, []);

  return (
    <DragDropContext onDragEnd={onUpdateTask}>
      <div className="main">
        <div className="board-head">Project1</div>
        <div className="board-body">
          {status.map((type) => (
            <TaskContainer
              key={type}
              status={type}
              tasks={taskList.filter((d) => d.status === type)}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Main;
