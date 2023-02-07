import {
    Box,
    Button,
    Flex,
    Input,
    Text,
    Textarea,
} from "@pankod/refine-chakra-ui";
import { Nunito } from "@next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const NewProject = () => {
    return (
        <Flex
            width={"100vw"}
            height="100vh"
            position={"fixed"}
            top="0"
            left="0"
            bg={"rgba(30, 41, 54, 0.5)"}
            backdropFilter="auto"
            backdropBlur="6px"
        >
            <Box
                width={"500px"}
                borderLeftRadius="xl"
                height="100vh"
                padding={8}
                marginLeft={"auto"}
                bg="#e6e7f3"
            >
                <Text
                    className={nunito.className}
                    fontSize={26}
                    textAlign="center"
                >
                    New Project
                </Text>
                <Box marginTop={12}>
                    <Text>Name</Text>
                    <Input
                        placeholder="A great name..."
                        marginTop={1}
                        bg="#dce0f3"
                        padding={6}
                    />
                </Box>
                <Box marginTop={4}>
                    <Text>Description</Text>
                    <Textarea
                        placeholder="A legendary description..."
                        bg="#dce0f3"
                        marginTop={1}
                        padding={5}
                        paddingY={4}
                        height={32}
                        resize="none"
                    />
                </Box>
                <Text marginTop={3}>Custom colour</Text>
                <Flex gap={4} marginTop={3}>
                    <Box
                        bg="#f38ba8"
                        width={8}
                        height={8}
                        borderRadius={"full"}
                    />
                    <Box
                        bg="#a6e3a1"
                        width={8}
                        height={8}
                        borderRadius={"full"}
                    />
                    <Box
                        bg="#89dceb"
                        width={8}
                        height={8}
                        borderRadius={"full"}
                    />
                    <Box
                        bg="#fdbca2"
                        width={8}
                        height={8}
                        borderRadius={"full"}
                    />
                    <Box
                        bg="#cba6f7"
                        width={8}
                        height={8}
                        borderRadius={"full"}
                    />
                    <Box
                        bg="#eba0ac"
                        width={8}
                        height={8}
                        borderRadius={"full"}
                    />
                </Flex>
                <Button
                    bg="#3861ef"
                    color={"#D8DEE9"}
                    padding={6}
                    marginTop={8}
                    width={"100%"}
                    _hover={{ bg: "#3861ef" }}
                >
                    Create
                </Button>
            </Box>
        </Flex>
    );
};

export default NewProject;
