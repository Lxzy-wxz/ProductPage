import React, { useEffect } from "react";
import {
  Container,
  VStack,
  Text,
  Heading,
  SimpleGrid,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="100%" p={4} alignItems={"center"}>
      <VStack spacing={8} p={10}>
        <Heading
          as="h1"
          fontSize="50px"
          bgGradient={useColorModeValue(
            "linear(to-r, teal.500, blue.500)",
            "linear(to-r, teal.200, blue.300)"
          )}
          bgClip="text"
          textAlign="center"
        >
          Products
        </Heading>
        {products.length === 0 && (
          <Text
            textAlign="center"
            fontSize="20px"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            No Product Found 😪{" "}
            <Link
              to="/create"
              style={{ color: "teal.500", fontWeight: "bold" }}
            >
              Create a new product
            </Link>
          </Text>
        )}
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing="40px" minw="100%">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default HomePage;
