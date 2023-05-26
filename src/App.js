import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';

// app.js = start rendering stuff from this file
function App() {
  return (
    <div className="App">
      {/* BrowserRouter in index,js */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/notes" element={<h1>Notes</h1>} />
        <Route path="/notes/:noteID" element={<h1>Note</h1>} />
        <Route path="/notes/:noteID/edit" element={<h1>Edit</h1>} />
        <Route path="/notes/searchByWord/:word" element={<h1>search</h1>} />
        <Route path="/notes/sort/dueDate" element={<h1>TODO</h1>} />
        <Route path="/notes/sort/createDate" element={<h1>TODO</h1>} />
        <Route path="/notes/filter/overdue" element={<h1>overdue</h1>} />
        <Route path="/notes/filter/done" element={<h1>done</h1>} />
      </Routes>
    </div>

  );
}

export default App;
