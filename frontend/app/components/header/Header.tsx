"use client";

import { useUserContext } from "@/context/userContext";
import React from "react";
import Link from "next/link";
import { profile, moon } from "@/utils/icons";
import { useTasks } from "@/context/taskContext";

function Header() {
  const { user } = useUserContext();
  const {openModalForAdd, activeTasks} = useTasks();

  const { name } = user;

  const userId = user._id;

  /*
  - welcome text including user's name
  - how many active tasks are remaining 

  */

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div className="">
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `welcome ${name}!` : "welcome to le site"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have <span className="font-bold text-[#3aafae]">{activeTasks.length}</span>
              &nbsp;active tasks
            </>
          ) : (
            "please login/register to view your tasks"
          )}
        </p>
      </div>

      <div className="h-[50px] flex items-center gap-[1rem]">
        <button className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px] hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
        onClick={openModalForAdd}>
          Create a new Task
        </button>

          <div className="flex items-center">
            <Link href="https://github.com/samiksha-satthy/task-manager/tree/master"
            passHref
            target="_blank"
            rel="noopener-noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center"
            >
              {moon}
            </Link>
          
            <Link href="https://github.com/samiksha-satthy/task-manager/tree/master"
            passHref
            target="_blank"
            rel="noopener-noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center"
            >
              {profile}
            </Link>
          </div>

      </div>
    </header>
  );
}

export default Header;
