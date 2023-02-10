import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Text,
    Textarea,
} from "@pankod/refine-chakra-ui";
import { Nunito } from "@next/font/google";
import ColorSelection from "@components/ColorInput";
import { useEffect, useState } from "react";
import { Mail, Plus } from "react-feather";
import { storage } from "src/utility";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const NewProject = () => {
    const [color, set_color] = useState<string>("pink");
    const [name, set_name] = useState<string>("");
    const [email, set_email] = useState<string>("");
    const [users, set_users] = useState<Array<string>>([
        "me@kyeboard.me",
        "androiduser@gmail.com",
        "androiduser@gmail.com",
        "androiduser@gmail.com",
    ]);

    const add_user = () => {
        users.push(email);

        set_email("");
    };

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
                            placeholder="A legendary description about your project..."
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
                <Flex width={"full"} direction="column" position={"relative"}>
                    <Text>Invite members</Text>
                    <Flex marginTop={2} gap={5}>
                        <Input
                            bg="#dde1f3"
                            padding={6}
                            borderTopRadius={"5"}
                            borderBottomRadius={"0"}
                            borderBottom={"solid"}
                            borderBottomColor={"gray.400"}
                            value={email}
                            borderBottomWidth={"2px"}
                            onChange={(e) => set_email(e.target.value)}
                            placeholder="Enter member's email address..."
                        />
                        <Button
                            padding={6}
                            _hover={{ bg: "#2E3440" }}
                            bg="#2E3440"
                            color="#D8DEE9"
                            onClick={add_user}
                        >
                            <Plus />
                        </Button>
                    </Flex>
                    <Box height={"full"} width="full">
                        {users.map((email) => {
                            return (
                                <Flex
                                    key={email}
                                    bg="#dde1f3"
                                    marginTop={5}
                                    padding={4}
                                    borderRadius={10}
                                    gap={4}
                                    paddingX={6}
                                >
                                    <Mail />
                                    {email}
                                </Flex>
                            );
                        })}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default NewProject;
