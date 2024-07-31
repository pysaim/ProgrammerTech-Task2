import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";

const getLocalItems = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputdata] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditItem, setEditItem] = useState(null);

  const addItems = () => {
    if (!inputdata) {
      alert("Write something on Task to add in list!");
    } else if (inputdata && !toggleBtn) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputdata, notes: notes };
          }
          return elem;
        })
      );

      setToggleBtn(true);
      setInputdata('');
      setNotes('');
      setEditItem(null);
    } else {
      let newData = { id: new Date().getTime().toString(), name: inputdata, notes: notes, completed: false };
      setItems([...items, newData]);
      setInputdata("");
      setNotes("");
    }
  };

  const deleteItems = (index) => {
    const newItems = items.filter((elem) => elem.id !== index);
    setItems(newItems);
  };

  const clearAll = () => {
    setItems([]);
  };

  const editItems = (ind) => {
    const editData = items.find((elem) => elem.id === ind);
    setToggleBtn(false);
    setInputdata(editData.name);
    setNotes(editData.notes);
    setEditItem(ind);
  };

  const toggleComplete = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="inputDiv">
        <input
          type="text"
          value={inputdata}
          onChange={(e) => setInputdata(e.target.value)}
          placeholder="Task Name"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Task Notes"
          className="textarea"
        />
        {
          toggleBtn ?
            (<GrAddCircle className="addItems" onClick={addItems} />) :
            (<FiEdit className="addItems editBtn" onClick={addItems} />)
        }
      </div>

      <div className="showItems">
        {items.map((elem) => {
          return (
            <div className="itemList" key={elem.id}>
              <input
                type="checkbox"
                checked={elem.completed}
                onChange={() => toggleComplete(elem.id)}
                className="checkbox"
              />
              <div className="taskContent">
                <h3 className={elem.completed ? "completed" : ""}>{elem.name}</h3>
                <p>{elem.notes}</p>
              </div>
              <div>
                <FiEdit className="editBtn" onClick={() => editItems(elem.id)} />
                <AiFillDelete className="deleteItems" onClick={() => deleteItems(elem.id)} />
              </div>
            </div>
          );
        })}

        <div className="clearBtn">
          <button onClick={clearAll}>Clear All</button>
        </div>
      </div>
    </>
  );
};

export default Todo;
