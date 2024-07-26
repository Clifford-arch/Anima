import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Icon from "./Icon";

const SidebarItem = ({ name, children }) => {
  const [inputValue, setInputValue] = useState("");

  const [{ isDragging }, drag] = useDrag({
    type: "SIDEBAR_ITEM",
    item: { name, value: inputValue },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const placeholderText = name === "moveSteps" ? "Steps" : "Degrees";

  return (
    <div
      ref={drag}
      className={`flex flex-row items-center bg-blue-500 text-white px-4 py-2 my-2 text-sm cursor-pointer rounded-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-center">
          {children}
          {(name === "moveSteps" ||
            name === "turnLeft" ||
            name === "turnRight" ||
            name === "changeSize") && (
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="ml-2 rounded-md w-20 text-black"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold mb-2">{"Events"}</div>
      <SidebarItem name="whenFlagClicked">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </SidebarItem>
      <SidebarItem name="whenSpriteClicked">
        {"When this sprite clicked"}
      </SidebarItem>
      <div className="font-bold mt-4 mb-2">{"Motion"}</div>
      <SidebarItem name="moveSteps">
        {"Move"}
        {" Steps"}
      </SidebarItem>
      <SidebarItem name="turnLeft">
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"degrees"}
      </SidebarItem>
      <SidebarItem name="turnRight">
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"degrees"}
      </SidebarItem>

      <SidebarItem name="setRandomPosition">
        {"Set Random Position"}
      </SidebarItem>
      <SidebarItem name="glideToRandomPosition">
        {"Glide to Random Position"}
      </SidebarItem>
      <div className="font-bold mt-4 mb-2">{"Looks"}</div>
      <SidebarItem name="changeSize">{"Change Size by"}</SidebarItem>
    </div>
  );
}
