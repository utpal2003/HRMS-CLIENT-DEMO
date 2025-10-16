import { useState } from "react";

const Todo = ({ setTodo }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [showBox, setShowBox] = useState(true); // Controls visibility

  const handleAdd = () => {
    if (task.trim() && date && time) {
      setTodos([...todos, { task, date, time }]);
      console.log("Title:", task);
      console.log("Date:", date);
      console.log("Time:", time);
      setTask("");
      setDate("");
      setTime("");
    }
  };

  return (
    <div className="relative z-40">
      {showBox && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md absolute top-4 right-4 dark:bg-gray-900">
          {/* Cross Button */}
          <button
            onClick={() => {
              setShowBox(false);
              setTodo(false);
            }
            }
            className="absolute top-0 right-2 text-gray-400 hover:text-red-500 text-3xl font-bold dark:bg-gray-900"
          >
            ×
          </button>

          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Todo</h1>

          <textarea
            className="w-full border rounded p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
            rows="3"
            placeholder="Write your todo here..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <input
            type="date"
            className="w-full border rounded pl-2 pr-2 py-2 mb-4 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:[color-scheme:dark] bg-[url('/calendar-dark.svg')] bg-no-repeat bg-[right_0.75rem_center] dark:bg-[url('/calendar-white.svg')]"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />


          <input
            type="time"
            className="w-full border rounded pl-2 pr-2 py-2 mb-4 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:[color-scheme:dark] bg-[url('/calendar-dark.svg')] bg-no-repeat bg-[right_0.75rem_center] dark:bg-[url('/calendar-white.svg')]"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            onClick={handleAdd}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded dark"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
