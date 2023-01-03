import React, {useState} from "react";
import BlockDetails from "./BlockDetails";
import TransactionDetails from "./TransactionDetails";


const SearchBlock = () => {
    const [blockTag, setBlockTag] = useState("");
    const [blockInfo, setBlockInfo] = useState([]);
    const [transaction, setTransaction] = useState([]);

    function handleBlockTag(e) {
        e.preventDefault();
    }

    function onChangeBlockTag(e) {
        checkInput(e.target.value) 
        setBlockTag(e.target.value);
    }

    async function checkInput(value) {
        if(value.substring(0, 10) == "0000000000") {
            fetch("http://localhost:6600/getBlock/" + value).then((response) => response.json())
            .then((result) => {
                console.log(result)
                setBlockInfo(result)
                setTransaction([])
            })
        }

        else if(value.length == 6) {
            fetch("http://localhost:6600/blockInfo/" + value).then((response) => response.json())
            .then((info) => {
                console.log(info)
                setBlockInfo(info)
                setTransaction([])
            })
        }
        else if(value.length > 7) {
            fetch("http://localhost:6600/getTransaction/" + value).then((response) => response.json())
            .then((result) => {
                console.log(result)
                setTransaction(result)
                setBlockInfo([])
                setBlockTag([])
            })
        }
    }

    return(
        <div className="container">
            <h2>Bitcoin Block Explorer</h2>
            <br/>
            <br />
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form className="card card-sm" onSubmit={(e) => {handleBlockTag(e);}}>
                        <div className="card-body row no-gutters align-items-center">
                            <div className="col-auto">
                                <i className="fas fa-search h4 text-body"></i>
                            </div>
                            <div className="col">
                                <input className="form-control form-control-lg form-control-borderless"
                                type="text" placeholder="Pretraga po visini bloka, hash, transakciji"
                                value={blockTag}
                                onChange={onChangeBlockTag}
                                />
                            </div>
                                <div className="col-auto">
                                    <button className="btn btn-lg btn-success" 
                                    type="submit" >Search</button>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
            <br/>
            <br/>
            <br/>

            {blockInfo.length != 0 ? (
            <BlockDetails props={blockInfo} />
            ): (<></>)}

            {transaction.length != 0 ? (
            <TransactionDetails props={transaction} />
            ): (<></>)}
        </div>
    );
}

export default SearchBlock;