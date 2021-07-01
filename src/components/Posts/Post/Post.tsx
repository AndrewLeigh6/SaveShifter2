import React from "react";
import Snoowrap from "snoowrap";

interface PostProps {
  savedPost: Snoowrap.Submission;
}

const Post = (props: PostProps) => {
  const renderImage = (savedPost: Snoowrap.Submission): JSX.Element | null => {
    if (savedPost.preview) {
      const image = (
        <img
          className="mr-5"
          src={savedPost.preview.images[0].resolutions[0].url}
          alt={savedPost.title}
        />
      );
      return image;
    } else {
      const image = (
        <img
          className="mr-5"
          src="https://via.placeholder.com/108x108"
          alt="placeholder"
        />
      );
      return image;
    }
  };

  return (
    <div className="flex rounded-xl py-6 px-8 mb-4 bg-indigo-700">
      {renderImage(props.savedPost)}
      <div>
        <p>{props.savedPost.title}</p>
        <p className="text-red-500">
          {props.savedPost.subreddit_name_prefixed}
        </p>
      </div>
    </div>
  );
};

export default Post;
