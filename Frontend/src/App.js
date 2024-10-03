import React, { useState, useEffect } from 'react';

import { Aptos } from '@aptos-labs/ts-sdk';
import './App.css'
const aa = new Aptos();
const ModuleAddress = "0x957b1b97afbd41f9ea44d559c4787dff0b7e816bd3c856df897f349a937fc9d5";

const ContractInteraction = () => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [voterName, setVoterName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [candidates, setCandidates] = useState('');

  
  const connectWallet = async () => {
    try {
      const { address } = await window.aptos.connect();
      setAccount(address);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  // Register as voter
  const registerAsVoter = async () => {
    if (!isConnected) return;
    
    const payload = {
      type: "entry_function_payload",
      function: `${ModuleAddress}::voting::register_as_voter`,
      type_arguments: [],
      arguments: [voterName], // Argument to be passed (voter's name)
    };
    
    try {
      const txnRequest = await window.aptos.signAndSubmitTransaction(payload);
      //const signedTxn = await window.martian.signTransaction(txnRequest);
      //const transaction = await window.martian.submitTransaction(signedTxn);
      console.log('Transaction success:', txnRequest);
    } catch (error) {
      console.error('Error registering as voter:', error);
    }
  };

  // Register as candidate
  const registerAsCandidate = async () => {
    if (!isConnected) return;

    const payload = {
      type: "entry_function_payload",
      function: `${ModuleAddress}::voting::register_as_candidate`,
      type_arguments: [],
      arguments: [candidateName], // Argument to be passed (candidate's name)
    };

    try {
      const txnRequest = await window.aptos.signAndSubmitTransaction(payload);
      // const signedTxn = await window.martian.signTransaction(txnRequest);
      // const transaction = await window.martian.submitTransaction(signedTxn);
      console.log('Transaction success:', txnRequest);
    } catch (error) {
      console.error('Error registering as candidate:', error);
    }
  };

  // Vote for a candidate
  const voteForCandidate = async () => {
    if (!isConnected) return;

    const payload = {
      type: "entry_function_payload",
      function: `${ModuleAddress}::voting::vote`,
      type_arguments: [],
      arguments: [candidateId], // Argument: Candidate ID
    };

    try {
      const txnRequest = await window.aptos.signAndSubmitTransaction(payload);
      // const signedTxn = await window.martian.signTransaction(txnRequest);
      // const transaction = await window.martian.submitTransaction(signedTxn);
      console.log('Transaction success:', txnRequest);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const resource = await aa.getAccountResources({
        accountAddress:`${ModuleAddress}`,
        resourceType:`${ModuleAddress}::voting::VotingData`
    }
      );
      console.log('Fetched Reports:', resource);
      setCandidates(resource[1].data.candidates);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  };
  useEffect(() => {
    if (account) {
      fetchCandidates(); // Fetch candidates once the account is loaded
    }
  }, [account]);

  return (
    <div>
      <h1>Voting DApp</h1>

      {isConnected ? (
        <div>
          <p>Connected as: {account}</p>

          {/* Register as Voter */}
          <div>
            <h2>Register as Voter</h2>
            <input 
              type="text" 
              value={voterName} 
              onChange={(e) => setVoterName(e.target.value)} 
              placeholder="Enter your name" 
            />
            <button onClick={registerAsVoter}>Register</button>
          </div>

          {/* Register as Candidate */}
          <div>
            <h2>Register as Candidate</h2>
            <input 
              type="text" 
              value={candidateName} 
              onChange={(e) => setCandidateName(e.target.value)} 
              placeholder="Enter candidate name" 
            />
            <button onClick={registerAsCandidate}>Register as Candidate</button>
          </div>

          {/* Vote for a Candidate */}
          <div>
            <h2>Vote for a Candidate</h2>
            <input 
              type="number" 
              value={candidateId} 
              onChange={(e) => setCandidateId(e.target.value)} 
              placeholder="Enter candidate ID" 
            />
            <button onClick={voteForCandidate}>Vote</button>
          </div>
          {/* View List Of Candidates */}
          <div>
            <h2>Candidate List</h2>
            {candidates ? (
              <ul>
                {candidates.map((candidate, index) => (
                  <li key={index}>
                    <p>Name: {candidate.name}</p>
                    <p>Wallet Address: {candidate.wallet}</p>
                    <p>Votes: {candidate.count}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No candidates registered yet.</p>
            )}
          </div>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ContractInteraction;
