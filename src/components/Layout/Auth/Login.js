"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/login`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              res
                .json()
                .then((data) =>
                  localStorage.setItem("music-token", data?.token)
                );
              router.push("/");
            }
          })
          .catch((err) => console.error(err.message));
      } catch (error) {
        console.error(error.message);
      }
    };
  return (
    <main>
      <div className="w-10/12 mx-auto flex justify-center gap-20 items-center h-screen overflow-hidden">
        <div className="flex flex-1 justify-center items-center flex-col gap-3 p-5 bg-black/50 rounded-2xl w-full">
          <h1 className="lg:text-4xl text-2xl text-center font-semibold">
            Welome Back to TrackEase!
          </h1>
          <p className="text-white/50 text-lg">
            Resume your musical Journey from here!
          </p>
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="flex flex-col lg:w-1/2 w-full gap-3 items-center justify-center"
          >
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              required
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="bg-white/10 rounded-xl p-3 text-lg w-full focus:outline-none focus:outline-blue-300 foucs:outline-8"
            />
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              required
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              className="bg-white/10 rounded-xl p-3 text-lg w-full focus:outline-none focus:outline-blue-300 foucs:outline-8"
            />
            <button
              type="submit"
              className="text-center p-3 w-full bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 ease-in-out rounded-xl"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-lg">
            Don't have an account?{" "}
            <Link
              href={"/auth/signup"}
              className="text-blue-400 transition-all ease-in-out duration-300 hover:shadow-sm hover:underline underline-offset-2"
            >
              Join Us Here
            </Link>
          </p>
        </div>
        <div className="flex xl:static absolute inset-0 -z-10 xl:z-0 flex-1 justify-center items-center overflow-hidden w-full h-full xl:rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Lofin To TrackEase"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}

export default Login
