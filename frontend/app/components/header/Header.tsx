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
            Hello, {""}
          </span>
          {userId ? `welcome ${name}!` : "welcome to FocusFlow!"}
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

    </header>
  );
}

export default Header;
