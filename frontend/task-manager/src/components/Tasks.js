import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/css/Task.css";
const Tasks = () => {
  const [tasks, setTasks] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [desc, setDesc] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editingTaskId, setEditingTaskId] = useState(null);

  const navigate = useNavigate();
  const url = "http://localhost:3000";
  const jwtToken = localStorage.getItem("token");

  const getTasks = async () => {
    try {
      const response = await axios.get(`${url}/task`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = response.data;
      setTasks(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/create`,
        { title: newTask, desc },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setNewTask("");
      setDesc("");
      if (response.status === 200) {
        console.log("created successfully");
        getTasks();
        navigate("/tasks");
      } else {
        console.log("task creation failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${url}/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTask = async (taskId) => {
    try {
      await axios.patch(
        `${url}/update/${taskId}`,
        {
          title:
            editedData[taskId]?.title ||
            tasks.find((t) => t._id === taskId)?.title ||
            "",
          desc:
            editedData[taskId]?.desc ||
            tasks.find((t) => t._id === taskId)?.desc ||
            "",
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setEditMode(false);
      setEditingTaskId(null);
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (taskId) => {
    setEditMode(true);
    setEditingTaskId(taskId);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <button onClick={handleLogout} className="logoutBtn">
        LOGOUT
      </button>
      <form method="POST" onSubmit={addTask} className="addTaskForm">
        <input
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <input
          type="text"
          placeholder="Enter Description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button type="submit" className="addTaskBtn">
          Add Task
        </button>
      </form>

      <h2 className="taskHeadline">Your Tasks</h2>
      <ul className="taskList">
        {tasks !== null &&
          tasks.map((task) => (
            <li key={task._id} className="taskItem">
              {editMode && editingTaskId === task._id ? (
                <input
                  className={editMode ? "editingEnabled" : ""}
                  type="text"
                  value={editedData[task._id]?.title || task.title}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      [task._id]: {
                        ...editedData[task._id],
                        title: e.target.value,
                      },
                    })
                  }
                />
              ) : (
                <span className="taskTitle">
                  {" "}
                  <span className="titleLabel">Title :</span> {task.title}
                </span>
              )}

              {editMode && editingTaskId === task._id ? (
                <input
                  type="text"
                  className={editMode ? "editingEnabled" : ""}
                  value={editedData[task._id]?.desc || task.desc}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      [task._id]: {
                        ...editedData[task._id],
                        desc: e.target.value,
                      },
                    })
                  }
                />
              ) : (
                <span className="taskDesc">
                  <span className="titleLabel">Desc :</span> {task.desc}
                </span>
              )}
              <div className="taskOperations">
                {editMode && editingTaskId === task._id ? (
                  <>
                    <span>
                      <button
                        onClick={() => updateTask(task._id)}
                        className="specialBtns"
                      >
                        save
                      </button>
                    </span>
                    <span>
                      <button
                        onClick={() => setEditMode(false)}
                        className="specialBtns"
                      >
                        cancel
                      </button>
                    </span>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(task._id)}
                    className="specialBtns"
                  >
                    update
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task._id)}
                  className="specialBtns"
                >
                  Delete Task
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Tasks;
