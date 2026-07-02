import { useState } from "react";
import { Field } from "./Field";

function GeneralSection({ personalInfo, setPersonalInfo }) {
  const [isEditing, setEditing] = useState(false);

  function handleChange(fieldName, value) {
    const newPersonalInfo = { ...personalInfo, [fieldName]: value };
    setPersonalInfo(newPersonalInfo);
  }

  return (
    <section className="general-section">
      <div className={"flex" + ' ' + (isEditing ? "gap-1rem" : "gap-quarter-rem") + ' ' + "margin-bottom-1rem"}>
        <Field
          labelText="First name"
          placeholder="Ivan"
          value={personalInfo.firstName}
          isEditing={isEditing}
          setValue={(value) => handleChange("firstName", value)}
          className="person-name"
        />
        <Field
          labelText="Last Name"
          placeholder="Ivanov"
          value={personalInfo.lastName}
          isEditing={isEditing}
          setValue={(value) => handleChange("lastName", value)}
          className="person-name"
        />
      </div>
      <div className="flex flex-wrap gap-1rem text-small">
        <Field
          labelText="Email"
          placeholder="email@mail.com"
          value={personalInfo.email}
          isEditing={isEditing}
          setValue={(value) => handleChange("email", value)}
        />
        <Field
          labelText="Phone"
          placeholder="+1 (XXX) XXX-XXXX"
          value={personalInfo.phone}
          isEditing={isEditing}
          setValue={(value) => handleChange("phone", value)}
        />
      </div>
      <button onClick={() => setEditing(!isEditing)}>
        {isEditing ? "done" : "edit"}
      </button>
    </section>
  );
}

export { GeneralSection };
