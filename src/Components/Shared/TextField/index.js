import React from "react";
import * as service from "./service";
import _ from "lodash";

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data || {};
    this.state.parentValue = props.data.value;
    this.state.isFormSubmitted = props.isFormSubmitted || false;
    this.state.isTextFieldDirty = false;
    this.handleChange = this.handleChange.bind(this);
    this.updateParentFormWithDebouncedFieldValue = _.debounce(
      this.updateParentFormFieldValue,
      this.props.delay || 0
    );
    this.props.recordSelection(props.data.name, props.data.value);
  }

  componentDidMount = () => {
    this.validateTextField();
  };

  componentWillReceiveProps(nextProps) {
    let value;

    let isParentValueChanged = this.state.parentValue !== nextProps.data.value;
    let isFormSubmittedChanged =
      this.state.isFormSubmitted !== nextProps.isFormSubmitted;
    let formDisableStatusChanged =
      this.state.disabled !== nextProps.data.disabled;

    const shouldStateUpdate =
      isParentValueChanged ||
      isFormSubmittedChanged ||
      formDisableStatusChanged;

    if (isParentValueChanged) {
      value = nextProps.data.value;
      this.props.recordSelection(this.state.name, value);
    } else {
      value = this.state.value;
    }

    this.setState(
      {
        ...nextProps.data,
        value,
        parentValue: isParentValueChanged ? value : this.state.parentValue,
        isFormSubmitted: nextProps.isFormSubmitted
      },
      () => {
        if (isFormSubmittedChanged || isParentValueChanged) {
          this.validateTextField();
        }
      }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isRerenderRequired =
      this.state.value !== nextState.value ||
      this.state.disabled !== nextProps.data.disabled ||
      this.state.validationMessage !== nextState.validationMessage ||
      this.state.isFormSubmitted !== nextProps.isFormSubmitted;

    return isRerenderRequired;
  }

  componentWillUnmount() {
    if (this.props.removeFormsStatusFlag) {
      this.props.removeFormsStatusFlag(this.state.name);
    }
  }

  validateTextField = () => {
    let {
      value,
      validations,
      isFormSubmitted,
      validate,
      name,
      isTextFieldDirty
    } = this.state;

    if (!validate) {
      return;
    }

    let {
      validationMessage,
      shouldErrorMessageShown
    } = service.validateTextField(
      value,
      validations,
      isFormSubmitted,
      validate,
      name,
      isTextFieldDirty
    );
    if (validationMessage) {
      this.props.updateFormsStatus(false, this.state.name);
    } else {
      this.props.updateFormsStatus(true, this.state.name);
    }
    this.displayValidationMessage(shouldErrorMessageShown, validationMessage);
  };

  handleChange({ target }) {
    let value = target.value;
    this.setState({ isTextFieldDirty: true, value }, () => {
      this.validateTextField();
    });
    this.updateParentFormWithDebouncedFieldValue(this.state.name, value);
  }

  updateParentFormFieldValue = (name, value) => {
    this.props.recordSelection(name, value);
  };

  displayValidationMessage = (shouldErrorMessageBeShown, validationMessage) => {
    let message =
      shouldErrorMessageBeShown && validationMessage ? (
        <div style={{ color: "red", fontSize: 11 }}>{validationMessage}</div>
      ) : null;
    this.setState({ validationMessage: message });
  };

  render() {
    let customStyle = {
      ...this.props.style
    };
    const customStyleClass = this.props.customStyleClass;

    return (
      <div style={{ display: "inline" }}>
        {this.state.label ? (
          <label>
            {this.state.label}
            {this.state.required ? <span style={{ color: "red" }}>*</span> : ""}
          </label>
        ) : null}
        <input
          className={customStyleClass || "form-control"}
          style={customStyle}
          type="text"
          onChange={this.handleChange}
          name={this.state.name}
          required={this.state.required}
          placeholder={this.state.placeholder}
          value={this.state.value}
          disabled={this.state.disabled}
        />
        {this.state.validationMessage}
      </div>
    );
  }
}
