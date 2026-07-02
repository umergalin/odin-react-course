import { Field } from "./Field";

function ExperienceSection({
  info,
  isEditing,
  toggleEditMode,
  handleChange,
  handleDeleteItem,
}) {
  function addResponsibility() {
    handleChange("responsibilities", [
      ...info.responsibilities,
      { id: crypto.randomUUID(), text: "" },
    ]);
  }

  function deleteResponsibility(id) {
    const filteredResponsibilities = info.responsibilities.filter(
      (item) => item.id !== id,
    );
    handleChange("responsibilities", filteredResponsibilities);
  }

  return (
    <section>
      <div className="flex gap-1rem">
        <Field
          labelText="Position"
          placeholder="Position"
          value={info.position}
          isEditing={isEditing}
          setValue={(value) => handleChange("position", value)}
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

      <div className="flex gap-1rem margin-bottom-half-rem">
        <Field
          labelText="Company"
          placeholder="Company"
          value={info.company}
          isEditing={isEditing}
          setValue={(value) => handleChange("company", value)}
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

      {isEditing && (
        <div className="flex flex-nowrap flex-centered-items">
          <p className="list-label max-width">Responsibilities</p>
          <button onClick={addResponsibility} className="flex-nowrap">+ add</button>
        </div>
      )}

      <ul className="flex-column gap-half-rem">
        {info.responsibilities.map(({ id, text }, i) => (
          <li key={id}>
            <Field
              placeholder="Responsibility"
              value={text}
              isEditing={isEditing}
              setValue={(value) => {
                const updatedResponsibilities = info.responsibilities.map(
                  (item, idx) => (idx === i ? { ...item, text: value } : item),
                );
                handleChange("responsibilities", updatedResponsibilities);
              }}
            />
            {isEditing && (
              <button onClick={() => deleteResponsibility(id)}>delete</button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export { ExperienceSection };
