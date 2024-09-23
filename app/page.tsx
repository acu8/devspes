"use client";

import Header from "./components/Header";
import React, { useState } from "react";
import Home from "./components/Home";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Home />
    </div>
  );
}
