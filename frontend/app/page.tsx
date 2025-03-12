"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/constUserRedirect";
import { useState } from "react";
import React from "react";
import Filters from "./components/filters/Filters";
import TaskItem from "./components/TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { filterTasks } from "@/utils/utilities";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { container } from "@/utils/animations";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority } = useTasks();

  const filtered = filterTasks(tasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="pr-[350px] pl-[40px] pr-6 pt-6 h-full">
      <div className="flex items-center gap-194">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </div>

      <motion.div
        className="pb-[4rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2.5"
        variants={container}
        initial="hidden"
        animate="visible"
      >
          {filtered.map((task: Task, i: number) => (
            <TaskItem key={i} task={task} />
          ))}

        <motion.button
          className="h-[16rem] w-[280px] py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400 hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}
