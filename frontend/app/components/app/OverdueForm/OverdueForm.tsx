"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/constUserRedirect";
import { useState } from "react";
import React from "react";
import Filters from "../../filters/Filters";
import TaskItem from "../../TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { filterTasks } from "@/utils/utilities";
import { setPriority } from "os";
import { useEffect } from "react";
import { overdueTasks } from "@/utils/utilities";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority } = useTasks();

  const overdue = overdueTasks(tasks);

  const filtered = filterTasks(overdue, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="pr-[350px] pl-[40px] pr-6 pt-6 h-full">
      <div className="flex items-center gap-180">
        <h1 className="text-2xl font-bold">Overdue Tasks</h1>
        <Filters />
      </div>

      <div className="pb-[4rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2.5">
        {filtered?.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <button
          className="h-[16rem] w-[280px] py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400 hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
        >
          Add New Task
        </button>
      </div>
    </main>
  );
}
