import {
  Box,
  Image,
  Text,
  HStack,
  Button,
  useColorModeValue,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Modal,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";
("../store/product");
import { useState } from "react";
const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.800", "gray.50");
  const bgColor = useColorModeValue("white", "gray.700");
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);
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
  };

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );
    if (success) {
      onClose();
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
      onClose();
    }
  };

  return (
    <Box
      boxShadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      bg={bgColor}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box
        p={6}
        color={textColor}
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text fontSize="md" fontWeight="bold" mb={2}>
          {product.name}
        </Text>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          ${product.price}
        </Text>
        <Text fontSize="md" color="gray.500" mb={3} flex="1">
          {product.description}
        </Text>
        <HStack spacing={4} mb={2} mt="auto">
          <Button colorScheme="teal" size="sm" onClick={onOpen}>
            <FaEdit />
          </Button>
          <Button colorScheme="red" size="sm" onClick={handleDelete}>
            <FaTrashAlt />
          </Button>
        </HStack>
        <Box d="flex" alignItems="baseline"></Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Product Description"
                name="description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Product Image"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" size="lg" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button colorScheme="red" size="lg" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
