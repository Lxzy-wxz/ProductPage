import { useState } from "react";
import {
  Container,
  Button,
  Text,
  Flex,
  HStack,
  useColorMode,
  useColorModeValue,
  VStack,
  Heading,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { set } from "mongoose";
const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  };

  return (
    <Container maxW="container.xl">
      <VStack
        spacing={8}
        align="stretch"
        p={50}
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading as="h1" size="2xl" bgGradient={useColorModeValue(
    "linear(to-r, teal.500, blue.500)",
    "linear(to-r, teal.200, blue.300)"
  )} bgClip="text" textAlign="center"> 
          Create New Product
        </Heading>
        <Flex direction="column" w="100%">
          <Box
            w={"full"}
            mb={4}
            bg={useColorModeValue("gray.100", "gray.700")}
            borderRadius="md"
            p={6}
          >
            <Text mb={4} fontWeight={"bold"} fontSize={"2xl"}>
              Fill in the details below:
            </Text>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Product Description"
                name="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
              <Button colorScheme="teal" size="lg" onClick={handleAddProduct}>
                Submit
              </Button>
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Createpage;
