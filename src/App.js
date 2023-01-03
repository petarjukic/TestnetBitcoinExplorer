import React, {useEffect, useState} from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BlockDetails from './BlockDetails';
import NewTransactionDetail from "./NewTransactionDetail";
import SearchBlock from './SearchBlock';
import TransactionDetails from "./TransactionDetails";


const App = () => {
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SearchBlock />} />
          <Route path="/block/:blockTag" element={<BlockDetails />} />
          <Route path="/transaction/:txid" element={<TransactionDetails />} />
          <Route path="/transaction/details/:txId" element={<NewTransactionDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
