"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "../login/action";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface HeaderProps {
  getCurrentUser?: () => Promise<User | null>;
}

const Header: React.FC<HeaderProps> = ({ getCurrentUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (getCurrentUser) {
      getCurrentUser().then(setUser);
    }
  }, [getCurrentUser]);

  return (
    <div className="flex flex-col">
      {/* Top banner */}
      <div className="bg-[#c5ff3d] p-2 text-center text-sm font-medium">
        🚀 Learn Hub GO: Fall'24 - introducing next-generation prompting.{" "}
        <a href="#" className="underline">
          Watch now →
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-blue-600">
          <h1>Learn Hub</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-600">
            Product
          </a>
          <a href="#" className="text-gray-600">
            Solutions
          </a>
          <a href="#" className="text-gray-600">
            Resources
          </a>
          <a href="#" className="text-gray-600">
            About
          </a>
        </div>
        <div className="flex space-x-2">
          {user ? (
            <form action={signOut} className="flex items-center gap-2">
              <p>{user.email}</p>
              <Button>Sign Out</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
