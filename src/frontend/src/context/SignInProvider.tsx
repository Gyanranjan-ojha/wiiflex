// context/SignInProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";
import { baseUrl, SignIn, signInSchema } from "../lib/utils";
import { useGoTo } from "../lib/utils";

type SignInFormContextType = {
  formData: SignIn & { showPassword: boolean; passwordEyeOpen: boolean };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  loading: boolean;
  // error: string;
};

const SignInFormContext = createContext<SignInFormContextType | undefined>(
  undefined
);

export const useSignInForm = () => {
  const context = useContext(SignInFormContext);
  if (!context) {
    throw new Error("useSignInForm must be used within a SignInFormProvider");
  }
  return context;
};

export const SignInFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const goTo = useGoTo();
  const [formData, setFormData] = useState<
    SignIn & { showPassword: boolean; passwordEyeOpen: boolean }
  >({
    email: "",
    password: "",
    showPassword: false,
    passwordEyeOpen: false,
  });
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
      passwordEyeOpen: !prevData.passwordEyeOpen,
    }));
  };

  return (
    <SignInFormContext.Provider
      value={{
        formData,
        handleChange,
        togglePasswordVisibility,
        loading,
        // error,
      }}
    >
      {children}
    </SignInFormContext.Provider>
  );
};
