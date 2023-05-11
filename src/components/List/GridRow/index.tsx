import type { TaskModel } from "@/types/task";
import "./style.css";

type cProps = {
  record: TaskModel;
};

export const GridRow: React.FC<cProps> = ({ record }) => {
  return (
    <div className="grid-row">
      <div>{record.id}</div>
      <div>{record.name}</div>
      <div>{record.status}</div>
    </div>
  );
};
