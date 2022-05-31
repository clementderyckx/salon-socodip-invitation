import {Fragment} from "react";

function FormSubtitle({submitted, error}){

    if(error === 2) {
        return <p className="text_error">Une erreur est survenue lors de votre inscription au salon. Merci de bien vouloir resoumettre votre formulaire</p>;
    }else if(submitted === false && error === 1){
        return <p>Pour recevoir à nouveau votre invitation par mail, <a href="#">cliquez sur ce lien</a></p>
    } else{
        return null
    }
}

export default FormSubtitle