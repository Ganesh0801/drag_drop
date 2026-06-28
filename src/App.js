import React, { useState } from 'react';
import './App.css';

function App() {
  // Initial array list sequence matching the screenshots
  const [items, setItems] = useState(['1', '2', '3', '4', '5']);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    // Standard HTML5 Drag transfer setup
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    // Necessary to prevent default behavior to allow a valid drop trigger event
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reorderedItems = [...items];
    // Remove the dragged item from its original position
    const [removedItem] = reorderedItems.splice(draggedIndex, 1);
    // Insert the dragged item into its target position (shifting elements)
    reorderedItems.splice(targetIndex, 0, removedItem);

    setItems(reorderedItems);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Drag & Drop</h1>
        
        <div className="list-container">
          {items.map((item, index) => (
            <div
              key={item}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`drag-item ${draggedIndex === index ? 'dragging' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;