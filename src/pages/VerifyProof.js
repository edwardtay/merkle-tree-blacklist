const { keccak256 } = require('ethereum-cryptography/keccak');
const { hexToBytes, bytesToHex } = require('ethereum-cryptography/utils');

const concat = (left, right) => keccak256(Buffer.concat([left, right]));

function verifyProof(proof, leaf, root) {
  proof = proof.map(({data, left}) => ({ 
    left, data: hexToBytes(data)
  }));
  let data = leaf ? keccak256(Buffer.from(leaf)) : Buffer.alloc(0);


  for (let i = 0; i < proof.length; i++) {
    if (proof[i].left) {
      data = concat(proof[i].data, data);
    } else {
      data = concat(data, proof[i].data);
    }
  }

  return bytesToHex(Buffer.from(data)) === root;

}

module.exports = verifyProof;
