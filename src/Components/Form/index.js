import React from "react";
import * as data from "./data";
import TextField from "./../Shared/TextField";
import * as service from "./service";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      firstFieldData: data.firstFieldData,
      secondFieldData: data.secondFieldData,
      isFormSubmitted: false
    };
    this.formStatus = {};

    this.submit = this.submit.bind(this);
    this.updateFormsStatus = this.updateFormsStatus.bind(this);
    this.updateFormFieldValue = this.updateFormFieldValue.bind(this);
    this.removeFormsStatusFlag = this.removeFormsStatusFlag.bind(this);
  }

  updateFormFieldValue = (fieldName, fieldValue) => {
    this.setState({ [fieldName]: fieldValue });
  };

  updateFormsStatus = (fieldStatus, fieldName) => {
    this.formStatus[fieldName] = fieldStatus;
  };

  removeFormsStatusFlag = formStatusFlag => {
    if (formStatusFlag) delete this.formStatus[formStatusFlag];
  };

  submit = () => {
    let isFormValid = service.getFormsValidityStatus(this.formStatus);

    if (isFormValid) {
      this.setState({ isFormSubmitted: true, errorMessage: "" });
    } else {
      this.setState({ isFormSubmitted: true, errorMessage: "Form is invalid" });
    }
  };

  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <div>
          <TextField
            data={{
              ...this.state.firstFieldData
            }}
            recordSelection={this.updateFormFieldValue}
            updateFormsStatus={this.updateFormsStatus}
            removeFormsStatusFlag={this.removeFormsStatusFlag}
            delay={500}
            isFormSubmitted={this.state.isFormSubmitted}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <TextField
            data={{
              ...this.state.secondFieldData
            }}
            recordSelection={this.updateFormFieldValue}
            updateFormsStatus={this.updateFormsStatus}
            removeFormsStatusFlag={this.removeFormsStatusFlag}
            delay={500}
            isFormSubmitted={this.state.isFormSubmitted}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <span className="form-error-message">{this.state.errorMessage}</span>
        </div>
        <button type="button" onClick={this.submit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Form;
