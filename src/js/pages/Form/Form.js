import React from "react";
import './form.css'
import SubscriptionForm from "../../components/Subscriptionform/Subscriptionform";
import FormSubtitle from "../../components/Form/FormSubtitle";
import Footer from "../../components/Footer/Footer";
import SubmitValidationMessage from "../../components/SubmitValidationMessage/SubmitValidationMessage";
import {Fragment} from "react";
import DownloadInvitationButton from "../../components/DownloadInvitationButton";
import Utils from "../../Utils";

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            title: "Inscrivez vous à notre salon",
            submitted: false,
            error: 0,
            imgFilename: '',
            response: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(value, res){
        const filename = `${res.contact.company}-${res.contact.lastname}-${res.contact.firstname}.svg`;
        this.setState({submitted: value})
        if(value === true && res.response === 200) {
            this.setState({title: "Votre inscription à bien été prise en compte", response: 200 , imgFilename: Utils.clearString(filename), contact: res.contact})
        } else if(res.response === 400){
            this.setState({response: 400, error: 1, imgFilename: Utils.clearString(filename), contact: res.contact})
        }
        else {
            this.setState({error: 2})
        }
        // setTimeout(() => console.log(this.state.submitted, this.state.imgFilename, this.state.title), 500)
    }

    subtitle(){
        if(this.state.error === 2) {
            return <p>Une erreur est survenue lors de votre inscription au salon. Merci de bien vouloir resoumettre le formulaire</p>;
        } else if(this.state.submitted === true && this.state.error === 0){
            return <p>Merci de vous êtes inscrit. Nous vous attendons avec impatience le 23 septembre</p>
        } else{
            return null
        }
    }

    render() {
        const containerClassName = (this.state.submitted === false && this.state.error != 1) ? "content-container form-container" : "content-container";
        return (
            <Fragment>
                <header className="title">
                    <h1>{this.state.title}</h1>
                    <div className="subtitle">
                        <p className="date">Jeudi 15 Septembre 2022 à Gauchy (02)</p>
                        <p className="hours">à partir de 8h30</p>
                    </div>
                </header>

                <div className={containerClassName}>

                    {(this.state.submitted === false && this.state.error != 1) ? <SubscriptionForm submit={this.handleSubmit} isSubmit={this.state.submitted}/> : null}
                    <SubmitValidationMessage submitted={this.state.submitted} error={this.state.error} response={this.state.response} />

                </div>

                <Footer />

            </Fragment>
        )

    }


}

export default Form