import "./style.css";
import TaskBox from "../TaskBox";
import { useState } from "react";
import { TaskModel, TaskStatus } from "../../types/task";
import { Droppable } from "react-beautiful-dnd";

type cProps = {
  status?: TaskStatus;
  tasks: TaskModel[];
};

const TaskContainer: React.FC<cProps> = ({ status = "TODO", tasks }) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <span className="containerLabel">{status}</span>
          <div className={`taskContainer ${status}`}>
            {tasks.map((d, index) => (
              <TaskBox key={d.id} task={d} index={index} />
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskContainer;
