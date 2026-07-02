import { Field } from "./Field";

function EducationSection({
  info,
  isEditing,
  toggleEditMode,
  handleChange,
  handleDeleteItem,
}) {

  return (
    <section className="pos-relative flex-column gap-quarter-rem">
      <div className="flex gap-1rem">
        <Field
          labelText="Degree"
          placeholder="Degree"
          value={info.degree}
          isEditing={isEditing}
          setValue={(value) => handleChange("degree", value)}
          className="max-width organization-name"
        />
        <div className="flex gap-quarter-rem flex-align-items-start">
          {isEditing ? (
            <button onClick={toggleEditMode}>save</button>
          ) : (
            <button onClick={toggleEditMode}>edit</button>
          )}
          <button onClick={handleDeleteItem}>delete</button>
        </div>
      </div>

      <div className="flex gap-1rem">
        <Field
          labelText="School"
          placeholder="School"
          value={info.school}
          isEditing={isEditing}
          setValue={(value) => handleChange("school", value)}
        />
        {!isEditing && "•"}
        <div className="flex gap-quarter-rem">
          <Field
            labelText="Start Year"
            placeholder="XXXX"
            value={info.startYear}
            isEditing={isEditing}
            setValue={(value) => handleChange("startYear", value)}
          />
          {!isEditing && "-"}
          <Field
            labelText="End Year"
            placeholder="XXXX"
            value={info.endYear}
            isEditing={isEditing}
            setValue={(value) => handleChange("endYear", value)}
          />
        </div>
      </div>
    </section>
  );
}

export { EducationSection };
