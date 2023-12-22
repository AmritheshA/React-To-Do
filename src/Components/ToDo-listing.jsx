import React, { useState } from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function errorNotification(msg) {
    toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        style: {
            width: "300px",
            borderRadius: "8px",
            background: "#f8ecc2",
            color: "#333",
            fontSize: "16px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
    });
}
function successNotification(msg) {
    toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        style: {
            width: "300px",
            borderRadius: "8px",
            background: "#f8ecc2",
            color: "#333",
            fontSize: "16px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
    })
}

export default function ToDoListing({ toDos, setToDos }) {
    const [editId, setEditId] = useState(null);
    const [editedToDo, setEditedToDo] = useState('');

    const handleEditToggle = (id, currentToDo) => {
        setEditId(id);
        setEditedToDo(currentToDo);
    };

    const handleEditSave = (id) => {
        if (editedToDo.trim() === '') {
            errorNotification("Empty");
        } else {
            setToDos((prevToDos) =>
                prevToDos.map((item) =>
                    item.id === id ? { ...item, toDo: editedToDo } : item
                )
            );
            successNotification("Updated");
            setEditId(null);
        }
    };

    return (
        <ul className="space-y-4">
            {toDos.map((item) => (
                <div key={item.id} className="flex items-center mb-2 todo-item">
                    <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(event) =>
                            setToDos((prevToDos) =>
                                prevToDos.map((prevItem) =>
                                    prevItem.id === item.id
                                        ? { ...prevItem, checked: event.target.checked }
                                        : prevItem
                                )
                            )
                        }
                        className="mr-2"
                    />
                    <label className={`ml-4 text-2xl font-medium text-white ${item.checked ? 'line-through text-red-500' : ''}`}>
                        {item.checked && <s className="line-through text-gray-600" />}
                        {item.id === editId ? (
                            <input
                                type="text"
                                value={editedToDo}
                                onChange={(e) => setEditedToDo(e.target.value)}
                                onBlur={() => handleEditSave(item.id)}
                                autoFocus
                                className="border-0   outline-none bg-transparent" />
                        ) : (
                            item.toDo
                        )}
                    </label>

                    <button
                        onClick={() => handleEditToggle(item.id, item.toDo)}
                        className="mr-2 text-xl text-blue-500 ml-auto"
                    >
                        <FaEdit />
                    </button>

                    <button
                        onClick={() => setToDos((toDos) => toDos.filter((toDo) => toDo.id !== item.id))}
                        className="text-lg text-red-500 ml-2"
                    >
                        <span>
                            <FaTimes />
                        </span>
                    </button>
                </div>
            ))}
        </ul>
    );
}
