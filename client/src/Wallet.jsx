import server from "./server";

import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, signature, setSignature }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
    const signature = secp256k1.sign(messageHash, privateKey);
  
    //console.log(privateKey);

    const publicKey = secp256k1.getPublicKey(privateKey);
    const tempAddr = publicKey.slice(1, 65);
    const hash = keccak256(tempAddr);
    const address = toHex(hash.slice(12, 32));

    setSignature(signature);
    setAddress(address);


    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div>
       <p>r component: {signature.r ? signature.r.toString() : 'N/A'}</p>
       <p>s component: {signature.s ? signature.s.toString() : 'N/A'}</p>
       <p>Recovery bit: {signature.recovery}</p>   
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
