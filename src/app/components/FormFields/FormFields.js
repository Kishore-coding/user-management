import React from "react";
import { formFields, stateOptions } from "@/app/data/helpers";
import CustomModal from "../CustomModal/CustomModal";
import "./FormFields.scss";

const FormFields = ({
  show,
  handleModal,
  handleSubmit,
  handleChange,
  formData,
  errorMessage,
}) => {
  const fields = formFields;
  const cities =
    stateOptions?.length > 0
      ? stateOptions?.find((opt) => opt.state === formData?.address?.state)
          ?.city
      : [];

  return (
    <div>
      <CustomModal
        className="input-fields-modal"
        show={show}
        onClose={handleModal}
      >
        <h3>Add user Data</h3>
        <form onSubmit={handleSubmit}>
          {fields?.map((field) => {
            const field_name = field.fieldName;
            if (
              field_name === "name" ||
              field_name === "email" ||
              field_name === "linkedin"
            ) {
              return (
                <div
                  key={field_name}
                  className={`input-field-wrap ${
                    field_name === "name" || field_name === "email"
                      ? "half-width"
                      : ""
                  }`}
                >
                  {errorMessage[field_name] && (
                    <p className="error-msg">{errorMessage[field_name]}</p>
                  )}
                  <input
                    type={field.type}
                    required={field.required}
                    maxLength={field?.maxLength}
                    minLength={field?.minLength}
                    value={formData?.[field_name] || ""}
                    name={field_name}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            } else if (field_name === "gender") {
              return (
                <div key={field_name} className="input-field-wrap">
                  <select
                    name={field_name}
                    value={formData?.[field_name] || ""}
                    onChange={handleChange}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            } else if (field_name === "address") {
              return (
                <div key={field_name} className="input-field-wrap">
                  <fieldset>
                    <legend>Address</legend>
                    {field?.fieldInfo?.map((info, index) =>
                      info.type === "text" ? (
                        <React.Fragment key={info.fieldName + index}>
                          {errorMessage[info.fieldName] && (
                            <p className="error-msg">
                              {errorMessage[info.fieldName]}
                            </p>
                          )}
                          <input
                            type="text"
                            className={`${info.fieldName}`}
                            name={`address.${info.fieldName}`}
                            value={formData?.address?.[info.fieldName] || ""}
                            onChange={handleChange}
                            placeholder={info.placeholder}
                          />
                        </React.Fragment>
                      ) : info.type === "select" &&
                        info.fieldName === "state" ? (
                        <select
                          key={info.fieldName + index}
                          name="address.state"
                          value={formData?.address?.state}
                          onChange={handleChange}
                        >
                          <option value="">Select State</option>
                          {stateOptions.map((opt) => (
                            <option key={opt.state} value={opt.state}>
                              {opt.state}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <select
                          key={info.fieldName + index}
                          name="address.city"
                          value={formData?.address?.city}
                          onChange={handleChange}
                          disabled={!formData?.address?.state}
                        >
                          <option value="">Select City</option>
                          {cities?.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      )
                    )}
                  </fieldset>
                </div>
              );
            }
          })}
          <button className="btn-primary" type="submit">
            Submit
          </button>
        </form>
      </CustomModal>
    </div>
  );
};

export default FormFields;
