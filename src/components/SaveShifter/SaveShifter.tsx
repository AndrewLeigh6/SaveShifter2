import React, { useEffect, useState } from "react";
import Snoowrap from "snoowrap";
import Posts from "../Posts/Posts";

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

  return (
    <div className="flex flex-col max-w-md mx-auto">
      <p className="font-title text-2xl font-bold pt-5 pb-5">SaveShifter</p>
      <Posts savedPosts={savedPosts} />
    </div>
  );
};

export default SaveShifter;
