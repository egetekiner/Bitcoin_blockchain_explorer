import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Select, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";

export default function PoolPieChart({ poolData }) {
  const [localChartData, setLocalChartData] = useState([]);
  const [localChartOptions, setLocalChartOptions] = useState({});
  
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Transforming poolData to fit the chart's expectations
  useEffect(() => {
    if (poolData) {
      const labels = Object.keys(poolData);
      const data = Object.values(poolData);
      setLocalChartData(data);
      setLocalChartOptions({
        labels: labels,
        chart: {
          type: 'pie',
          background: 'white',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      });
    }
  }, [poolData]);

  return (
    <Box pt={{ base: "80px", md: "80px", xl: "80px" }}> 
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <ReactApexChart
          options={localChartOptions}
          series={localChartData}
          type='pie'
          width='600'  // or '50vw'
          height='600'  // or '50vh'
        />
      </SimpleGrid>
    </Box>
  );
}
