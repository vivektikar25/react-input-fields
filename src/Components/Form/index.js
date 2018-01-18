import React from "react";
import * as data from "./data";
import TextField from "./../Shared/TextField";
import * as service from "./service"
import "./Form.css"

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            firstNameData: data.firstNameData,
            lastNameData: data.lastNameData,
            isFormSubmitted: false
        }
        this.formStatus = {}
        this.submit = this.submit.bind(this);
        this.updateFormsStatus = this.updateFormsStatus.bind(this);
        this.removeFormsStatusFlag = this.removeFormsStatusFlag.bind(this);
    }

    updateFirstName = firstName => {
        this.setState({ firstName })
    }
    updateLastName = lastName => {
        this.setState({ lastName })
    }

    submit = () => {
        let isFormValid = service.getFormsValidityStatus(this.formStatus);

        if (isFormValid) {
            this.setState({ isFormSubmitted: true, errorMessage: "" })
        }
        else {
            this.setState({ isFormSubmitted: true, errorMessage: "Form is invalid" })
        }
    }

    updateFormsStatus = (fieldName, fieldStatus) => {
        this.formStatus[fieldName] = fieldStatus;
    };

    removeFormsStatusFlag = formStatusFlag => {
        if (formStatusFlag) delete this.formStatus[formStatusFlag];
    };

    render() {
        return (
            <div>
                <TextField
                    data={{
                        ...data.firstNameData,
                        value: this.state.firstName
                    }}
                    recordSelection={data => { this.updateFirstName(data) }}
                    updateFormsStatus={(status, fieldName) => { this.updateFormsStatus(fieldName, status) }}
                    isFormSubmitted={this.state.isFormSubmitted} />

                <TextField
                    data={{
                        ...data.lastNameData,
                        value: this.state.lastName
                    }}
                    recordSelection={data => { this.updateLastName(data) }}
                    updateFormsStatus={(status, fieldName) => { this.updateFormsStatus(fieldName, status) }}
                    isFormSubmitted={this.state.isFormSubmitted} />
                <button type="button" onClick={this.submit}>Submit</button>
                <span className="form-error-message">{this.state.errorMessage}</span>
            </div>
        );
    }
}

export default Form;