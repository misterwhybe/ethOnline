// import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { Box, Card, CardBody, Container, Flex, Heading, Input, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0xF1152B33b3172FF0259AFb894b215D886c188837";

  const {contract} = useContract(contractAddress);

  const {data:totalCoffees, isLoading:loadingTotalCoffees} = useContractRead(contract, "getTotalCoffee");
  const {data:recentCoffee, isLoading: loadingRecentCoffee} = useContractRead(contract, "getAllCoffee");
  return (
    <Container maxW={"1200px"} w={"full"}>
      <Flex justifyContent={"space-between"} alignItems={"center"} py={"20px"} height={"80px"}>
        <Box>
          <Text fontWeight={"bold"}>Buy me a coffee</Text>
        </Box>
        <ConnectWallet/>
      </Flex>
      <SimpleGrid columns ={2} spacing = {10} mt = {"40px"}>
        <Box>
          <Card>
            <CardBody>
              <Heading mb={"20px"} >Buy a coffee  </Heading>
            </CardBody>
          </Card>
        </Box>

      </SimpleGrid>
    </Container>

  );
};

export default Home;
