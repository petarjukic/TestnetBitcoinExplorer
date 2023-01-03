import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const TransactionDetails = ({props}) => {
    const [fee, setFee] = useState([]);

    useEffect(() => {
        fetch("http://localhost:6600/getFee/" + props.txid.toString()).then((response) => response.json())
            .then((result) => {
                console.log(result)
                setFee(result)
            })
    }, [])

    return(
        <div>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Transakcija</th>
                <th scope="col">{props.txid}</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">Naknada</th>
                <td>{fee}</td>
                </tr>
                <tr>
                    <th scope="row">Verzija</th>
                    <td>{props.version}</td>
                </tr>
                <tr>
                    <th scope="row">Hash</th>
                    <td>{props.hash}</td>
                </tr>
                <tr>
                    <th scope="row">Velicina</th>
                    <td>{props.size} B</td>
                </tr>
                <tr>
                    <th scope="row">Virtualna velicina</th>
                    <td>{props.vsize} vB</td>
                </tr>
                <tr>
                    <th scope="row">Težina</th>
                    <td>{props.weight}</td>
                </tr>
                <tr>
                    <th scope="row">Broj ulaza</th>
                    <td>{props.vin.length}</td>
                </tr>
                <tr>
                    <th scope="row">Ulazne transakcije</th>
                    <td>{props.vin.map(trans => <Link to={"/transaction/details/" + trans.txid}> <p>{trans.txid}</p> </Link>)}</td>
                </tr>
                <tr>
                    <th scope="row">Broj izlaza</th>
                    <td>{props.vout.length}</td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}


export default TransactionDetails;