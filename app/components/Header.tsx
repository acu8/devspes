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
              <Button>サインアウト</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/login">サインイン</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
