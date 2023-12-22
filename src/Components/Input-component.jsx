import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function notify(msg) {
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

export default function InputComponent({ setToDo, toDo, setToDos, toDos }) {


    return (
        <div className="input-container flex items-center mb-4">
            <input
                className="border-2 border-gray-300 rounded-l-md p-2 outline-none focus:border-blue-500 flex-1"
                value={toDo}
                onChange={(event) => setToDo(event.target.value)}
                type="text"
                placeholder="Add a new task"
            />
            <button
                onClick={() => {
                    if (toDo.trim() === '') {
                        notify("Input value is empty");
                    } else {
                        setToDos(() => [...toDos, { id: Date.now(), toDo, checked: false }]);
                        setToDo('');
                    }
                }}

                className="bg-blue-500 text-white rounded-r-md p-2.5">
                <FaPlus className='' />
            </button>
            <ToastContainer />
        </div>
    )
}

