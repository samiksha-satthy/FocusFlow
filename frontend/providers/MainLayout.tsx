"use client";
import Modal from "@/app/components/Modal/Modal";
import React from "react";
import { useTasks } from "@/context/taskContext";
import ProfileModal from "@/app/components/Profile/ProfileModal";


interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout({children}: MainLayoutProps){
    const {isEditing, profileModal} = useTasks(); 
    return <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-auto">
        {isEditing && <Modal />}
        {profileModal && <ProfileModal/>}
        {children}
    </div>
}; 

export default MainLayout; 