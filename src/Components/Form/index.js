import React from "react";
import * as data from "./data";
import TextField from "./../Shared/TextField"

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            firstNameData: data.firstNameData,
            lastNameData: data.lastNameData,
            isFormSubmitted:false
        }
        this.formStatus = {}
    }

    updateFirstName = firstName => {
        this.setState({firstName})
    }
    updateLastName = lastName => {
        this.setState({lastName})
    }
    render(){
        return (
            <div>
                <TextField
                    data={{
                    ...data.firstNameData,
                    value: this.state.firstName
                    }}
                    recordSelection={data =>{this.updateFirstName(data)}}
                    updateFormsStatus={(status, fieldName) =>
                    {}}
                    isFormSubmitted={this.state.isFormSubmitted}/>

                <TextField
                    data={{
                    ...data.lastNameData,
                    value: this.state.lastName
                    }}
                    recordSelection={data =>{this.updateLastName(data)}}
                    updateFormsStatus={(status, fieldName) =>
                    {}} 
                    isFormSubmitted={this.state.isFormSubmitted}/>
            </div>
        );
    }
}

export default Form;