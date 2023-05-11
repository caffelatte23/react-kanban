import { TaskModel } from "@/types/task";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";
import { memo, useEffect, useRef, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useStore } from "@/stores/task";

type cProps = {
  task: TaskModel;
  index: number;
};

const TaskBox: React.FC<cProps> = memo(({ task, index }) => {
  const deleteTask = useStore((state) => state.deleteTask);

  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          className="taskBox"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{task.name}</div>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                size={"sm"}
              />
              <MenuList fontSize={"small"}>
                <MenuItem onClick={() => deleteTask(task.id)}>
                  delete task
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="taskBox-id">{task.id}</div>
        </div>
      )}
    </Draggable>
  );
});

export const TaskEditBox: React.FC<{
  onSubmit?: (name: string) => void;
  visible: boolean;
}> = memo(({ onSubmit, visible }) => {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = areaRef.current?.value;
    if (onSubmit && name) onSubmit(name);
  };

  const areaRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (visible && areaRef.current) {
      areaRef.current.focus();
    }
  }, [visible]);
  return (
    <>
      {visible && (
        <div className="taskBox">
          <form onSubmit={submit}>
            <Input
              ref={areaRef}
              style={{ resize: "none" }}
              variant={"unstyled"}
            />
          </form>
        </div>
      )}
    </>
  );
});

export default TaskBox;
