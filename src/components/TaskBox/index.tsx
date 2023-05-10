import { TaskModel } from "@/types/task";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";
import { memo, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

type cProps = {
  task: TaskModel;
  index: number;
};

const TaskBox: React.FC<cProps> = memo(({ task, index }) => {
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
            <Menu direction="rtl">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                size={"sm"}
              />
              <MenuList fontSize={"small"}>
                <MenuItem>New File</MenuItem>
                <MenuItem>New Window</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="taskBox-id">{task.id}</div>
        </div>
      )}
    </Draggable>
  );
});

export default TaskBox;
