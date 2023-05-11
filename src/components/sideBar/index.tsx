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
  to?: string;
  isBottom?: boolean;
};

export const SideBarItem: React.FC<itemProps> = (props) => {
  const { label, onClick, isBottom, to } = props;

  const onClickEvent = () => {
    if (to) window.location.href = window.location.origin + to;
    else if (onClick) onClick();
  };

  const location = to ? window.location.pathname : "";

  return (
    <div
      className={`sideBar-item ${isBottom && "bottom"} ${
        location === to && "active"
      }`}
      onClick={onClickEvent}
    >
      {label}
    </div>
  );
};
