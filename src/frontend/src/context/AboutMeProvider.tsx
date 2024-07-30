//AboutYouProvider
import React, { createContext, useContext, useState, ReactNode } from "react";
import { AboutMe } from "../lib/utils";

type AboutYouContextType = {
  aboutMe: AboutMe | null;
  addAboutMe: (aboutMe: AboutMe) => void;
  updateAboutMe: (aboutMe: AboutMe) => void;
  deleteAboutMe: () => void;
};

const AboutMeContext = createContext<AboutYouContextType | undefined>(
  undefined
);

export const useAboutMe = () => {
  const context = useContext(AboutMeContext);
  if (!context) {
    throw new Error("useAboutMe must be used within an AboutMeProvider");
  }
  return context;
};

export const AboutMeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(() => {
    const storedAboutMe = localStorage.getItem("aboutYou");
    return storedAboutMe ? JSON.parse(storedAboutMe) : null;
  });

  const addAboutMe = (aboutMe: AboutMe) => {
    setAboutMe(aboutMe);
    localStorage.setItem("aboutYou", JSON.stringify(aboutMe));
  };

  const updateAboutMe = (aboutMe: AboutMe) => {
    setAboutMe(aboutMe);
    localStorage.setItem("aboutYou", JSON.stringify(aboutMe));
  };

  const deleteAboutMe = () => {
    setAboutMe(null);
    localStorage.removeItem("aboutYou");
  };

  return (
    <AboutMeContext.Provider
      value={{ aboutMe, addAboutMe, updateAboutMe, deleteAboutMe }}
    >
      {children}
    </AboutMeContext.Provider>
  );
};
