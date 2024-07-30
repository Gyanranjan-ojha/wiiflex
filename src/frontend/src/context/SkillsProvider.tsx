import React, { createContext, useContext, useState, ReactNode } from "react";
import { Skill } from "../lib/utils";

type SkillsContextType = {
  suggestedSkills: Skill[];
};

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error("useSkills must be used within a SkillsProvider");
  }
  return context;
};

export const SkillsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [suggestedSkills] = useState<Skill[]>([
    { skill: "Git" },
    { skill: "Redux.js" },
    { skill: "GraphQL" },
    { skill: "AngularJS" },
    { skill: "React Native" },
    { skill: "Software Development" },
    { skill: "SASS" },
    { skill: "Full-Stack Development" },
    { skill: "HTML" },
    { skill: "Vue.js" },
  ]);

  return (
    <SkillsContext.Provider
      value={{
        suggestedSkills,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
