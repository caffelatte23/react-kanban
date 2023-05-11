import "./style.css";
import TaskBox, { TaskEditBox } from "../TaskBox";
import { TaskStatus } from "@/types/task";
import { Droppable } from "react-beautiful-dnd";
import { memo, useState } from "react";
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

  const onBlur = () => setIsEdit(false);

  return (
    <div className="containerBox">
      <div className="containerHeader">
        <label className="containerLabel">
          {status} ({tasks.length})
        </label>
        {status === "TODO" && (
          <IconButton
            size={"xs"}
            icon={<AddIcon />}
            aria-label="add task button"
            onClick={() => setIsEdit(true)}
            disabled={isEdit}
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
            {
              <TaskEditBox
                visible={isEdit}
                onSubmit={onSubmit}
                onBlur={onBlur}
              />
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});

export default TaskContainer;
