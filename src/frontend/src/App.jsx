import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { FormContextProvider } from "./context/FormContextProvider";
import { ScreenTestContextProvider } from "./context/ScreenTestContextProvider";
import ScrollToTop from "./components/ScrollTop";
import { UserProvider } from "./context/UserContextProvider";
import { ProfileFormProvider } from "./context/ProfileFormProvider";
import { EducationFormProvider } from "./context/EducationsProvider";
import { AboutMeProvider } from "./context/AboutMeProvider";
import { SkillsProvider } from "./context/SkillsProvider";
import { PortfolioProvider } from "./context/PortfolioProvider";
import { PersonalInfoFormProvider } from "./context/PersonalInfoProvider";
import { SignInFormProvider } from "./context/SignInProvider";
import { ProfileQuestionsProvider } from "./context/ProfileQuestionsProvider";

function App() {
  return (
    <Router>
      <SignInFormProvider>
        <ProfileQuestionsProvider>
          <PersonalInfoFormProvider>
            <PortfolioProvider>
              <SkillsProvider>
                <AboutMeProvider>
                  <EducationFormProvider>
                    <ProfileFormProvider>
                      <UserProvider>
                        <FormContextProvider>
                          <ScreenTestContextProvider>
                            <ScrollToTop />
                            <Routes />
                          </ScreenTestContextProvider>
                        </FormContextProvider>
                      </UserProvider>
                    </ProfileFormProvider>
                  </EducationFormProvider>
                </AboutMeProvider>
              </SkillsProvider>
            </PortfolioProvider>
          </PersonalInfoFormProvider>
        </ProfileQuestionsProvider>
      </SignInFormProvider>
    </Router>
  );
}

export default App;
