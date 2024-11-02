"use client";

import Header from "./components/Header";
import React from "react";
import Home from "./components/Home";
import { getCurrentUser } from "./login/action";

export default async function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header getCurrentUser={getCurrentUser} />
      <Home />
      
    </div>
  );
}
