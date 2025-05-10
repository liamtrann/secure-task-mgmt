import { Draggable } from "react-beautiful-dnd";

interface DraggableWrapperProps {
  taskId: string;
  index: number;
  children: React.ReactNode;
}

export const DraggableWrapper = ({
  taskId,
  index,
  children,
}: DraggableWrapperProps) => {
  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 mb-3 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};
