import React, { useEffect, useState } from "react";
import Snoowrap from "snoowrap";
import { authRequester } from "../../services/snoowrap";
import Posts from "../Posts/Posts";

const SaveShifter = () => {
  const [savedPosts, setSavedPosts] =
    useState<Snoowrap.Listing<Snoowrap.Comment | Snoowrap.Submission> | null>(
      null
    );

  const getSavedPosts = async (
    requester: Snoowrap
  ): Promise<Snoowrap.Listing<Snoowrap.Comment | Snoowrap.Submission>> => {
    const savedPosts = await requester
      .getMe()
      .getSavedContent()
      .then((res) => res.fetchMore({ amount: 50 }));
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
  }, [savedPosts]);

  return (
    <div className="flex flex-col max-w-md mx-auto">
      <p className="font-title text-2xl text-center font-bold pt-5 pb-5">
        SaveShifter
      </p>
      <Posts savedPosts={savedPosts} />
    </div>
  );
};

export default SaveShifter;
