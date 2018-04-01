export const firstNameData = {
  value: "",
  type: "text",
  name: "firstName",
  label: "First Name copy",
  placeholder: "",
  required: true,
  validate: true,
  disabled: false,
  validations: [
    {
      validationName: "required",
      priority: 1,
      message: "This is required field"
    },
    {
      validationName: "regex",
      value: /^[A-Za-z\d\s]+$/,
      priority: 2,
      message: "Only alphanumeric characters allowed"
    },
    {
      validationName: "minLength",
      value: 5,
      priority: 3,
      message: `Minimum required length is 5 characters`
    },
    {
      validationName: "maxLength",
      value: 50,
      priority: 4,
      message: `Maximum allowed length is 50 characters`
    }
  ]
};

export const lastNameData = {
  value: "",
  type: "text",
  name: "lastName",
  label: "Last Name",
  placeholder: "",
  required: true,
  validate: true,
  validations: [
    {
      validationName: "required",
      priority: 1,
      message: "This is required field"
    },
    {
      validationName: "regex",
      value: /^[A-Za-z\d\s]+$/,
      priority: 2,
      message: "Only alphanumeric characters allowed"
    },
    {
      validationName: "minLength",
      value: 3,
      priority: 3,
      message: `Minimum required length is 3 characters`
    },
    {
      validationName: "maxLength",
      value: 50,
      priority: 4,
      message: `Maximum allowed length is 50 characters`
    }
  ]
};