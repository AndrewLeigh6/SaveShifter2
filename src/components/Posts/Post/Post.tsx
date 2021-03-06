import React from "react";
import Snoowrap from "snoowrap";

interface PostProps {
  savedPost: Snoowrap.Submission;
}

const Post = (props: PostProps) => {
  const renderImage = (): JSX.Element | null => {
    let src = "https://via.placeholder.com/108x108";
    let alt = "placeholder";

    if (props.savedPost.preview) {
      src = props.savedPost.preview.images[0].resolutions[0].url;
      alt = props.savedPost.title;
    }

    const image = <img className="mr-5" src={src} alt={alt} />;

    return image;
  };

  const renderPostText = (): JSX.Element => {
    return (
      <div>
        <p>{props.savedPost.title}</p>
        <p className="text-red-500">
          {props.savedPost.subreddit_name_prefixed}
        </p>
      </div>
    );
  };

  return (
    <div className="flex rounded-xl py-6 px-8 mb-4 bg-indigo-700">
      {renderImage()}
      {renderPostText()}
    </div>
  );
};

export default Post;
