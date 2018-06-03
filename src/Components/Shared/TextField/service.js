const getPriorityWiseValidationList = validations => {
  let priorityWiseValidationList;
  priorityWiseValidationList = validations.sort((prevElement, nextElement) => {
    return prevElement.priority - nextElement.priority;
  });
  return priorityWiseValidationList;
};

const validateRequiredValidation = value => {
  return value && value.toString().length ? false : true;
};

const validateMinLengthValidation = (value, minLength) => {
  return value ? (value.toString().length >= minLength ? false : true) : false;
};

const validateMaxLengthValidation = (value, maxLength) => {
  return value ? (value.toString().length <= maxLength ? false : true) : false;
};

const validateRegexValidation = (value, regex) => {
  return value ? (value.match(regex) ? false : true) : false;
};

const validateMinValueValidation = (value, minValue) => {
  return value ? (+value >= minValue ? false : true) : false;
};

const validateMaxValueValidation = (value, maxValue) => {
  return value ? (+value <= maxValue ? false : true) : false;
};

const validateIsNumberValidation = value => {
  return value ? (typeof value === "number" ? false : true) : false;
};

const isValidationFailed = (value, validation) => {
  switch (validation.validationName) {
    case "required":
      return validateRequiredValidation(value);
      break;
    case "minLength":
      return validateMinLengthValidation(value, validation.value);
      break;
    case "maxLength":
      return validateMaxLengthValidation(value, validation.value);
      break;
    case "isNumber":
      return validateIsNumberValidation(value, validation.value);
      break;
    case "minValue":
      return validateMinValueValidation(value, validation.value);
      break;
    case "maxValue":
      return validateMaxValueValidation(value, validation.value);
      break;
    case "regex":
      return validateRegexValidation(value, validation.value);
      break;
    default:
      return false;
      break;
  }
};

const getFailedValidation = (value, validations) => {
  const failedValidation = validations.find(validation => {
    return isValidationFailed(value, validation);
  });
  return failedValidation;
};

export const validateTextField = (
  value,
  validations,
  isFormSubmitted,
  validate,
  name,
  isTextFieldDirty
) => {
  let validationMessage = "";
  let shouldErrorMessageShown = isTextFieldDirty || isFormSubmitted;

  let priorityWiseValidationList = getPriorityWiseValidationList(validations);
  let failedValidation = getFailedValidation(
    value && value.trim && value.trim(),
    priorityWiseValidationList
  );

  if (failedValidation) {
    validationMessage = failedValidation.message;
  } else {
    validationMessage = "";
  }
  return { validationMessage, shouldErrorMessageShown };
};
