import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      top={0}
      p={4}
      as="nav"
      maxW="100%"
      px={4}
      position="sticky"
      zIndex={1000}
      bgGradient={useColorModeValue(
        "linear(to-r, #7fd9ffff, #ffffffff)",
        "linear(to-r, #0f2027, #203a43, #2c5364)"
      )}
      boxShadow="md"
    >
      <Flex
        h={10}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Link to="/">
          <Text
            bgGradient={useColorModeValue(
              "linear(to-r, #6a11cb, #2575fc)", // Light mode: Violet to blue
              "linear(to-r, #f7971e, #f4d02dff)" // Dark mode: Orange to yellow
            )}
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Amaze
          </Text>
        </Link>
        <HStack>
          <Link to="/create">
            <Button>
              <CiCirclePlus size={28} />
              Create
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <IoSunnyOutline size={26} />
            ) : (
              <IoIosSunny size={26} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
