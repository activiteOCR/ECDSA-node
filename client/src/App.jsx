import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        privateKey={privateKey}
        signature={signature}
        setPrivateKey={setPrivateKey}
        setSignature={setSignature}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey} setSignature={setSignature} />
    </div>
  );
}

export default App;
