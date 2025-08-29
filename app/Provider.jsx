"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { userDetailContext } from "../context/UserDetailContext";
import { SelectedChapterIndexContext } from "../context/SelectedChapterIndexContext";

function Provider({ children }) {
  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  useEffect(() => {
    const createUser = async () => {
      if (!isLoaded || !user) return;

      try {
        const result = await axios.post("/api/user", {
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
        });
        setUserDetail(result.data);
      } catch (error) {
        console.error("Failed to create user:", error);
      }
    };

    createUser();
  }, [isLoaded, user]);

  return (
    <userDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChapterIndexContext.Provider value={{selectedChapterIndex, setSelectedChapterIndex}}>
        <div>{children}</div>
      </SelectedChapterIndexContext.Provider>
    </userDetailContext.Provider>
  );
}

export default Provider;
