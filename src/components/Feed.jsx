"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [prevPosts,setPrevPosts] = useState([])
  const [searchText, setSearchText] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", {
       cache:"no-store"
    });
    const data = await response.json();
    setPrevPosts(data)
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault()
        // filter posts with search text
    const filteredPosts = prevPosts.filter(
      (post) =>
        post.prompt.includes(searchText) ||
        post.tag.includes(searchText) ||
        post.creator.username.includes(searchText)
    );
    // Update the state with the filtered posts
    filteredPosts ? setPosts(filteredPosts) : setPosts(prevPosts)
  }
  const handleRemove = () => {
      if (searchText === "") {
        setPosts(prevPosts)
      }
  }
  return (
    <section className="feed">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          onKeyUp={handleRemove}
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
