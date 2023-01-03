import React, { useContext, useEffect, useState } from "react";
import { Link, navigate } from "react-router-dom";


const BlockDetails = ({props}) => {
    return(
        <div>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Block</th>
                <th scope="col">{props.height}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Visina</th>
                    <td>{props.height}</td>
                </tr>
                <tr>
                    <th scope="row">Hash</th>
                    <td>{props.hash}</td>
                </tr>
                <tr>
                    <th scope="row">Difficulty</th>
                    <td>{props.difficulty}</td>
                </tr>
                <tr>
                    <th scope="row">Verzija</th>
                    <td>{props.version}</td>
                </tr>
                <tr>
                    <th scope="row">Stripped size</th>
                    <td>{props.strippedsize}</td>
                </tr>
                <tr>
                    <th scope="row">Težina</th>
                    <td>{props.weight}</td>
                </tr>
                <tr>
                    <th scope="row">Nonce</th>
                    <td>{props.nonce}</td>
                </tr>
                <tr>
                    <th scope="row">Broj transakcija</th>
                    <td>{props.nTx}</td>
                </tr>
                <tr>
                    <th scope="row">Potvrda</th>
                    <td>{props.confirmations}</td>
                </tr>
                <tr>
                    <th scope="row">Transakcije</th>
                    <td>{props.tx.map(trans => <Link to={"/transaction/details/" + trans}> <p>{trans}</p> </Link>)}</td>
                </tr>
            </tbody>
            </table>

        </div>
    );
}

export default BlockDetails;