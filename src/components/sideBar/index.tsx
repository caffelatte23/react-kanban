import React from "react";
import "./style.css";

type SideBarProps = {
  children: React.ReactNode;
};

export const SideBar: React.FC<SideBarProps> = (props) => {
  return <div className="sideBar">{props.children}</div>;
};

type itemProps = {
  label: string;
  onClick?: () => void;
  isBottom?: boolean;
};

export const SideBarItem: React.FC<itemProps> = (props) => {
  const { label, onClick, isBottom } = props;

  return (
    <div className={`sideBar-item ${isBottom && "bottom"}`} onClick={onClick}>
      {label}
    </div>
  );
};
