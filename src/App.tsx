import { useEffect, useState } from "react";
import "./App.css";
import TaskContainer from "./components/TaskContainer";
import { TaskModel, TaskStatus } from "./types/task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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

function App() {
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
    <div className="body">
      <div className="header">header</div>
      <div className="sideBar">sideBar</div>
      <div className="main">
        <DragDropContext onDragEnd={onUpdateTask}>
          {status.map((type) => (
            <TaskContainer
              key={type}
              status={type}
              tasks={taskList.filter((d) => d.status === type)}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
