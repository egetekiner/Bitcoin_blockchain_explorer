// External Libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";

// UI Components
import {
  Box,
  Flex,
  Button,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';

import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
import { RiArrowUpSFill } from 'react-icons/ri';

// Custom Components
import Card from 'components/card/Card.js';

export default function TradeVolume(props) {
  const [tradeVolumeData, setTradeVolumeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch Trade Volume data
  useEffect(() => {
    const fetchVolumeData = async () => {
      setIsLoading(true);
      setErrorMsg('');
      
      try {
        const response = await axios.get(`http://localhost:8000/trade_volume`);
        const transformedData = transformTradeVolumeData(response.data);
        setTradeVolumeData(transformedData);
      } catch (error) {
        console.error("An error occurred while fetching Volume data:", error);
        setErrorMsg('An error occurred. Please try again.');
      }
      
      setIsLoading(false);
    };
    fetchVolumeData();
  }, []);

  // Transform raw data into chart-friendly data
  const transformTradeVolumeData = (rawData) => {
    if (rawData && Array.isArray(rawData.values)) {
      return [
        {
          name: 'Trade Volume',
          data: rawData.values.map((item) => ({
            x: new Date(item.x * 1000),
            y: item.y
          }))
        }
      ];
    }
    console.error('Unexpected rawData:', rawData.values);
    return [];
  };

  // Chart options
  const chartOptions = {
    chart: {
      type: 'line',
      height: '100%',
      width: '100%'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Trade Volume (USD)'
      }
    }
  };

  return (
    <Box minH="260px" minW="75%" mt="auto">
      <ReactApexChart
        options={chartOptions}
        series={tradeVolumeData}
        type='area'
        width='100%'
        height='100%'
      />
    </Box>
  );
}
