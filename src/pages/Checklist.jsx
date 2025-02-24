import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask } from "../redux/checklistSlice";
import "./Checklist.css"; // Import the CSS file for styling

const Checklist = () => {
  const tasks = useSelector((state) => state.checklist.tasks);
  const dispatch = useDispatch();
  const sparkleRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (checklistType) => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      dispatch(addTask({ checklistType, taskName }));
    }
  };

  const handleToggleTask = (checklistType, taskId) => {
    dispatch(toggleTask({ checklistType, taskId }));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };

  const calculateProgress = (checklist) => {
    const completedTasks = checklist.filter((task) => task.completed).length;
    const totalTasks = checklist.length;
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  };

  const overallProgress = () => {
    const allTasks = Object.values(tasks).flat();
    return calculateProgress(allTasks);
  };

  useEffect(() => {
    if (overallProgress() === 100 && sparkleRef.current) {
      sparkleRef.current.classList.add("sparkle");
      setTimeout(() => {
        sparkleRef.current.classList.remove("sparkle");
      }, 2000);
    }
  }, [tasks]);

  return (
    <div className="checklist-container">
      <h1 className="checklist-title">Task Progress</h1>
      <div className="circular-progress-bar-container large" ref={sparkleRef}>
        <svg className="circular-progress-bar" viewBox="0 0 36 36">
          <path
            className="circle-bg"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={`${overallProgress()}, 100`}
            style={{
              stroke:
                overallProgress() === 0
                  ? "none"
                  : overallProgress() === 100
                  ? "#28a745"
                  : "#007bff",
            }}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">
            {overallProgress().toFixed(0)}%
          </text>
        </svg>
      </div>
      {Object.entries(tasks).map(([checklistType, checklist]) => (
        <div key={checklistType}>
          <h2 className="checklist-subtitle">{checklistType}</h2>
          <div className="circular-progress-bar-container small">
            <svg className="circular-progress-bar" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${calculateProgress(checklist)}, 100`}
                style={{
                  stroke:
                    calculateProgress(checklist) === 0
                      ? "none"
                      : calculateProgress(checklist) === 100
                      ? "#28a745"
                      : "#007bff",
                }}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {calculateProgress(checklist).toFixed(0)}%
              </text>
            </svg>
          </div>
          <ul className="timeline">
            {checklist.map((task, index) => (
              <li key={task.id} className="timeline-item">
                <div className="timeline-content">
                  <span className="task-index">{index + 1}.</span>
                  <span
                    className={
                      task.completed ? "task-name completed" : "task-name"
                    }
                  >
                    {task.name}
                  </span>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(checklistType, task.id)}
                    className="task-checkbox circular-checkbox"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span
                    className="info-icon"
                    onClick={() => handleTaskClick(task)}
                    style={{ color: "black", marginLeft: "10px" }}
                  >
                    ℹ️
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="bottom-text">
        <p>End of Checklist</p>
      </div>
      {selectedTask && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Task Details</h2>
            <p>
              <strong>ID:</strong> {selectedTask.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedTask.name}
            </p>
            <p>
              <strong>Completed:</strong>{" "}
              {selectedTask.completed ? "Yes" : "No"}
            </p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
