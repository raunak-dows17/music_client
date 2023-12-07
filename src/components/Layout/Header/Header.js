"use client"

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname.startsWith("/auth/signin") ||
        pathname.startsWith("/auth/signup")
          ? "hidden"
          : "flex"
      }`}
    >
      Header
    </div>
  );
}

export default Header
