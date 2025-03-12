"use client"
import React from "react";
import RegisterForm from "../components/auth/RegisterForm/RegisterForm";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import { useEffect } from "react";

function page() {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user && user._id) {
      router.push("/");
    }
  }, [user, router]);

  if (user && user._id) {
    return null;
  }

  return (
    <div className="auth-page">
      <RegisterForm />
    </div>
  );
}

export default page;
