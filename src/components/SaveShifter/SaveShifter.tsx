import React, { useEffect, useState } from "react";
import Snoowrap from "snoowrap";

const SaveShifter = () => {
  const [savedPosts, setSavedPosts] =
    useState<Snoowrap.Listing<Snoowrap.Comment | Snoowrap.Submission> | null>(
      null
    );

  const buildRequester = (username: string, password: string): Snoowrap => {
    const snoowrap = new Snoowrap({
      userAgent: "",
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      username: username,
      password: password,
    });

    return snoowrap;
  };

  const getSavedPosts = async (
    requester: Snoowrap
  ): Promise<Snoowrap.Listing<Snoowrap.Comment | Snoowrap.Submission>> => {
    const savedPosts = await requester.getMe().getSavedContent();
    return savedPosts;
  };

  useEffect(() => {
    if (!savedPosts) {
      storeSavedPosts();
    }

    async function storeSavedPosts() {
      const requester = authRequester();
      if (requester) {
        const savedPosts = await getSavedPosts(requester);
        console.log("Saved posts", savedPosts);
        setSavedPosts(savedPosts);
      }
    }

    function authRequester(): Snoowrap | null {
      const username = process.env.REACT_APP_FIRST_USERNAME;
      const password = process.env.REACT_APP_FIRST_PASSWORD;

      if (username && password) {
        const snoowrap = buildRequester(username, password);
        console.log("Logged in successfully");
        return snoowrap;
      } else {
        console.log("Unable to login");
        return null;
      }
    }
  }, [savedPosts]);

  const renderSavedPosts = (): (JSX.Element | null)[] | null => {
    if (savedPosts) {
      return savedPosts.map((savedPost) => {
        if (isSubmission(savedPost) && savedPost.over_18 === false) {
          return (
            <div key={savedPost.name}>
              <p>{savedPost.title}</p>
              {renderImage(savedPost)}
            </div>
          );
        }
        return null;
      });
    }

    return null;
  };

  const renderImage = (savedPost: Snoowrap.Submission): JSX.Element | null => {
    if (savedPost.preview) {
      const image = (
        <img
          src={savedPost.preview.images[0].resolutions[0].url}
          alt={savedPost.title}
        />
      );
      return image;
    }
    return null;
  };

  function isSubmission(
    listing: Snoowrap.Comment | Snoowrap.Submission
  ): listing is Snoowrap.Submission {
    return (listing as Snoowrap.Submission).title !== undefined;
  }

  return (
    <div>
      <p>SaveShifter</p>
      <div>{renderSavedPosts()}</div>
    </div>
  );
};

export default SaveShifter;
