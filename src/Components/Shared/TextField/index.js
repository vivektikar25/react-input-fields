
import React from "react";

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data || {};
    this.state.isFormSubmitted = props.isFormSubmitted || false;
    this.state.isTextFieldDirty = props.isTextFieldDirty || false;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    this.validateTextField(
      this.state.value,
      this.state.validations,
      this.state.isFormSubmitted
    );
  };

  componentWillReceiveProps(nextProps) {
    const isValueChanged = this.state.value != nextProps.data.value;
    if (nextProps.isTextFieldDirty !== undefined) {
      this.setState({
        ...nextProps.data,
        isFormSubmitted: nextProps.isFormSubmitted,
        isTextFieldDirty: nextProps.isTextFieldDirty
      });
    } else {
      this.setState({
        ...nextProps.data,
        isFormSubmitted: nextProps.isFormSubmitted
      });
    }

    if (nextProps.isFormSubmitted || isValueChanged) {
      this.validateTextField(
        nextProps.data.value,
        this.state.validations,
        nextProps.isFormSubmitted
      );
    }
  }
  shouldComponentUpdate(nextProps) {
    const isValueChanged =
      this.state.value != nextProps.data.value ||
      this.state.disabled != nextProps.data.disabled;
    const isFormSubmittedChanged =
      nextProps.isFormSubmitted !== this.state.isFormSubmitted;
    return isFormSubmittedChanged || isValueChanged;
  }

  componentWillUnmount() {
    if (this.props.removeFormsStatusFlag) {
      this.props.removeFormsStatusFlag(this.state.name);
    }
  }

  handleChange({ target }) {
    let value = target.value; // This is required as target.value gets reset
    //during setState() and target.value sent to recordSelection on following line is ""(empty)

    this.setState({ isTextFieldDirty: true }, () => {
      this.props.recordSelection(value);
    });
  }

  validateTextField = (inputValue, validations, isFormSubmitted) => {
    if (!this.state.validate) {
      return;
    }
    let priorityWiseValidationList = this.getPriorityWiseValidationList(
      validations
    );
    let failedValidation = this.getFailedValidation(
      inputValue && inputValue.trim && inputValue.trim(),
      priorityWiseValidationList
    );

    if (failedValidation) {
      let shouldErrorMessageBeShown =
        this.state.isTextFieldDirty || isFormSubmitted;
      let validationMessage = failedValidation.message;

      this.displayValidationMessage(
        shouldErrorMessageBeShown,
        validationMessage
      );
      this.props.updateFormsStatus(false, this.state.name);
    } else {
      this.props.updateFormsStatus(true, this.state.name);
      this.displayValidationMessage(false, "");
    }
  };

  getPriorityWiseValidationList = validations => {
    let priorityWiseValidationList;
    priorityWiseValidationList = validations.sort(
      (prevElement, nextElement) => {
        return prevElement.priority - nextElement.priority;
      }
    );
    return priorityWiseValidationList;
  };

  displayValidationMessage = (shouldErrorMessageBeShown, validationMessage) => {
    let message = shouldErrorMessageBeShown ? (
      <div style={{ color: "red", fontSize: 11 }}>{validationMessage}</div>
    ) : (
      ""
    );
    this.setState({ validationMessage: message });
  };
  getFailedValidation = (inputValue, validations) => {
    const failedValidation = validations.find(validation => {
      return this.isValidationFailed(inputValue, validation);
    });
    return failedValidation;
  };

  isValidationFailed = (inputValue, validation) => {
    switch (validation.validationName) {
      case "required":
        return this.validateRequiredValidation(inputValue);
        break;
      case "minLength":
        return this.validateMinLengthValidation(inputValue, validation.value);
        break;
      case "maxLength":
        return this.validateMaxLengthValidation(inputValue, validation.value);
        break;
      case "isNumber":
        return this.validateIsNumberValidation(inputValue, validation.value);
        break;
      case "minValue":
        return this.validateMinValueValidation(inputValue, validation.value);
        break;
      case "maxValue":
        return this.validateMaxValueValidation(inputValue, validation.value);
        break;
      case "regex":
        return this.validateRegexValidation(inputValue, validation.value);
        break;
      default:
        return false;
        break;
    }
  };

  validateRequiredValidation = inputValue => {
    return inputValue && inputValue.toString().length ? false : true;
  };

  validateMinLengthValidation = (inputValue, minLength) => {
    return inputValue
      ? inputValue.toString().length >= minLength ? false : true
      : false;
  };

  validateMaxLengthValidation = (inputValue, maxLength) => {
    return inputValue
      ? inputValue.toString().length <= maxLength ? false : true
      : false;
  };

  validateRegexValidation = (inputValue, regex) => {
    return inputValue ? (inputValue.match(regex) ? false : true) : false;
  };

  validateMinValueValidation = (inputValue, minValue) => {
    return inputValue ? (+inputValue >= minValue ? false : true) : false;
  };

  validateMaxValueValidation = (inputValue, maxValue) => {
    return inputValue ? (+inputValue <= maxValue ? false : true) : false;
  };

  validateIsNumberValidation = inputValue => {
    return inputValue ? (typeof inputValue === "number" ? false : true) : false;
  };

  setTextFieldsDirtyFlag = () => {
    this.isTextFieldDirty = true;
  };

  render() {
    let style = {
      margin: 2,
      padding: 2,
      ...this.props.style
    };
    const customStyleClass = this.props.customStyleClass;

    return (
      <div style={{ display: "inline" }}>
        
        {this.state.label ? (
          <label for={this.state.name}>
            {this.state.label}
            {this.state.required ? <span style={{ color: "red" }}>*</span> : ""}
          </label>
        ) : null}
        <input
          className={customStyleClass || "form-control"}
          type={this.state.type}
          onChange={this.handleChange}
          name={this.state.name}
          required={this.state.required}
          placeholder={this.state.placeholder}
          value={this.state.value}
          required={this.state.required}
          disabled={this.state.disabled}
        />
        {this.state.validationMessage}
      </div>
    );
  }
}

export default TextField;