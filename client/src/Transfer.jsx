import { useState, useEffect } from "react";
import server from "./server";

import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ address, setBalance, privateKey, setSignature }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const transaction = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    };
  
    // Step 1: Convert the object to a JSON string
    const jsonString = JSON.stringify(transaction);
    // Step 2: Hash the JSON string using Keccak256
    const hashedValue = keccak256(utf8ToBytes(jsonString));
    // Step 3: Hash signature
    const signature = secp256k1.sign(hashedValue, privateKey);
    setSignature(signature);
    console.log('Signature:', signature);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        signature: signature ? signature.toString() : 'N/A', // issue here
        hash: hashedValue,
        amount: parseInt(sendAmount),
        recipient,
      });
      
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
