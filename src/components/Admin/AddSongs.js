"use client";

import React, { useEffect, useState } from "react";

const AddSongs = () => {
  const [placeholderImage, setPlaceholderImage] = useState(null);
  const [music, setMusic] = useState(null);
  const [musicImage, setImage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("music-token");
    console.log(JSON.stringify(formData));
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/musics/admin`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: token,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setMusic(data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };

  console.log(music);

  // Random Images Fetcher
  const imageIndex = Math.floor(Math.random() * placeholderImage?.total+1);
  useEffect(() => {
    const fetchPlaceholder = async () => {
      fetch(
        "https://pixabay.com/api/?key=27671379-ce6e789a4b4600d8507a846bf&q=music+background&orientation=vertical&colors=black&image_type=photo"
      )
        .then((res) => res.json())
        .then((data) => setPlaceholderImage(data))
        .catch((err) => console.log(err));
    };
    fetchPlaceholder();
  }, []);

  console.log(musicImage);

  return (
    <main>
      <div className="w-10/12 mx-auto overflow-hidden my-12">
        <div className="flex w-full justify-center gap-20 items-center">
          <div className="max-w-2xl w-full mx-auto flex justify-center items-center p-5 bg-black/50 rounded-2xl">
            <form
              action=""
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center items-center gap-5"
            >
              <input
                type="text"
                required
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => handleChange(e)}
                className="bg-transparent px-5 py-2 w-full border border-blue-500 rounded-lg focus:outline-8 outline-blue-500"
                placeholder="e.g. Lutt Putt Gaya"
              />
              <input
                type="text"
                required
                id="artist"
                name="artist"
                value={formData.artist}
                onChange={(e) => handleChange(e)}
                className="bg-transparent px-5 py-2 w-full border border-blue-500 rounded-lg focus:outline-8 outline-blue-500"
                placeholder="e.g. Arijit Singh"
              />
              <input
                type="url"
                required
                value={formData.album}
                onChange={(e) => {
                  handleChange(e);
                  setMusic(e.target.value);
                }}
                id="album"
                name="album"
                className="bg-transparent px-5 py-2 w-full border border-blue-500 rounded-lg focus:outline-8 outline-blue-500"
                placeholder="Image URL"
              />
              <input
                type="text"
                required
                value={formData.genre}
                onChange={(e) => handleChange(e)}
                id="genre"
                name="genre"
                className="bg-transparent px-5 py-2 w-full border border-blue-500 rounded-lg focus:outline-8 outline-blue-500"
                placeholder="e.g. Romantic"
              />
              <input
                type="text"
                required
                value={formData.url}
                onChange={(e) => handleChange(e)}
                id="url"
                name="url"
                className="bg-transparent px-5 py-2 w-full border border-blue-500 rounded-lg focus:outline-8 outline-blue-500"
                placeholder="e.g. Lutt-Putt-Gaya.mp3"
              />
              <button className="w-full bg-blue-600 px-7 py-2 rounded-xl">
                Add Song
              </button>
            </form>
          </div>
          <div className="lg:rounded-3xl lg:static absolute inset-0 -z-10 lg:max-w-xs w-full aspect-[9/16] overflow-hidden flex justify-center items-center">
            <img
              src={
                musicImage
                  ? musicImage
                  : placeholderImage?.hits[imageIndex]?.webformatURL
              }
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddSongs;
