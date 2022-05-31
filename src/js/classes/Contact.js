class Contact {
    constructor(contact) {
        this.lastname = contact.lastname;
        this.firstname = contact.firstname;
        this.company = contact.company;
        this.phone = (contact.phone) ? contact.phone : "";
        this.email = contact.email;
    }
}

export default Contact;