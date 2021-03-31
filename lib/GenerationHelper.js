


/*


  struct Packet {
    address bidderAddress;
    address nftContractAddress;
    address currencyTokenAddress;
    uint256 currencyTokenAmount;
    uint256 expires;
  }
  
  
     bytes32 constant EIP712DOMAIN_TYPEHASH = keccak256(
          "EIP712Domain(string contractName,string version,uint256 chainId,address verifyingContract)"
      );

   function getDomainTypehash() public pure returns (bytes32) {
      return EIP712DOMAIN_TYPEHASH;
   }

   function getEIP712DomainHash(string memory contractName, string memory version, uint256 chainId, address verifyingContract) public pure returns (bytes32) {

      return keccak256(abi.encode(
            EIP712DOMAIN_TYPEHASH,
            keccak256(bytes(contractName)),
            keccak256(bytes(version)),
            chainId,
            verifyingContract
        ));
    }


  bytes32 constant PACKET_TYPEHASH = keccak256(
      "Packet(address bidderAddress,address nftContractAddress,address currencyTokenAddress,uint256 currencyTokenAmount,uint256 expires)"
  );



    function getPacketTypehash()  public pure returns (bytes32) {
      return PACKET_TYPEHASH;
  }
  
  function getPacketHash(address bidderAddress,address nftContractAddress,address currencyTokenAddress, uint256 currencyTokenAmount,uint256 expires) public pure returns (bytes32) {
          return keccak256(abi.encode(
              PACKET_TYPEHASH,
              bidderAddress,
              nftContractAddress,
              currencyTokenAddress,
              currencyTokenAmount,
              expires
          ));
      }

  function getTypedDataHash(address bidderAddress,address nftContractAddress,address currencyTokenAddress, uint256 currencyTokenAmount,uint256 expires) public view returns (bytes32) {


              // Note: we need to use `encodePacked` here instead of `encode`.
              bytes32 digest = keccak256(abi.encodePacked(
                  "\x19\x01",
                  getEIP712DomainHash('BuyTheFloor','1',_chain_id,address(this)),
                  getPacketHash(bidderAddress,nftContractAddress,currencyTokenAddress,currencyTokenAmount,expires)
              ));
              return digest;
          }
  


          


        bytes32 sigHash = getBidTypedDataHash(to,nftContractAddress,currencyToken,currencyAmount,expires);

       address recoveredSignatureSigner = recover(sigHash,buyerSignature);


      //make sure the signer is the depositor of the tokens
       require(from == recoveredSignatureSigner, 'Invalid signature');
       


*/



export default class GenerationHelper {


    static getECRecoveryContract(){
        return `
        

    contract ECRecovery {

        /**
         * @dev Recover signer address from a message by using their signature
         * @param hash bytes32 message, the hash is the signed message. What is recovered is the signer address.
         * @param sig bytes signature, the signature is generated using web3.eth.sign()
         */
        function recover(bytes32 hash, bytes memory sig) internal  pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;
    
        //Check the signature length
        if (sig.length != 65) {
            return (address(0));
        }
    
        // Divide the signature in r, s and v variables
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    
        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }
    
        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            return ecrecover(hash, v, r, s);
        }
        }
    
    }

        
        
        `
    }


}