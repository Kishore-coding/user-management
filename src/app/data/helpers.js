export const tableHeader = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "LinkedIn URL", value: "url" },
  { label: "Gender", value: "gender" },
  { label: "Address", value: "address" },
  { label: "Actions", value: "actions" },
];

export const formFields = [
  {
    fieldName: "name",
    // required: true,
    // maxLength: 20,
    // minLength: 3,
    type: "text",
    placeholder: "Name",
  },
  {
    fieldName: "email",
    // required: true,
    type: "email",
    placeholder: "Email",
  },
  {
    fieldName: "linkedin",
    // required: true,
    type: "url",
    placeholder: "LinkedIn URL",
  },
  {
    fieldName: "gender",
    required: true,
    type: "select",
    options: [
      { label: "Choose Gender", value: "" },
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Others", value: "others" },
    ],
  },
  {
    fieldName: "address",
    type: "group",
    fieldInfo: [
      {
        fieldName: "line1",
        type: "text",
        required: true,
        placeholder: "Address Line 1",
      },
      { fieldName: "line2", type: "text", placeholder: "Address Line 2" },
      {
        fieldName: "state",
        placeholder: "State",
        type: "select",
      },
      { fieldName: "city", label: "City", type: "select" },
      {
        fieldName: "pin",
        type: "text",
        // required: true,
        placeholder: "PIN",
      },
    ],
  },
];

export const stateOptions = [
  { state: "Tamil Nadu", city: ["coimbatore", "chennai"] },
  { state: "kerla", city: ["Kochi", "Thrissur"] },
];

export const capitalizeFirstLetter = (text) => {
  if (!text) return;
  return text.charAt(0)?.toUpperCase() + text.slice(1);
};
