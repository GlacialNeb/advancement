import React from "react";
import "./Sidebar.css";

type SidebarItem = {
  title: string;
  icon: React.ReactNode;
  route: string; // unique id for the page
};

type SidebarProps = {
  items: SidebarItem[];
  currentRoute: string;
  onSelect: (route: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ items, currentRoute, onSelect }) => {
  return (
    <div className="sidebar">
      {items.map((item) => (
        <div
          key={item.route}
          className={`sidebar-item ${currentRoute === item.route ? "active" : ""}`}
          onClick={() => onSelect(item.route)}
        >
          <span className="sidebar-icon">{item.icon}</span>
          <span className="sidebar-title">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;