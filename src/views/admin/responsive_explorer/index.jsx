// index.jsx
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AddressModule from "./components/AddressPage";
import BlockModule from "./components/BlockPage";
import TransactionModule from "./components/TransactionsPage";
import MainPage from "./components/MainDashboard";

export default function UserReports() {
  const [inputData, setinputData] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidBlock, setIsValidBlock] = useState(false);
  const [isValidTransaction, setIsValidTransaction] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchBitcoinData = async () => {
    setHasSearched(true);
    let url = "";
    if (/^[0-9]+$/.test(inputData)) {
      setIsValidBlock(true);
      setIsValidAddress(false);
      setIsValidTransaction(false);
      
    } else if (/^[a-fA-F0-9]{64}$/.test(inputData)) {
      setIsValidTransaction(true);
      setIsValidBlock(false);
      setIsValidAddress(false);
      
    } else {
      setIsValidAddress(true);
      setIsValidBlock(false);
      setIsValidTransaction(false);
     
    }
  }


  return (
    <>
      <Box pt={{ base: "150px", md: "80px", xl: "120px" }}>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
          <Input 
            placeholder="Enter Bitcoin Address, Transaction Hash or Block Number" 
            value={inputData} 
            onChange={(e) => setinputData(e.target.value)} 
            bg="white" 
          />
          <Button mt="2" onClick={fetchBitcoinData}>
            Search
          </Button>
        </SimpleGrid>
        
        {isValidAddress && <AddressModule bitcoinAddress={inputData} />}
        {isValidBlock && <BlockModule blockHeight={inputData} />}
        {isValidTransaction && <TransactionModule transactionHash={inputData} />}
        
        {!hasSearched && <MainPage />}
      </Box>
    </>
  );
}
