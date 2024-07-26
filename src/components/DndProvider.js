// components/DndProvider.js
import React from 'react';
import { DndProvider as OriginalDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function DndProvider({ children }) {
  return (
    <OriginalDndProvider backend={HTML5Backend}>
      {children}
    </OriginalDndProvider>
  );
}
