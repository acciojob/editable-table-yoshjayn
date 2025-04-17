import React, { useRef, useState } from "react";

const initialData = [
  { id: 1, name: "Ram", age: 23 },
  { id: 2, name: "Shyam", age: 30 },
  { id: 3, name: "Ali", age: 35 },
  { id: 4, name: "Shaw", age: 20 },
  { id: 5, name: "Tavneetsa", age: 47 },
  { id: 6, name: "Lakshmi", age: 40 },
];

export default function EditableTable() {
  const refData = useRef(initialData);
  const [editedData, setEditedData] = useState({});

  const handleInputChange = (id, field, value) => {
    let index = refData.current.findIndex(value=>value.id==id)

    refData.current[index][field] = value;

    // setEditedData((prev) => ({
    //   ...prev,
    //   [id]: { ...(prev[id] || {}), [field]: value },
    // }));
  };

  const handleSaveChanges = () => {
    setEditedData((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {})},
    }));
    console.log("Edited rows:", editedData);
    setEditedData({});
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Track edited cells to log updates for future</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {refData.current.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleInputChange(row.id, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.age}
                  onChange={(e) =>
                    handleInputChange(row.id, "age", Number(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={handleSaveChanges}>Save changes</button>
    </div>
  );
}
