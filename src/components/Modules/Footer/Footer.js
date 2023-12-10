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
      } fixed inset-x-0 bottom-0 text-white`}
    >
      Mini player
    </div>
  );
};

export default Footer;
