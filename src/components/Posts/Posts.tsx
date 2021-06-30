import React from "react";
import Snoowrap from "snoowrap";
import Post from "./Post/Post";

interface PostsProps {
  savedPosts: Snoowrap.Listing<Snoowrap.Comment | Snoowrap.Submission> | null;
}

const Posts = (props: PostsProps) => {
  function isSubmission(
    listing: Snoowrap.Comment | Snoowrap.Submission
  ): listing is Snoowrap.Submission {
    return (listing as Snoowrap.Submission).title !== undefined;
  }

  let postsList = null;

  if (props.savedPosts) {
    postsList = props.savedPosts.map((savedPost) => {
      if (isSubmission(savedPost) && savedPost.over_18 === false) {
        return <Post savedPost={savedPost} />;
      }
      return null;
    });
  }

  return <div className="flex flex-col">{postsList}</div>;
};

export default Posts;
