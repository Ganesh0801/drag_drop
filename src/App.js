import React, { useState } from 'react';
import './App.css';

function App() {
  // Initial array matching the required digits 0 to 9
  const [items, setItems] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reorderedItems = [...items];
    const [removedItem] = reorderedItems.splice(draggedIndex, 1);
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
        {/* Test Case 1 Fix: Explicit Title string match */}
        <h1 className="title">Drag & Drop Digits</h1>
        
        {/* Test Case 2 Fix: Exact description and tip strings */}
        <p className="description">Drag the boxes to reorder the digits 0–9.</p>
        <p className="tip-text">Tip: Try reordering to make 0123456789 or reverse it!</p>
        
        {/* Test Case 3 Fix: Renders full grid from 0 to 9 */}
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