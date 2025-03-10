"use client";

import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import axios from "axios";
import toast from "react-hot-toast";

const TasksContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";

export const TasksProvider = ({ children }) => {
  const userId = useUserContext().user?._id;

  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false,
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("All");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

  //get tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks/get`, {
        withCredentials: true, //send cookies
      });

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("error getting tasks", error);
    }
    setLoading(false);
  };

  //get task by id
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/get/${taskId}`, {
        withCredentials: true, //send cookies
      });

      setTask(response.data);
    } catch (error) {
      console.log("error getting task by id", error);
    }
    setLoading(false);
  };

  //create task
  const createTasks = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, task, {
        withCredentials: true,
      });
      setTasks([...tasks, res.data]);
      toast.success("task created successfully");
    } catch (error) {
      console.log("error creating task client", error);
    }
  };

  //update task
  const updateTask = async (tsk) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${serverUrl}/task/update/${tsk._id}`,
        tsk,
        {
          withCredentials: true,
        }
      );

      if (Array.isArray(tasks)) {
        const newTasks = tasks.map((task) =>
          task._id === res.data._id ? res.data : task
        );
        setTasks(newTasks);
      } else {
        setTasks([res.data]); // Fallback in case tasks was empty or undefined
      }
      toast.success("task updated successfully");
    } catch (error) {
      console.log("error updating task", error);
    }
  };

  //delete task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${serverUrl}/task/delete/${taskId}`);

      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);

      setTasks(newTasks);
    } catch (error) {
      console.log("error deleting task", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  //get completed tasks
  const completedTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task.completed)
    : [];

  //get pending tasks
  const activeTasks = Array.isArray(tasks)
    ? tasks.filter((task) => !task.completed)
    : [];

  useEffect(() => {
    getTasks();
  }, [userId]);

  console.log("active tasks", activeTasks);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        task,
        loading,
        getTask,
        createTasks,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        openProfileModal,
        activeTasks,
        completedTasks,
        profileModal,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};
