"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Profile from "@src/components/Profile";

const MyProfile = ({params}) => {
    const [posts, setPosts] = useState([]);
    const [creator,setCreator] = useState("")
    const {id} = params

    const fetchposts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
      setCreator(data[0])
      console.log(data[0].creator.username)
    };
  useEffect(() => {
     fetchposts();

  }, []);

  return (
    <Profile
      name={creator.creator.username}
      desc={`Welcome to ${creator.creator.username} profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default MyProfile;
