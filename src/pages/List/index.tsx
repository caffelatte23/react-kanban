import { TaskStatus } from "@/types/task";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

import "./style.css";
import { useStore, taskStatus } from "@/stores/task";
import { GridRow } from "@/components/List/GridRow";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const ListView: React.FC = () => {
  const tasks = useStore((state) => state.tasks).sort(
    (a, b) => a.listOrder - b.listOrder
  );
  const updateTaskOrder = useStore((state) => state.updateTaskOrder);

  const onDragEnd = (result: DropResult) => {
    updateTaskOrder(
      parseInt(result.draggableId),
      result.destination?.index as number
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main">
        <div className="board-head">Project1</div>
        <div className="board-body">
          <TableContainer width={"100%"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>id</Th>
                  <Th>name</Th>
                  <Th>status</Th>
                </Tr>
              </Thead>
              <Droppable droppableId="list">
                {(provided) => (
                  <Tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.map((d, idx) => (
                      <Draggable
                        key={d.id}
                        draggableId={String(d.id)}
                        index={idx}
                      >
                        {(provided, snapshot) => (
                          <Tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Td>{d.id}</Td>
                            <Td>{d.name}</Td>
                            <Td>{d.status}</Td>
                          </Tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Tbody>
                )}
              </Droppable>
            </Table>
          </TableContainer>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ListView;
