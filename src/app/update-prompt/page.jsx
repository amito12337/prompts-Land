"use client";

import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "@src/components/Form";
function UpdatePrompt() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data =  await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      };
  useEffect(()=>{
    if(promptId) getPromptDetails()
  },[promptId])
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if(!promptId) alert('Prompt Id not found')
    try {
      const respone = await fetch(`/api/prompt/${promptId}`, {
        method: "PUT",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (respone.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}

export default UpdatePrompt;
