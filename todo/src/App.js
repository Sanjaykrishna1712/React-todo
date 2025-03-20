import { useState } from "react";
import { FaPlus, FaTrash, FaUserPlus } from "react-icons/fa";
import "./App.css";
export default function TodoApp() {
  const [users, setUsers] = useState([]); // Stores users
  const [userName, setUserName] = useState(""); // Input for new user
  const [selectedUser, setSelectedUser] = useState(null); // Current user
  const [tasks, setTasks] = useState({}); // Stores tasks for each user
  const [task, setTask] = useState(""); // Input for new task

  // Add a new user
  const addUser = () => {
    if (userName.trim() && !users.includes(userName)) {
      setUsers([...users, userName]);
      setTasks({ ...tasks, [userName]: [] }); // Initialize empty tasks for user
      setUserName("");
    }
  };

  // Select user to view their tasks
  const selectUser = (user) => {
    setSelectedUser(user);
  };

  // Add a task for the selected user
  const addTask = () => {
    if (task.trim() && selectedUser) {
      setTasks({
        ...tasks,
        [selectedUser]: [...tasks[selectedUser], { id: Date.now(), text: task, completed: false }],
      });
      setTask("");
    }
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    if (selectedUser) {
      setTasks({
        ...tasks,
        [selectedUser]: tasks[selectedUser].map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      });
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    if (selectedUser) {
      setTasks({
        ...tasks,
        [selectedUser]: tasks[selectedUser].filter(t => t.id !== id),
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Multi-User To-Do App</h2>

      {/* Add User Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Enter user name"
        />
        <button onClick={addUser} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <FaUserPlus className="mr-1" /> Add User
        </button>
      </div>

      {/* User Selection */}
      <div className="mb-4">
        <h3 className="font-semibold">Select User:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {users.map((user) => (
            <button
              key={user}
              onClick={() => selectUser(user)}
              className={`px-4 py-2 rounded ${
                selectedUser === user ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {user}
            </button>
          ))}
        </div>
      </div>

      {/* Task Input - Only Show if a User is Selected */}
      {selectedUser && (
        <>
          <h3 className="font-semibold mb-2">To-Do List for {selectedUser}</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="border p-2 flex-1 rounded"
              placeholder="Add a new task"
            />
            <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
              <FaPlus />
            </button>
          </div>

          {/* Task List */}
          <ul>
            {tasks[selectedUser]?.map((t) => (
              <li
                key={t.id}
                className={`flex justify-between items-center p-2 border-b ${
                  t.completed ? "line-through text-gray-500" : ""
                }`}
              >
                <span onClick={() => toggleComplete(t.id)} className="cursor-pointer">
                  {t.text}
                </span>
                <button onClick={() => deleteTask(t.id)} className="text-red-500">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
