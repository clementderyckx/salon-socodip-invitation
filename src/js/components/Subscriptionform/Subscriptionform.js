import React from "react";
import './subscriptionForm.css';
import Input from "../form/Input";
import SelectInput from "../form/SelectInput";
import Contact from "../../classes/Contact";
import DownloadInvitationButton from "../DownloadInvitationButton";

class SubscriptionForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            company: '',
            email: '',
            phone: '',
            city: '',
            department: '',
            isPresent: 'false',
        }

        this.handleChange = this.handleChange.bind(this);
        this.postContact = this.postContact.bind(this);
        this.returnSubmit = this.returnSubmit.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    async postContact(contact){
        return fetch('http://localhost:8000/salon/contacts/create/', {method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-type': 'application/json' },
            body: JSON.stringify(contact)})
            .then((res) => res.json() )
            .then(res => {
                console.log('res : ' + res)
                if (res.id){
                    return 200
                } else if (res === 500){
                    return 500
                } else {
                    return 400
                }
            })
            .catch(e => {
                alert(e);
                console.log(e)
            });
    }

    returnSubmit(value, res){
        this.props.submit(value, res);
    }

    submit(event){
        event.preventDefault();
        const contact = new Contact(this.state);
        const result = this.postContact(contact)
            .then(postResult => {
                if(postResult === 200) {
                    this.returnSubmit(true, {
                        contact: contact,
                        response: postResult
                    })
                } else if (postResult === 400){
                    this.returnSubmit(false, {
                        contact: contact,
                        response: postResult
                    })
                } else {
                    this.returnSubmit(false, {
                        contact: contact,
                        response: postResult
                    })
                }
            })
            .catch(e => console.log(e));

        console.log(JSON.stringify(contact))
    }


    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.submit}>

                    <div className="form-group">
                        <Input type="text" label="Prénom :" name="firstname" value={this.state.firstname} handleChange={this.handleChange} />

                        <Input type="text" position="end" label="Nom :" name="lastname" value={this.state.lastname} handleChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <Input type="text" label="Entreprise :" name="company" value={this.state.company} handleChange={this.handleChange} />

                        <Input type="email" position="end" label="Adresse mail :" name="email" value={this.state.email} handleChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <Input type="phone" label="N° de téléphone :" name="phone" value={this.state.phone} handleChange={this.handleChange}/>

                        {/*<TextInput label="Ville :" name="city" value={this.state.company} handleChange={this.handleChange} />*/}

                        <SelectInput position="end" label="department" name="department" value={this.state.department} onChange={this.handleChange}>
                            {["59 - Nord", "62 - Pas-de-Calais", "80 - Sommes", "02 - Aisnes"]}
                        </SelectInput>
                    </div>


                    <div className="form-submit">
                        <input type="submit" value='Envoyer'/>
                    </div>

                </form>
            </div>

        )
    }

}

export default SubscriptionForm;