import {
    Box,
    Button,
    Fade,
    Flex,
    Image,
    Input,
    Spinner,
    Text,
    Textarea,
} from "@pankod/refine-chakra-ui";
import { Nunito } from "@next/font/google";
import ColorSelection from "@components/ColorInput";
import { useEffect, useState } from "react";
import { Mail, Plus } from "react-feather";
import { database, storage, teams } from "src/utility";
import { useRouter } from "next/router";
import { Permission, Role } from "@pankod/refine-appwrite";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const NewProject = () => {
    const [color, set_color] = useState<string>("pink");
    const [name, set_name] = useState<string>("");
    const [desc, set_desc] = useState<string>("");
    const [status, set_status] = useState<string>(
        "Setting up your workspace..."
    );
    const [show_loader, set_show_loader] = useState<boolean>(false);
    const [email, set_email] = useState<string>("");
    const [users, set_users] = useState<Array<string>>([]);
    const router = useRouter();

    const create_project = async () => {
        set_show_loader(true);

        // Create team
        const team = await teams.create("unique()", "kyeboard's HQ");

        // Create an entry in database for databases
        await database.createDocument(
            "63e5feb8ebc122bb5993",
            "63e5febc7968e4a1e24d",
            team.$id,
            {
                title: name,
                description: desc,
                color,
            },
            [
                Permission.update(Role.team(team.$id)),
                Permission.read(Role.team(team.$id)),
                Permission.delete(Role.team(team.$id)),
            ]
        );

        // Wait for a seconds for the cloud function to complete
        await new Promise((r) => setTimeout(r, 1000));

        // Invite members
        for (const member of users) {
            set_status("Sending an invite link to " + member);

            await teams.createMembership(
                team.$id,
                member,
                [],
                window.location.origin + "/accept_invite"
            );
        }

        set_status("Done!");

        router.push(`/project/${team.$id}`);
    };

    const add_user = () => {
        users.push(email);

        set_email("");
    };

    return (
        <Flex
            zIndex={1}
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
                            onChange={(e) => set_desc(e.target.value)}
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
                            onClick={create_project}
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
                            value={email}
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
            {show_loader ? (
                <Flex
                    position={"absolute"}
                    height="100vh"
                    width="100vw"
                    zIndex={20}
                    bg="rgba(46, 52, 64, 0.6)"
                    backdropFilter="auto"
                    backdropBlur="6px"
                    left="0"
                    direction={"column"}
                    className={nunito.className}
                    fontSize={18}
                    gap={5}
                    color="#D8DEE9"
                    alignItems={"center"}
                    justifyContent="center"
                    top="0"
                >
                    <Spinner color="#D8DEE9" />
                    <Text>{status}</Text>
                </Flex>
            ) : (
                <></>
            )}
        </Flex>
    );
};

export default NewProject;
