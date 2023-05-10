import "./style.css";
import TaskBox from "../TaskBox";
import { TaskModel, TaskStatus } from "../../types/task";
import { Droppable } from "react-beautiful-dnd";
import { memo } from "react";

type cProps = {
  status?: TaskStatus;
  tasks: TaskModel[];
};

const TaskContainer: React.FC<cProps> = memo(({ status = "TODO", tasks }) => {
  return (
    <div>
      <label className="containerLabel">
        {status} ({tasks.length})
      </label>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            className={`taskContainer ${status}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((d, index) => (
              <TaskBox key={d.id} task={d} index={index} />
            ))}
            <div style={{ display: "none" }}>{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </div>
  );
});

export default TaskContainer;
