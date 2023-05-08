import { TaskModel } from "@/types/task";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";

type cProps = {
  task: TaskModel;
  index: number;
};

const TaskBox: React.FC<cProps> = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className="taskBox"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>id: {task.id}</div>
          <div>{task.name}</div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskBox;
