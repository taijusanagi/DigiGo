/* eslint-disable camelcase */
import { Box, Button,Card, CardBody, CardFooter,CardHeader, Flex, Heading,Icon,Image,Stack,  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber, Text ,useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti'
import { MdGroupWork } from 'react-icons/md'
import {
  configureChains,
  createClient,
  defaultChains,
  useAccount, useConnect, useSigner,
  WagmiConfig} from 'wagmi'

import { Layout } from "@/components/Layout";
import { QRCodeScannerModal } from "@/components/QRCodeScannerModal";
import { Unit } from "@/components/Unit";
import { useDigiGoWallet } from "@/hooks/useDigiGoWallet";
import { useErrorToast } from "@/hooks/useErrorToast";
import { sleep} from  "@/lib/utils"

import deploymentsJsonFile from "../../../../account-abstraction/packages/contracts/deployments.json";
import { MockPayment__factory } from "../../../../account-abstraction/packages/contracts/typechain-types/factories/contracts/MockPayment__factory";
import configJsonFile from "../../config.json";

type PaymentPageMode = "scan" | "review" | "confirm" | "walletConnected" ;

const HomePage: NextPage = () => {
  const { connector: activeConnector, isConnected, address } = useAccount()
  const { data: signer} = useSigner()
  const { digiGoWallet } = useDigiGoWallet()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const [mode, setMode] = useState<PaymentPageMode>("scan");
  const [loyaltyPoints, setLoyalty] = useState(12);
    console.log(isConnected,activeConnector)
    const scanModalDisclosure = useDisclosure();
    const [scanedText, setScanedText] = useState("");
    
    const openScanModal = () => {
      scanModalDisclosure.onOpen();
    };


    const [isPaymentLoading, setIsPaymentLoading] = useState(false)
    const { handle } = useErrorToast()
    const confirmPay = async () => {
      console.log("start payment")
      if (!address || !signer || !signer.provider || !digiGoWallet) {
        console.log("address", address)
        console.log("signer", signer)
        console.log("digiGoWallet", digiGoWallet)
        console.log("not defined")
        return;
      }
      try {
        setLoyalty(2)
        // eslint-disable-next-line camelcase
        const mockPayment = MockPayment__factory.connect(deploymentsJsonFile.mockPayment, signer);
        console.log(digiGoWallet.address);
  
        // await signer.sendTransaction({ to: digiGoWallet.address, value: ethers.utils.parseEther("0.5") });
        const data = mockPayment.interface.encodeFunctionData("pay");
        const op = await digiGoWallet.userOpHandler.createSignedUserOp({
          target: mockPayment.address,
          data,
          value: 10000,
          gasLimit: 6100000,
          // maxFeePerGas: 50000000000,
          // maxPriorityFeePerGas: 55000000000
        });
        console.log("user op", op)
        // const tx = digiGoWallet.entryPoint.handleOps([op], "0x29893eEFF38C5D5A1B2F693e2d918e618CCFfdD8");

        // now the tx works, but some times get stack so skip wating
        digiGoWallet.bundlerClient.sendUserOpToBundler(op).then((tx) => {
          console.log("tx", tx);
        });
        // this is for demo
        await sleep(2000)
        console.log("tx needs to wait some time, so no waiting for demo")
        setMode("confirm");
      } catch (e) {
        handle(e);
      } finally {
        setIsPaymentLoading(false);
      }
    }

    useEffect(() => {
      if (!scanedText) {
        return;
      }
      console.log("scanned", scanedText);
      setMode("review");
      
    }, [scanedText]);
    // const { innerWidth: width, innerHeight: height } = window;
  return (
    
    <Box
    pos="relative"
    h="100vh"
  
    _before={{
      content: '""',
      bgColor: (isConnected ? "DADADA":"white"),
      bgImage: (isConnected ? "":"assets/images/BackgroundLogin.png"),
      bgSize: "cover",
      pos: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      
    }}
  >
    <Layout>
    <Heading mt={"10vh"} color="accent">Welcome to DIGIGO</Heading>
{isConnected?
<Card>
{isConnected && <Box borderRadius="10" borderWidth="2px" p={2} mt={2} mb={2} borderColor="white"><Stat > 
  <StatLabel color="white">Available  Rewards</StatLabel>
  <StatNumber color="accent">$ {loyaltyPoints}</StatNumber>
  <StatHelpText color="white">Feb 12 - Dec 4</StatHelpText>
</Stat></Box>}
</Card>:null
}
  <Box className= { (isConnected? 'userConectedButton' : "bottomConnectButton")} >

  <ConnectButton accountStatus={"address"} showBalance={false} chainStatus={"icon"}  />
  </Box>

{mode === "scan" && isConnected && <Box  className="stickyPayBtn"><Icon onClick={openScanModal}as={MdGroupWork} w={20} h={20} color='accent' /></Box>}
        {mode === "review" && (
          <>
          <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />

  <Stack color='white'>
    <CardBody>
      <Heading color='accent' size='md'>The perfect latte</Heading>

      <Text py='2' color='white'>
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
      <Text >Your bill amount is <Heading color='accent' as="h3" size='md' >$100</Heading></Text>
      <StatGroup>
  <Stat>
    <StatLabel>Loyalty Points</StatLabel>
    <StatNumber>$12</StatNumber>
    <StatHelpText>
      <StatArrow type='decrease' />
      12%
    </StatHelpText>
  </Stat>

  <Stat>
    <StatLabel>Hacker Discount</StatLabel>
    <StatNumber>$5</StatNumber>
    <StatHelpText>
      <StatArrow type='decrease' />
      5%
    </StatHelpText>
  </Stat>
</StatGroup>  

    </CardBody>

    <CardFooter>
    <Text> Payable amount is <Heading color='accent' as="h2" size='4xl'>$83</Heading></Text>
    <Button mt={25} variant="solid" onClick={()=>{
      confirmPay();
    }}>Confirm PAY</Button>
    </CardFooter>
  </Stack>
</Card>
          

          
          </>
        )}

         <QRCodeScannerModal
        isOpen={scanModalDisclosure.isOpen}
        onScan={setScanedText}
        onClose={scanModalDisclosure.onClose}
      />
      {mode === "confirm" && (
        <>
      <Heading color="whiteAlpha.400">
      <Confetti
      width={600}
      height={600}
    />
      Thank you for payment. You Recived <Text color='accent' as="h2" size='4xl'>2$</Text> as reward</Heading>
       
        </>)}

   {isConnected && mode === "scan" && <Stack>
      <Flex
  
  p={35}
  w="full"
  alignItems="center"
  justifyContent="center"
>
  <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    w="sm"
    mx="auto"
  >
    <Box
      bg="gray.300"
      h={32}
      w="full"
      rounded="lg"
      shadow="md"
      bgSize="cover"
      bgPos="center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1493857671505-72967e2e2760?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)",
      }}
    ></Box>

    <Box
      w={{
        base: 56,
        md: 64,
      }}
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      mt={-10}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Text
        as="h4"
        py={2}
        textAlign="center"
        fontWeight="bold"
        textTransform="uppercase"
        color="gray.800"
        _dark={{
          color: "white",
        }}
        letterSpacing={1}
      >
        Crazy coffee
      </Text>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        py={2}
        px={3}
        bg="gray.200"
        _dark={{
          bg: "gray.700",
        }}
      >
        <Text
        as="span"
          fontWeight="bold"
          color="gray.800"
          _dark={{
            color: "gray.200",
          }}
        >
          $129
        </Text>
        <Button
          bg="gray.800"
          fontSize="xs"
          fontWeight="bold"
          color="white"
          px={2}
          py={1}
          rounded="lg"
          textTransform="uppercase"
          _hover={{
            bg: "gray.700",
            _dark: {
              bg: "gray.600",
            },
          }}
          _focus={{
            bg: "gray.700",
            _dark: {
              bg: "gray.600",
            },
            outline: "none",
          }}
        >
          See Details
        </Button>
      </Flex>
    </Box>
  </Flex>
</Flex>
<Flex
 
  p={35}
  w="full"
  alignItems="center"
  justifyContent="center"
>
  <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    w="sm"
    mx="auto"
  >
    <Box
      bg="gray.300"
      h={32}
      w="full"
      rounded="lg"
      shadow="md"
      bgSize="cover"
      bgPos="center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)",
      }}
    ></Box>

    <Box
      w={{
        base: 56,
        md: 64,
      }}
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      mt={-10}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Text
        as="h4"
        py={2}
        textAlign="center"
        fontWeight="bold"
        textTransform="uppercase"
        color="gray.800"
        _dark={{
          color: "white",
        }}
        letterSpacing={1}
      >
        Exotic House
      </Text>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        py={2}
        px={3}
        bg="gray.200"
        _dark={{
          bg: "gray.700",
        }}
      >
        <Text
        as="span"
          fontWeight="bold"
          color="gray.800"
          _dark={{
            color: "gray.200",
          }}
        >
          $57
        </Text>
        <Button
          bg="gray.800"
          fontSize="xs"
          fontWeight="bold"
          color="white"
          px={2}
          py={1}
          rounded="lg"
          textTransform="uppercase"
          _hover={{
            bg: "gray.700",
            _dark: {
              bg: "gray.600",
            },
          }}
          _focus={{
            bg: "gray.700",
            _dark: {
              bg: "gray.600",
            },
            outline: "none",
          }}
        >
          See Details
        </Button>
      </Flex>
    </Box>
  </Flex>
