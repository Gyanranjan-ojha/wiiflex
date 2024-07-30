import axios from "axios";
import React, { createContext, useState, useContext, useCallback } from "react";
import { baseUrl } from "../lib/utils";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    companyName: "",
  });

  const [candidateData, setCandidateData] = useState({});

  const fetchCandidateData = useCallback(async (candidateId) => {
    try {
      const response = await axios.get(`${baseUrl}/candidates/get_candidate/`, {
        params: { id: candidateId },
      });
      if (response.status === 200) {
        setCandidateData(response.data);
      }
    } catch (error) {
      console.error("Error fetching candidate data:", error);
    }
  }, []);

  const updateUserDetails = (updates) => {
    setUserInfo((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider
      value={{ userInfo, updateUserDetails, candidateData, fetchCandidateData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserContext);
