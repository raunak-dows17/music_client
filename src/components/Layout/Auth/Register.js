"use client";

import { Images } from "@/components/Assets/ProfilePictures";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [picture, setPicture] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleImageSelection = (index) => {
    setPicture(index);
    };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        profilePic: picture,
        username: username,
        email: email,
        password: password,
      };
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/register`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          router.push("/");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error({
          message: err.message,
        });
      });
    console.log(JSON.stringify(data));
  };

  return (
    <main className="h-screen overflow-hidden w-10/12 mx-auto">
      <div className="flex justify-between gap-6 items-center w-full h-full">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center max-w-7xl w-3/4 md:bg-black/30 bg-white/50 p-5 rounded-lg text-black/80 gap-2"
        >
          <h1 className="text-center text-3xl">Welcome to TrackEase</h1>
          <p className="teaxt-center teaxt-sm">
            Access all kinds of songs for free!!!
          </p>
          <label
            htmlFor="avatar"
            className="flex items-center flex-col gap-4 group cursor-pointer relative"
          >
            <div className="flex justify-between items-center gap-10">
              <img
                src={Images[picture]}
                alt={Images[picture]}
                className="w-24"
              />
              <p>Choose a musical avatar</p>
            </div>
            <div className="group-hover:flex hidden ic gap-3 absolute top-24 bg-black/40 p-2 rounded-2xl">
              {Images &&
                Images.slice(1, 6).map((image, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageSelection(index + 1)}
                    className="sm:w-20 w-10 aspect-square cursor-pointer rounded-full flex justify-center items-center overflow-hidden"
                  >
                    <img src={image} alt="index" />
                  </div>
                ))}
            </div>
          </label>
          <label htmlFor="username" className="w-3/4">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="user name"
              className="px-5 py-2 rounded-lg w-full focus:outline-4 focus:outline-none focus:outline-blue-500"
            />
          </label>
          <label htmlFor="email" className="w-3/4">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="user@gmail.com"
              className="px-5 py-2 rounded-lg w-full focus:outline-4 focus:outline-none focus:outline-blue-500"
            />
          </label>
          <label htmlFor="password" className="w-3/4">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="*******"
              className="px-5 py-2 rounded-lg w-full focus:outline-4 focus:outline-none focus:outline-blue-500"
            />
          </label>
          <button className="w-3/4 bg-blue-500 focus:outline-4 focus:outline-blue-600 flex justify-center items-center rounded-lg p-2 text-white">
            Join Us
          </button>
        </form>
        <div className="absolute md:static w-full h-full inset-0 flex justify-center items-center overflow-hidden -z-10">
          <img
            src="https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Register;
