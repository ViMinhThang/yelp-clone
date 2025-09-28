import React from "react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="flex justify-between align-items-center p-[1rem]">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/next.svg"
          alt="Brand Logo"
          width={90}
          height={20}
        />
      </Link>
    </nav>
  );
};

export default Navbar;
