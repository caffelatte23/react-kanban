import "./style.css";
import TaskBox, { TaskEditBox } from "../TaskBox";
import { TaskStatus } from "@/types/task";
import { Droppable } from "react-beautiful-dnd";
import { memo, useState, useRef } from "react";
import { useStore } from "@/stores/task";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

type cProps = {
  status?: TaskStatus;
};

const TaskContainer: React.FC<cProps> = memo(({ status = "TODO" }) => {
  const tasks = useStore((state) => state.tasks).filter(
    (d) => d.status === status
  );

  const createTask = useStore((state) => state.createTask);
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = (name: string) => {
    createTask(name, status);
    setIsEdit(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <label className="containerLabel">
          {status} ({tasks.length})
        </label>
        {status === "TODO" && (
          <IconButton
            size={"xs"}
            icon={<AddIcon />}
            aria-label="add task button"
            onClick={() => setIsEdit(true)}
          />
        )}
      </div>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className={`taskContainer ${status}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((d, index) => (
              <TaskBox key={d.id} task={d} index={index} />
            ))}
            {<TaskEditBox visible={isEdit} onSubmit={onSubmit} />}
            <div style={{ display: "none" }}>{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </div>
  );
});

export default TaskContainer;
