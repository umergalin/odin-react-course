import { useState } from "react";
import "../styles/App.css";
import { GeneralSection } from "./GeneralSection";
import { BackgroundSection } from "./BackgroundSection";
import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { initialEducation, initialExperience } from "../constants/inititalData";

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Average",
    lastName: "Joe",
    email: "email@mail.com",
    phone: "+1 (XXX) XXX-XXXX",
  });

  const [educationHistory, setEducationHistory] = useState([
    {
      id: crypto.randomUUID(),
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      startYear: 2013,
      endYear: 2017,
    },
  ]);

  const [experienceHistory, setExperienceHistory] = useState([
    {
      id: crypto.randomUUID(),
      position: "Junior Developer",
      company: "WebSolutions LLC",
      startYear: 2017,
      endYear: 2019,
      responsibilities: [
        { id: crypto.randomUUID(), text: "Developed and maintained client websites using modern web technologies"},
        { id: crypto.randomUUID(), text: "Fixed bugs and implemented new features based on client requirements"},
        { id: crypto.randomUUID(), text: "Worked with MySQL databases and RESTful API development"},
      ]
    }
  ]);

  return (
    <>
      <GeneralSection
        personalInfo={personalInfo}
        setPersonalInfo={setPersonalInfo}
      />

      <div className="history-section flex-column gap-6 ">
        <BackgroundSection
          title="Education"
          ItemComponent={EducationSection}
          initialItem={initialEducation}
          backgroundHistory={educationHistory}
          setBackgroundHistory={setEducationHistory}
        ></BackgroundSection>

        <BackgroundSection
          title="Work Experience"
          ItemComponent={ExperienceSection}
          initialItem={initialExperience}
          backgroundHistory={experienceHistory}
          setBackgroundHistory={setExperienceHistory}
        ></BackgroundSection>
      </div>
    </>
  );
}

export default App;
