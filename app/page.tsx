"use client";

import Header from "./components/Header";
import HeaderServer, { getHeaderData } from "./components/HeaderServer";
import React, { useState } from "react";
import Home from "./components/Home";

export default async function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Home />
    </div>
  );
}
