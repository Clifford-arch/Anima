// components/ActionHistory.js
import React from "react";

export default function ActionHistory({ actions, onReplay }) {
  return (
    <div className="p-2">
      <ul>
        {actions.map((action, index) => (
          <li
            key={index}
            className="cursor-pointer"
            onClick={() => onReplay(index)}
          >
            {action.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
