"use client";

import { Images } from "@/components/Assets/ProfilePictures";
import ContentPlaceholder from "@/components/Modules/ContentPlaceholder/ContentPlaceholder";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [userData, setData] = useState(null);
  const [editDetails, setEditDetails] = useState(false);
  const [username, setUsername] = useState(userData?.username);
  const [password, setPassword] = useState(userData?.username);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting(`Good morning`);
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting(`Good afternoon`);
    } else if (currentHour >= 17 && currentHour < 20) {
      setGreeting(`Good evening`);
    } else {
      setGreeting(`Good night`);
    }
  }, []);

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
    };

    fetchUserData();
  }, [profile]);

  console.log(userData);

  return (
    <main>
      <div className="max-w-7xl w-10/12 mx-auto bg-black/20 py-5 px-20 rounded-xl my-10 space-y-4">
        <h1 className="text-2xl lg:text-4xl">Profile!!</h1>
        <p className="text-white/50">Your profile on Trackease!</p>
        <div className="flex items-center gap-5 py-3">
          <div className="flex justify-center items-center rounded-full overflow-hidden w-20">
            {Images[profile] ? (
              <img
                src={Images[profile]}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full w-full object-cover rounded overflow-hidden">
                <ContentPlaceholder />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center w-full gap-2">
              {greeting ? (
                <p>{greeting},</p>
              ) : (
                <div className="h-6 w-32 rounded overflow-hidden">
                  <ContentPlaceholder />
                </div>
              )}
              {" "}
              <div>
                {userData ? (
                  <p>{userData?.username}</p>
                ) : (
                  <div className="h-6 w-32 rounded overflow-hidden">
                    <ContentPlaceholder />
                  </div>
                )}
              </div>
            </div>
            <div>
              {userData ? (
                userData?.isAdmin ? (
                  <p>Admin</p>
                ) : (
                  <p>Listner</p>
                )
              ) : (
                <div className="h-6 w-32 rounded overflow-hidden">
                  <ContentPlaceholder />
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="py-3 space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="lg:text-2xl text-xl">Your Details!!</h2>
            <button
              onClick={() => setEditDetails(!editDetails)}
              className={`bg-blue-600 w-fit rounded-xl py-3 px-7 transition-all duration-300 ease-in-out`}
            >
              {editDetails ? "Save Details" : "Edit Details"}
            </button>
          </div>
          <div className="flex flex-col justify-center">
            {editDetails ? (
              <div></div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <div className="left space-y-2 whitespace-nowrap">
                  <p>Username : </p>
                  <p>Email : </p>
                  <p>Password : </p>
                </div>
                {userData ? (
                  <div className="right space-y-2">
                    <p>{userData?.username}</p>
                    <p>{userData?.email}</p>
                    <p>**********</p>
                  </div>
                ) : (
                  <div className="space-y-2 w-full">
                    <div className="rounded w-1/4 overflow-hidden h-6">
                      <ContentPlaceholder />
                    </div>
                    <div className="rounded w-1/4 overflow-hidden h-6">
                      <ContentPlaceholder />
                    </div>
                    <div className="rounded w-1/4 overflow-hidden h-6">
                      <ContentPlaceholder />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
