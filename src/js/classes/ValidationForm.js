import Utilities from "./Utilities";
class ValidationForm{

    /**
     * Removes all the validation messages in the DOM from this library (span with class started by validation-message)
     * @param inputs
     */
    static cleanInputsMessages(inputs){
        inputs.forEach(input => {
            if(input.parentElement.querySelector('span[class^="validation-message"]')){
                input.parentElement.querySelector('span[class^="validation-message"]').remove();
            }
        })
    };

    /**
     * Return an HTML Element formatted
     * @param specs {{type, message}}
     * @returns {HTMLSpanElement}
     */
    static createValidationMessage(specs){
        const element = document.createElement('span');
        element.className = `validation-message-${specs.type}`;
        element.innerText = specs.message;
        return element;
    }

    static checkIfEmpty(input) {
        return (input.value.length === 0);
    }

    static noEmptyInput(input, errors){
        if(this.checkIfEmpty(input)){
            const error = Utilities.error(input, 'Merci de spécifier une valeur')
            errors.push(error);
            return false
        } else {
            return true;
        }
    }

    /**
     *
     * @param nbCarachters: {String}
     * @param input: {Element}
     * @returns {Error|boolean}
     */
    static minCharacters(nbCharacters, input){
        const result = (input.value.length < nbCharacters) ? Utilities.error(input, `La valeure spécifiée doit contenir au moins ${nbCharacters} caractères`) : false;
        return result;
    }

    /**
     * Checks if the errors array already contains error in the errors array
     * @param input
     * @param errors
     * @returns {boolean}
     */
    static hasError(input, errors){
        let i = 0;
        errors.forEach(error => { if(error.input === input.name) i++; });
        return (i > 0);
    }

    /**
     * Checks if the specified input contains a value with minimum nbCharacters, otherwise it generates an error in the errors array passed in params
     * @param nbCharacters
     * @param input
     * @param errors
     * @returns {{message, status}}
     */
    static minCharactersInput(nbCharacters, input, errors){
        const minResult = this.minCharacters(nbCharacters, input);
        if(minResult !== false) {
            if(this.hasError(input, errors) === false) errors.push(minResult);
            return Utilities.response(true, `An error message has been generated for input ${input.name}`);
        } else {
            return Utilities.response(false, `${input.name} matches the minimum of ${nbCharacters} characters required`);
        }
    }

    /**
     * Checks if the input is matching email format
     * @param input
     * @returns {boolean}
     */
    static validEmail(input){
        const mailRegex = /^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;
        return mailRegex.test(input.value);
    }

    /**
     * Checks if the specified input contains a valid email value, otherwise it generates an error in the errors array passed in params
     * @param input {Element}
     * @param errors {Array}
     * @returns {{message, status}}
     */
    static validEmailInput(input, errors){
        const isValid = this.validEmail(input);
        if(isValid){
            return Utilities.response(isValid, "The typed email is correct");
        } else {
            if(this.hasError(input, errors) === false) errors.push(Utilities.error(input, "La valeur doit être un email valide"));
            return Utilities.response(isValid, `An error message has been catch for non matching regex ${input.name}`);
        }
    }

}

export default ValidationForm;