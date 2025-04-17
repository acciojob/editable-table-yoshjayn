import React, { useRef, useState } from "react";

const initialData = [
  { id: 1, name: "Ram", age: 25 },
  { id: 2, name: "Shyam", age: 30 },
  { id: 3, name: "Ali", age: 35 },
  { id: 4, name: "Shaw", age: 20 },
  { id: 5, name: "Tavneet", age: 50 },
  { id: 6, name: "Lakshmi", age: 40 },
];

function App() {
  const dataRef = useRef(initialData);
  const [, forceUpdate] = useState(); // for re-rendering the UI
  const editedRowsRef = useRef(new Set()); // to track edited row IDs

  const handleInputChange = (id, field, value) => {
    const index = dataRef.current.findIndex((row) => row.id === id);
    if (index !== -1) {
      dataRef.current[index][field] = value;
      editedRowsRef.current.add(id);
      forceUpdate({}); // trigger UI update
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedIds = Array.from(editedRowsRef.current);
    console.log("Edited rows:", editedIds);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Track edited cells to log updates for future</h2>
      <form onSubmit={handleSubmit}>
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%", borderColor: "white" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {dataRef.current.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={row.name}
                    onChange={(e) => handleInputChange(row.id, "name", e.target.value)}
                    style={{ width: "100%" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter age"
                    value={row.age}
                    onChange={(e) => handleInputChange(row.id, "age", e.target.value)}
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}

export default App;
