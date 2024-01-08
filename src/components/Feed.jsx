"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList"

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [prevPosts, setPrevPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", {
      cache: "no-store",
    });
    const data = await response.json();
    setPrevPosts(data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchResults = ()=>{
    // filter posts with search text
    const filteredPosts = prevPosts.filter(
      (post) =>
        post.prompt.includes(searchText) ||
        post.tag.includes(searchText) ||
        post.creator.username.includes(searchText)
    );
    // Update the state with the filtered posts
    filteredPosts ? setPosts(filteredPosts) : setPosts(prevPosts);
  }

  useEffect(()=>{
    if(searchText == "") {
      setPosts(prevPosts)
    }
    handleSearchResults()
  },[searchText])
  return (
    <section className="feed">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={e=> setSearchText(e.target.value) }
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={tag => setSearchText(tag)}
      />
    </section>
  );
};

export default Feed;
