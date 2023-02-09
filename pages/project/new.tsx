import {
    Box,
    Button,
    Flex,
    Input,
    Text,
    Textarea,
} from "@pankod/refine-chakra-ui";
import { Nunito } from "@next/font/google";
import ColorSelection from "@components/ColorInput";
import { useState } from "react";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const NewProject = () => {
    const [color, set_color] = useState<string>("pink");
    const [name, set_name] = useState<string>("");

    return (
        <Flex
            direction={"column"}
            width={"100vw"}
            height="100vh"
            paddingTop={32}
            paddingX={24}
        >
            <Text className={nunito.className} align="center" fontSize={36}>
                New Project
            </Text>
            <Flex gap={12} width={"full"} height="full" marginTop={10}>
                <Box width={"full"} height={"full"}>
                    <Box>
                        <Text>Project Name</Text>
                        <Input
                            bg="#dde1f3"
                            padding={6}
                            marginTop={2}
                            onChange={(e) => set_name(e.target.value)}
                            placeholder="A unique name for your project..."
                        />
                    </Box>
                    <Box marginTop={5}>
                        <Text>Project Description</Text>
                        <Textarea
                            bg="#dde1f3"
                            paddingX={6}
                            paddingY={4}
                            height={44}
                            resize="none"
                            marginTop={2}
                            placeholder="Project Name"
                        />
                    </Box>
                    <Box marginTop={5}>
                        <Text>Project Color</Text>
                        <ColorSelection value={color} onChange={set_color} />
                    </Box>
                    <Flex gap={5} marginTop={8}>
                        <Button
                            padding={6}
                            width="full"
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                            color="#f38ba8"
                        >
                            Cancel
                        </Button>
                        <Button
                            width="full"
                            padding={6}
                            _hover={{ bg: "#2E3440" }}
                            bg="#2E3440"
                            color="#D8DEE9"
                        >
                            Create
                        </Button>
                    </Flex>
                </Box>
                <Box
                    borderRight={"solid"}
                    borderWidth={1}
                    borderColor="#DCE0F3"
                ></Box>
                <Flex width={"full"} direction="column">
                    <Text>Invite members</Text>
                    <Input
                        bg="#dde1f3"
                        padding={6}
                        marginTop={2}
                        placeholder="Enter member's email address..."
                    />
                    <Flex
                        height={"full"}
                        width="full"
                        alignItems={"center"}
                        justifyContent="center"
                    >
                        <Text>No members yet!</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default NewProject;
