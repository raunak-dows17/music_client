"use client";

import React, { useEffect, useState } from "react";
import Modal from "../Modules/Modals/Modal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import AdminPlayer from "../Modules/AudioPlayer/AdminPlayer";

const ListSongs = () => {
  const [userData, setData] = useState(null);
  const [musicData, setMusicData] = useState(null);
  const router = useRouter();
  
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
        .catch((err) => console.log(err.message));
      } catch (error) {
        console.log(error.message);
      }
      console.log(token);
    };
    fetchUserData();
  }, []);
  
  
  useEffect(() => {
    const token = localStorage.getItem("music-token");
    const fetchMusicData = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/musics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then((res) => res.json())
          .then((data) => setMusicData(data))
          .catch((error) => console.error(error.message));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMusicData();
  }, []);

  console.log(musicData);

  return (
    <main className="">
      {userData?.isAdmin ? (
        <div className="w-10/12 mx-auto h-full flex flex-col items-center gap-6 my-10">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl lg:text-4xl">Musics</h1>
            <Link
              href={`/music/adminpanel/${userData?.username}/add`}
              className="bg-blue-600 px-7 py-2 rounded-xl"
            >
              + Add Music
            </Link>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="text-center border-b-2">
                <th>S.No.</th>
                <th>Name</th>
                <th>Artist</th>
                <th>Genre</th>
                <th>Music</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="relative inset-y-2">
              {musicData?.length !== 0 ? (
                musicData?.map((music, index) => (
                  <tr key={index} className="text-center border-b-2">
                    <td>
                      <div className="w-10 overflow-hidden rounded-full aspect-square">
                        <img src={music.album} alt={music.album} />
                      </div>
                    </td>
                    <td>{music.title}</td>
                    <td>{music.artist}</td>
                    <td>{music.genre}</td>
                    <td className="flex justify-center items-center py-2">
                      <AdminPlayer src={music.url} />
                    </td>
                    <td>
                      <button className="px-7 py-2 rounded-xl bg-blue-600">
                        <AiFillEdit />
                      </button>
                    </td>
                    <td>
                      <button className="px-7 py-2 rounded-xl bg-red-500">
                        <RiDeleteBinFill />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center text-red-400 w-full absolute">
                  No Music Add Yet!
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <Modal
          title={"Access Denied!"}
          titleColor={"text-red-500"}
          setClose={() => router.back()}
        />
      )}
    </main>
  );
};

export default ListSongs;
