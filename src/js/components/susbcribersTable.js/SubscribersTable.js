import React from "react";

class SubscribersTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
                <thead>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Adresse mail</th>
                    <th>Téléphone</th>
                    <th>Entreprise</th>
                    <th>Ville</th>
                </thead>
                <tbody>
                    <tr>
                        <td>DERYCKX</td>
                        <td>Clément</td>
                        <td>clement.deryckx@outlook.com</td>
                        <td>0610892968</td>
                        <td>C2D</td>
                        <td>Hazebrouck</td>
                    </tr>
                    <tr>
                        <td>DERYCKX</td>
                        <td>Clément</td>
                        <td>clement.deryckx@outlook.com</td>
                        <td></td>
                        <td>C2D</td>
                        <td>Hazebrouck</td>
                    </tr>
                </tbody>
            </table>
        )
    }

}

export default SubscribersTable;