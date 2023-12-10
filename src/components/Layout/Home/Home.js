"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("music-token");
    setToken(token);
    token ? router.push("/") : router.push("/auth/signin");
  }, []);

    return (
        <main className="w-full">
            <div>
              
            </div>
        </main>
    );
};

export default Home;
