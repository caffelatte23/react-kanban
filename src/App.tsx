import { useEffect, useState } from "react";
import "./App.css";
import TaskContainer from "./components/TaskContainer";
import { TaskModel, TaskStatus } from "./types/task";

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

  const onUpdateTask = (id: number, status: TaskStatus) => {
    const newList = [...taskList];
    const targetIdx = newList.findIndex((d) => d.id === id);

    if (targetIdx !== -1) newList[targetIdx].status = status;
    setTaskList(newList);
  };

  useEffect(() => {
    setTaskList(tasks);
  }, []);

  return (
    <div className="body">
      <div className="header">header</div>
      <div className="sideBar">sideBar</div>
      <div className="main">
        {status.map((type) => (
          <TaskContainer
            key={type}
            status={type}
            tasks={taskList.filter((d) => d.status === type)}
            onUpdate={onUpdateTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
