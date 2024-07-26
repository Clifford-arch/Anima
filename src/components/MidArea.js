import React from "react";
import { useDrop } from "react-dnd";

export default function MidArea({ onDrop, droppedItems, onAction }) {
  const [{ isOver }, drop] = useDrop({
    accept: "SIDEBAR_ITEM",
    drop: (item) => {
      onDrop(item);
      const value = parseInt(item.value, 10) || 10; // Default value if not provided
      if (item.name === "moveSteps") {
        onAction("move", value);
      } else if (item.name === "turnLeft") {
        onAction("turn", -value);
      } else if (item.name === "turnRight") {
        onAction("turn", value);
      } else if (item.name === "setRandomPosition") {
        onAction("setRandomPosition");
      } else if (item.name === "glideToRandomPosition") {
        onAction("glideToRandomPosition");
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`flex-1 h-full overflow-auto p-4 ${
        isOver ? "bg-green-100" : ""
      }`}
    >
      {droppedItems.map((item, index) => (
        <div key={index} className="bg-gray-200 p-2 m-2 rounded">
          {item.name} {item.value ? `(${item.value})` : ""}
        </div>
      ))}
    </div>
  );
}
