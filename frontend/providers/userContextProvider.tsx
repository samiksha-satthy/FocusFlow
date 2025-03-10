"use client"; 
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { TasksProvider } from "../context/taskContext";

interface Props {
    children: React.ReactNode;
}

function userContextProvider({children}: Props) {
    return (
        <UserContextProvider>
            <TasksProvider>{children}</TasksProvider> {/* Wrap children with TasksProvider */}
        </UserContextProvider>
    );
}

export default userContextProvider;