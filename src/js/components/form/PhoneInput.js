import React from "react";

class PhoneInput extends React.Component{

    constructor(props) {
        super(props);
        this.label = props.label;
        this.name = props.name;
        this.value = props.firstname;
        this.handleChange = props.handleChange
    }

    render() {
        return (
            <label htmlFor={this.name}>
                {this.label}
                    <input type="phone" name={this.name} id={this.name} value={this.value} onChange={this.handleChange}/>
            </label>
        )}
}

export default PhoneInput;