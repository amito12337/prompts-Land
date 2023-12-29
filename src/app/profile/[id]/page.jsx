"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Profile from "@src/components/Profile";

const MyProfile = ({params}) => {
    const [myPosts, setMyPosts] = useState([]);
    const [craetor,setCreator] = useState("")
    const {id} = params

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    const getCreator = async () => {
        const res = await fetch(`/api/users/${id}`)
        const data = await res.json()
        setCreator(data)
    }

  useEffect(() => {
     fetchPosts();
  }, []);

  return (
    <Profile
      name={craetor.username}
      desc={`Welcome to ${craetor.username} profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
      data={myPosts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default MyProfile;
