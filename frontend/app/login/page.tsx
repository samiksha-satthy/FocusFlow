"use client"
import React from "react";
import LoginForm from "../components/auth/LoginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function page() {
  const {user} = useUserContext(); 
  const router = useRouter(); 

  useEffect(() => {
    if (user && user._id){
      router.push("/")
    }
  }, [user, router]); 

  //return null or loading screen 
if (user && user._id){
  return null; 
}


  return (
    <div className="auth-page">
      <LoginForm/></div>
  );
}

export default page;