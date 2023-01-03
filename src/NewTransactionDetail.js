import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './index.css';
import { Link } from "react-router-dom";


const NewTransactionDetail = () => {
    const params = useParams()
    const [transaction, setTransaction] = useState([]);
    const [fee, setFee] = useState([])
    const [nVin, setNvin] = useState("");
    const [nVout, setNvout] = useState("");
    const [vins, setVins] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:6600/getTransaction/" + params.txId),
            fetch("http://localhost:6600/getFee/" + params.txId),
        ])
        .then(([reTransaction, reFee]) => Promise.all([reTransaction.json(), reFee.json()])
        )
        .then(([dataTransaction, dataFee]) => {
            setTransaction(dataTransaction);
            setFee(dataFee)
            setNvin(dataTransaction.vin.length);
            setNvout(dataTransaction.vout.length);
            setVins(dataTransaction.vin)
            console.log("AAAAAA " + dataTransaction.vin.toString())

        });
    }, [])

    return(
        <div className="transaction">
            <h4>Transaction: {transaction.txid} {
            }</h4>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Transakcija</th>
                <th scope="col">{transaction.txid}</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">Naknada</th>
                <td>{fee}</td>
                </tr>
                <tr>
                    <th scope="row">Verzija</th>
                    <td>{transaction.version}</td>
                </tr>
                <tr>
                    <th scope="row">Hash</th>
                    <td>{transaction.hash}</td>
                </tr>
                <tr>
                    <th scope="row">Velicina</th>
                    <td>{transaction.size} B</td>
                </tr>
                <tr>
                    <th scope="row">Virtualna velicina</th>
                    <td>{transaction.vsize} vB</td>
                </tr>
                <tr>
                    <th scope="row">Težina</th>
                    <td>{transaction.weight}</td>
                </tr>
                <tr>
                    <th scope="row">Broj izlaza</th>
                    <td>{nVout}</td>
                </tr>
                <tr>
                    <th scope="row">Broj ulaza</th>
                    <td>{nVin}</td>
                </tr>
                <tr>
                    <th scope="row">Ulazne transakcije</th>
                    <td>{vins.map(trans => <Link to={"/transaction/details/" + trans.txid} onClick={() => window.location.reload()}> <p>{trans.txid}</p> </Link>)}</td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}

export default NewTransactionDetail;