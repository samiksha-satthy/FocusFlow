"use client";

import { useUserContext } from "@/context/userContext";
import React from "react";

function Profile() {
  const { user } = useUserContext();
  return (
    <div className="mt-6">
      <div
        className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem]
        hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white dark:border-[#f9f9f9]/10"
      >
        hello
      </div>
    </div>
  );
}

export default Profile;