</Flex>
<Flex
  
  p={35}
  w="full"
  alignItems="center"
  justifyContent="center"
>
  <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    w="sm"
    mx="auto"
   
    
  >
    <Box
      bg="gray.300"
      h={32}
      w="full"
      rounded="lg"
      shadow="md"
      bgSize="cover"
      bgPos="center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
      }}
    ></Box>

    <Box
      w={{
        base: 56,
        md: 64,
      }}
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      mt={-10}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Text
        as="h4"
        py={2}
        textAlign="center"
        fontWeight="bold"
        textTransform="uppercase"
        color="gray.800"
        _dark={{
          color: "white",
        }}
        letterSpacing={1}
      >
        Third Wave Coffee
      </Text>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        py={2}
        px={3}
        bg="gray.200"
        _dark={{
          bg: "gray.700",
        }}
      >
        <Text
        as="span"
          fontWeight="bold"
          color="gray.800"
          _dark={{
            color: "gray.200",
          }}
        >
          $190
        </Text>
        <Button
          bg="gray.800"
          fontSize="xs"
          fontWeight="bold"
          color="white"
          px={2}
          py={1}
          rounded="lg"
          textTransform="uppercase"
          _hover={{
            bg: "gray.700",
            _dark: {
              bg: "gray.600",
            },
          }}
          _focus={{
            bg: "gray.700",
            _dark: {
              bg: "gray.600",
            },
            outline: "none",
          }}
        >
          See Details
        </Button>
      </Flex>
    </Box>
  </Flex>
</Flex>
      </Stack>}
    </Layout>
    </Box>
 
  );
};

export default HomePage;
