import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { Box, Card, CardBody, Container, Flex, Heading, Input, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0xF1152B33b3172FF0259AFb894b215D886c188837";

  const {contract} = useContract(contractAddress);

  const {data:totalCoffees, isLoading:loadingTotalCoffees} = useContractRead(contract, "getTotalCoffee");
  const {data:recentCoffee, isLoading: loadingRecentCoffee} = useContractRead(contract, "getAllCoffee");

  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

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
              <Flex direction = {"row"}>
                <Text>
                  Total coffees:
                </Text>
                <Skeleton isLoaded={!loadingTotalCoffees} width={"20px"} ml={"10px"} py={"16px"}>
                  {totalCoffees?.toString()}
                </Skeleton>
              </Flex>
              <Text fontSize={"2xl"} py={"10px"}>Name:</Text>
              <Input placeholder="Your name" value={name} onChange={handleNameChange}/>
                <Text fontSize={"2xl"} mt={"10px"} py={"10px"}>Message:</Text>
                <Input placeholder="Your message" value={message} onChange={handleMessageChange}/>
                <Box mt={"20px"}>
                    {address ? (
                      <Web3Button
                      contractAddress = {contractAddress} 
                      action = {(contract) => {
                        contract.call("buyCoffee", [message, name], {value: ethers.utils.parseEther("0.01")})
                      }}>
                      {"Buy a coffee for 0.01 eth"}</Web3Button>
                    ): (<Text>Please connect wallet</Text>)}
                    
                  
                </Box>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Card maxH={"60vh"} overflow={"scroll"}>
            <CardBody>
              <Text fontWeight={"bold"}>Last coffees:</Text>
              {!loadingRecentCoffee ? (
                <Box>
                  {recentCoffee && recentCoffee.map((coffee:any, index:number) => {
                    return (
                      <Card key={index} my={"10px"}>
                        <CardBody>
                          <Text fontSize={"2xl"}>{coffee[1]}</Text>
                          <Text>From: {coffee[2]}</Text>
                        </CardBody>

                      </Card>
                    )
                  }).reverse() }
                </Box>
              ) : (
                <Stack>
                  <Skeleton height={"100 px"} /> 
                  <Skeleton height={"100 px"} /> 
                  <Skeleton height={"100 px"} /> 
                </Stack>
              )}
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>

  );
};

export default Home;
