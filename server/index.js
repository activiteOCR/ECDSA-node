const express = require("express");
const {secp256k1} =require("ethereum-cryptography/secp256k1");
const {toHex, hexToBytes} =require("ethereum-cryptography/utils")
const {keccak256} =require("ethereum-cryptography/keccak")

const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "1ba78a7c37f945c31aa5e11d9edb27ce931d5e33": 100,
  "8646863f9362148049bfa34cfe309a9bc87e9dbe": 50,
  "a4f5e60367e9cb6389dc64de470cf1c08049eff5": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // Get a signature from client-side application
  // Recover the public address from the signature
  
  const { sender, signature: signatureSerialized, hashedValue, recipient, amount } = req.body;

  // Create a new Signature instance from the serialized signature
  const { r, s , recovery } = signatureSerialized;

  const signatureRecovered = new secp256k1.Signature(BigInt(r), BigInt(s), recovery);
  
  const recoverPublicKey = signatureRecovered.recoverPublicKey(hashedValue);
  console.log(recoverPublicKey);
   
  // Compress the public key
  const publicKey = recoverPublicKey.toHex(true);
  
  console.log("public key:" + publicKey);

  const address = toHex(keccak256(hexToBytes(publicKey.slice(2))).slice(-20));
  console.log("address:" + address);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  //Check if the recover address matches the sender's address
  if (address !== sender) {
    res.status(400).send({ message: "Invalid signature!" });
    return;
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
