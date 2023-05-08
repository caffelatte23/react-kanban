import "./style.css";
import TaskBox from "../TaskBox";
import { useState } from "react";
import { TaskModel, TaskStatus } from "../../types/task";

type cProps = {
  status?: TaskStatus;
  tasks: TaskModel[];
  onUpdate: (id: number, status: TaskStatus) => void;
};

const TaskContainer: React.FC<cProps> = ({
  status = "TODO",
  tasks,
  onUpdate,
}) => {
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const nodeData = JSON.parse(e.dataTransfer.getData("node-data"));
    onUpdate(nodeData.id, status);
  };

  const [isDropable, setIsDropable] = useState(false);

  return (
    <div
      className={`taskContainer ${status}`}
      onDrop={onDrop}
      onDragEnter={() => setIsDropable(true)}
      onDragLeave={() => setIsDropable(false)}
      onDragOver={(e) => e.preventDefault()}
    >
      {tasks.map((d) => (
        <TaskBox key={d.id} task={d} />
      ))}
    </div>
  );
};

export default TaskContainer;
