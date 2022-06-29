import React from "react";
import './form.css'
import SubscriptionForm from "../../components/Subscriptionform/Subscriptionform";
import FormSubtitle from "../../components/form/FormSubtitle";
import {Fragment} from "react";
import DownloadInvitationButton from "../../components/DownloadInvitationButton";
import Utils from "../../Utils";

// Images
import logoSocodip from "./../../../imgs/logo-socodip2021.svg";
import logoGrandeurNature from "./../../../imgs/logo-grandeur-nature.svg";

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            title: "Inscrivez vous à notre salon",
            submitted: false,
            error: 0,
            imgFilename: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(value, res){
        const filename = `${res.contact.company}-${res.contact.lastname}-${res.contact.firstname}.svg`;
        this.setState({submitted: value})
        if(value === true) {
            this.setState({title: "Votre inscription à bien été prise en compte", imgFilename: Utils.clearString(filename), contact: res.contact})
        } else if(res.response === 400){
            this.setState({title: "Le contact est déjà inscrit au salon.", error: 1, imgFilename: Utils.clearString(filename), contact: res.contact})
        }
        else {
            this.setState({error: 2})
        }
        setTimeout(() => console.log(this.state.submitted, this.state.imgFilename, this.state.title), 500)
    }

    subtitle(){
        if(this.state.error === 2) {
            return <p>Une erreur est survenue lors de votre inscription au salon. Merci de bien vouloir resoumettre votre formulaire</p>;
        } else if(this.state.submitted === true && this.state.error === 0){
            return <p>Merci de vous êtes inscrit. Nous vous attendons avec impatience le 23 septembre</p>
        } else{
            return null
        }
    }

    render() {
        return (
            <Fragment>
                <div className="title">
                    <h1>{this.state.title}</h1>
                    <div className="subtitle">
                        <p className="date">Jeudi 15 Septembre 2022 à Gauchy (02)</p>
                        <p className="hours">à partir de 8h15</p>
                    </div>

                    <FormSubtitle submitted={this.state.submitted} error={this.state.error} />
                </div>

                {(this.state.submitted === false && this.state.error != 1) ? <SubscriptionForm submit={this.handleSubmit} isSubmit={this.state.submitted}/> : null}

                {(this.state.submitted === true ) ? (
                    <div className="success_infos">
                        <p className="text_success">Merci de vous êtes inscrit. Nous vous attendons avec impatience le 23 septembre</p>

                        <p>Vous allez recevoir votre invitation par mail. Si vous souhaitez télécharger votre invitation, cliquez sur l'élement ci dessous : </p>

                        <DownloadInvitationButton filename={this.state.imgFilename}/>
                    </div>
                ) : null}

            </Fragment>
        )

    }


}

export default Form