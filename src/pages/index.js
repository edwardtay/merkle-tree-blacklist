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
      <h1 className={styles.title}>Verify Name in Merkle Tree</h1>
      <p> Merkle root: f83bbd9544e36b188a22b72b9653723a8485b1ce6f0138ff5025afbdae1092db </p>
      <form className={styles.form} onSubmit={handleVerify}>
        <label className={styles.label}>
          Name:
          <input className={styles.input} type="text" value={inputName} onChange={e => setInputName(e.target.value)} />
        </label>
        <button className={styles.button} type="submit">Verify</button>
      </form>
      {nameResult && (
        <div className={styles.result}>
          <p className={styles.resultLabel}>Name:</p>
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
