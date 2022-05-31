import React from "react";

class SelectInput extends React.Component{

    constructor(props) {
        super(props);
        this.label = props.label;
        this.name = props.name;
        this.value = props.firstname;
        this.handleChange = props.handleChange
        this.options = props.children;
        console.log(props.children)
        this.getOptionsElements()

    }

    getOptionsElements(){
        const elements = [];
        this.options.forEach( option => {
            const value = (option.split('-')[0].includes(' ')) ? option.split('-')[0].replaceAll(' ', '') : option.split('-')[0];
            elements.push(<option value={value} key={value}>{option}</option>)
        } )
        return elements;
    }

    render() {
        const options = this.getOptionsElements();
        return (
            <label htmlFor="department">
                {this.label}
                <select >
                    {options.map(option => option)}
                </select>
            </label>
        )}
}

export default SelectInput;