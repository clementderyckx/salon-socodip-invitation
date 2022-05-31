import React from "react";
class DownloadInvitationButton extends React.Component{

    constructor(props) {
        super(props);
        this.filename = (props.filename ) ? props.filename : '';
        this.filedir = 'http://localhost:8000/static/files/';

        this.url =  `${this.filedir}${this.filename}`;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        const link = document.querySelector('a.link');
        link.setAttribute('download', this.filename);
        setTimeout(() => {
            link.click();
        }, 1000)
    }

    render(){
        const url = `${this.url}`;
        return(
            <div>
                <a href={url} className="link" onClick={this.handleClick}>
                    <img src={url} alt="Le qrcode" />
                </a>
            </div>
        )
    }

}

export default DownloadInvitationButton;