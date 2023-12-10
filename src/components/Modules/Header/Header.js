"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../../../public/logo.png";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { Images } from "@/components/Assets/ProfilePictures";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [profile, setProfile] = useState(0);
  const [userData, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("music-token");
    const fetchUserData = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then((res) => res.json())
          .then((data) => setData(data))
          .catch((error) => console.error(error.message));

        setProfile(userData?.profilePic);
      } catch (error) {
        console.error(error.message);
      }
      router.refresh();
    };

    fetchUserData();
  }, [profile]);

  const handleLogout = () => {
    localStorage.removeItem("music-token");
    window.location.reload();
  };

  return (
    <main
      className={`${
        pathname.startsWith("/auth/signin") ||
        pathname.startsWith("/auth/signup")
          ? "hidden"
          : "flex"
      } shadow-xl bg-black/30`}
    >
      <div className="flex justify-between gap-5 w-10/12 mx-auto items-center py-3">
        <Link
          href={"/"}
          className="flex justify-center items-center overflow-hidden w-14 rounded-full shrink-0"
        >
          <Image
            src={logo}
            alt="TrackEase"
            className="w-full h-full object-cover"
          />
        </Link>
        <form className="flex items-center bg-black/50 rounded-xl px-3 py-2 gap-4 w-1/4">
          <label htmlFor="search">
            <FaSearch />
          </label>
          <input
            type="text"
            placeholder="search"
            className="w-full outline-none bg-transparent focus:outline-none"
          />
        </form>
        <div className={`flex items-center gap-3`}>
          <Link
            href={"/"}
            className={`${
              pathname === "/" ? "text-blue-400/90 underline" : ""
            } hover:underline underline-offset-4`}
          >
            Home
          </Link>
          {userData?.isAdmin && (
            <Link
              href={`/music/adminpanel/${userData?.username}`}
              className={`${
                pathname.startsWith("/music/adminpanel")
                  ? "text-blue-400/90 underline"
                  : ""
              } hover:underline underline-offset-4`}
            >
              Admin
            </Link>
          )}
        </div>
        <div
          className={`${
            pathname.startsWith("/userprofile") ? "hidden" : "flex"
          } items-center justify-center gap-3`}
        >
          <Link
            href={`/userprofile/${userData?.username}/${userData?.id}`}
            className="w-12 flex justify-center items-center overflow-hidden rounded-full"
          >
            <img src={Images[profile]} alt="" />
          </Link>
          <button
            onClick={handleLogout}
            className={`bg-red-600 rounded-xl px-7 py-2 ${pathname.startsWith("/music/adminpanel") ? "hidden" : "block"}`}
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Header;
