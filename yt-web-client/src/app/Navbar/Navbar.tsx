"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignIn from "./sign-in";
import { onAuthStateChanged, User } from "firebase/auth";
import { onAuthStateChangedHelper } from "../firebase/firebase";
const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  });

  return (
    <nav className="flex justify-between align-items-center p-[1rem]">
      <Link href="/" className="cursor-pointer">
        <Image src="/next.svg" alt="Brand Logo" width={90} height={20} />
      </Link>
      <SignIn user={user} />
    </nav>
  );
};

export default Navbar;
