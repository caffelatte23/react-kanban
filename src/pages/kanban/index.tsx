import TaskContainer from "@/components/TaskContainer";
import { TaskStatus } from "@/types/task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import "./style.css";
import { useStore, taskStatus } from "@/stores/task";

const Main: React.FC = () => {
  const updateTask = useStore((state) => state.updateTask);

  const onDragEnd = (result: DropResult) => {
    updateTask(
      parseInt(result.draggableId),
      result.destination?.droppableId as TaskStatus
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main">
        <div className="board-head">Project1</div>
        <div className="board-body">
          {taskStatus.map((type) => (
            <TaskContainer key={type} status={type} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Main;
