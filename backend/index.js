
const express = require('express')
const bodyParser = require('body-parser')
const urlencoded = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require('cors')

const Client = require('bitcoin-core');
const { help } = require('bitcoin-core/src/methods');


const app = express();
const port = 6600;
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const userRouter = express.Router();


app.get('/', (req, res) => {
  res.send("Welcome to my API!!!");
})


const client = new Client({ 
  host: 'blockchain.oss.unist.hr', 
  username: 'student', 
  password: 'IhIskjGukNz9bRpWJL0FBNXmlSBd1pS5AtJdG1zfavLaICBuP4VDPEPMu67ql7U3', 
  port: 8332 
});



userRouter.route('/start').get((req, res) => {
  client.getBlockchainInfo().then((err, response) => {
    if(err) {
      res.send(err)
    }
    else {
      return res.json(response)
    }
  })
})

userRouter.route('/blockInfo/:size').get((req, res) => {
  client.getBlockHash(parseInt(req.params.size)).then((response) => {
    client.getBlock(response).then((err, block) => {
        if(err) {
          res.send(err)
        }
        else {
          return res.json(block);
        }
    })
  });
})

userRouter.route('/getBlock/:blockHash').get((req, res) => {
    client.getBlock(req.params.blockHash).then((err, response) => {
      if(err) {
        res.send(err)
      }
      else {
        return res.json(response);
      }
    })
})

userRouter.route('/getTransaction/:txId').get((req, res) => {
  client.getRawTransaction(req.params.txId).then((transaction) => {
    client.decodeRawTransaction(transaction).then((err, decoded) => {
      if(err) {
        res.send(err)
      } else {
        return res.json(decoded)
      }
    })
  })
})

userRouter.route('/getFee/:txId').get(async function (req, res) {
  try {
    const fee = await izracunajFee(req.params.txId);

    return res.json(fee)
  }
  catch(err) {
    res.send(err)
  }
})

async function izracunajFee(txId) {
    var help = await client.getRawTransaction(txId);
    var decoded = await client.decodeRawTransaction(help)
    var vinVouts = [];

    for (let i = 0; i < decoded.vin.length; i++){
      if(decoded.vin[i].coinbase != null) {
        continue
      }
      vinVouts.push(decoded.vin[i].vout);
    }
  
    var vouts = 0;
    if(decoded.vin.length <= 0) {
      var temp = await client.getRawTransaction(decoded.vin[0].txid)
      var decoded2 = await client.decodeRawTransaction(temp)

      for (let i = 0; i < vinVouts.length; i++){
        vouts += decoded2.vout[vinVouts[i]].value;
      }
    }
    
    var voutPocetna = 0;
    for (let i = 0; i < decoded.vout.length; i++){
      voutPocetna += decoded.vout[i].value;
    } 

    if(vouts === 0) {
      return voutPocetna
    }
    else {
      const fee = vouts - voutPocetna
      return fee;
    }
}


app.use("/", userRouter);

app.listen(port, () => {
  console.log("Running on port " + port);
});
