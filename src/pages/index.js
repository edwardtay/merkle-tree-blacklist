import React, { useState } from 'react';
import MerkleTree from './MerkleTree';
import niceList from './niceList';
import verifyProof from './verifyProof';
import styles from '../styles/Home.module.css';

const VerifyPage = () => {
  const [inputName, setInputName] = useState('');
  const [nameResult, setNameResult] = useState('');
  const [proofResult, setProofResult] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleVerify = (event) => {
    event.preventDefault();

    // Create the Merkle tree for the whole nice list
    const merkleTree = new MerkleTree(niceList);

    // Find the proof for the name in the list
    const index = niceList.findIndex(n => n === inputName);
    const proof = merkleTree.getProof(index);

    // Verify the proof against the Merkle root
    const verification = verifyProof(proof, inputName, merkleTree.getRoot());

    // Update the state with the results
    setNameResult(inputName);
    setProofResult(JSON.stringify(proof));
    setVerificationResult(verification ? 'Valid proof' : 'Invalid proof');
  };

  return (
    <div className={styles.container}>
      
      <p> List of <a href="https://github.com/edwardtay/merkle-tree-blacklist/blob/main/src/pages/niceList.json">blacklisted addresses by Circle (USDC)</a> as of May 2023
 - <a href="https://etherscan.io/address/0x5db0115f3b72d19cea34dd697cf412ff86dc7e1b?method=Blacklist~0xf9f92be4">Reference</a> <br></br>
 <br></br> Merkle tree constructed. Root: f83bbd9544e36b188a22b72b9653723a8485b1ce6f0138ff5025afbdae1092db </p>
 <h1 className={styles.title}>Verify if address is in Merkle Tree</h1>
 <p>e.g. of blacklisted address 0xb1c8094b234dce6e03f10a5b673c1d8c69739a00 </p>
 <form className={styles.form} onSubmit={handleVerify}>
        <label className={styles.label}>
          Address:
          <input className={styles.input} type="text" value={inputName} onChange={e => setInputName(e.target.value)} />
        </label>
        <button className={styles.button} type="submit">Verify</button>
      </form>
      {nameResult && (
        <div className={styles.result}>
          <p className={styles.resultLabel}>Address:</p>
          <p className={styles.resultValue}>{nameResult}</p>
        </div>
      )}
      {proofResult && (
        <div className={styles.result}>
          <p className={styles.resultLabel}>Proof:</p>
          <p className={styles.resultValue}>{proofResult}</p>
        </div>
      )}
      {verificationResult && (
        <div className={styles.result}>
          <p className={styles.resultLabel}>Verification result:</p>
          <p className={styles.resultValue}>{verificationResult}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
