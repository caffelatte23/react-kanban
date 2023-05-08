import { TaskModel } from "@/types/task";
import "./style.css";

const TaskBox: React.FC<{ task: TaskModel }> = ({ task }) => {
  return (
    <div
      className="taskBox"
      draggable
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        e.dataTransfer.setData("node-data", JSON.stringify(task))
      }
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) =>
        e.dataTransfer.clearData()
      }
    >
      id: {task.id}
    </div>
  );
};

export default TaskBox;
