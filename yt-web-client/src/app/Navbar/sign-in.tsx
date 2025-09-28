"use client";
import React from "react";
import { signInWithGoogle, signOut } from "../firebase/firebase";
import { User } from "firebase/auth";

interface SignInProps {
  user: User | null;
}

const SignIn = ({ user }: SignInProps) => {
  return (
    <>
      {user ? (
        <button
          className="inline-block border border-slate-400 text-blue px-5 py-2 rounded-3xl text-md cursor-pointer hover:bg-slate-200 hover:border-1 hover:border-white"
          onClick={signOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="inline-block border border-slate-400 text-blue px-5 py-2 rounded-3xl text-md cursor-pointer hover:bg-slate-200 hover:border-1 hover:border-white"
          onClick={signInWithGoogle}
        >
          Sign In
        </button>
      )}
    </>
  );
};

export default SignIn;
