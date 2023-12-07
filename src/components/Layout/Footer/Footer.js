"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup")
          ? "hidden"
          : "flex"
      }`}
    >
      Footer
    </div>
  );
};

export default Footer;
