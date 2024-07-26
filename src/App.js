import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import Icon from "./components/Icon";

export default function App() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [actions, setActions] = useState([]);
  const catSpriteRef = useRef(null);

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  const handleAction = (actionType, value) => {
    setActions((prevActions) => [...prevActions, { type: actionType, value }]);
    if (catSpriteRef.current) {
      if (actionType === "move") {
        catSpriteRef.current.move(value);
      } else if (actionType === "turn") {
        catSpriteRef.current.turn(value);
      } else if (actionType === "setRandomPosition") {
        catSpriteRef.current.setRandomPosition();
      } else if (actionType === "glideToRandomPosition") {
        catSpriteRef.current.glideToRandomPosition();
      }
    }
  };

  const replayLastAction = () => {
    if (actions.length > 0) {
      const lastAction = actions[actions.length - 1];
      handleAction(lastAction.type, lastAction.value);
    }
  };

  const playAllActions = () => {
    const whenFlagClickedIndex = droppedItems.findIndex(
      (item) => item.name === "whenFlagClicked"
    );

    if (whenFlagClickedIndex !== -1) {
      const actionsToPlay = actions.slice(whenFlagClickedIndex);
      let delay = 0;
      actionsToPlay.forEach((action, index) => {
        setTimeout(() => {
          handleAction(action.type, action.value);
        }, delay);
        delay += 1000; // Adjust delay as needed (1000 ms = 1 second)
      });

      // Reset actions after playing to ensure it only plays once
      setActions((prevActions) => prevActions.slice(0, whenFlagClickedIndex));
    }
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans h-screen flex flex-row overflow-hidden">
      <div className="w-1/4 flex flex-col">
        <button
          className="bg-blue-500 text-white w-24 py-1 rounded mb-1 mx-1"
          onClick={replayLastAction}
        >
          Replay Last Action
        </button>
        <button
          className="bg-green-500 text-white w-24 h-10 py-1 rounded mb-1 mx-1"
          onClick={playAllActions}
        >
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          Play All
        </button>
        <div className="flex-1 overflow-hidden flex flex-col">
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 flex flex-row overflow-hidden">
        <div className="flex-1 h-full overflow-hidden flex flex-col bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <MidArea
            onDrop={handleDrop}
            droppedItems={droppedItems}
            onAction={handleAction}
          />
        </div>
        <div className="w-1/3 h-full overflow-hidden flex flex-col bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea ref={catSpriteRef} />
        </div>
      </div>
    </div>
  );
}
