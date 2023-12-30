"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Profile from "@src/components/Profile";
import { useRouter, useSearchParams } from "next/navigation";

const MyProfile = ({params}) => {
    const [userPosts, setUserPosts] = useState([]);
    const router = useRouter()
    const {data:session} = useSession()
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");
    const {id} = params
    if(session?.user.id == id) router.push("/profile")
    const fetchposts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };
  useEffect(() => {
     fetchposts();

  }, []);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default MyProfile;
