import SideBar from "@components/SideBar";
import NewProject from "@components/NewProject";
import { Nunito } from "@next/font/google";
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Text,
} from "@pankod/refine-chakra-ui";
import { useEffect, useState } from "react";
import { account, database, storage, teams } from "src/utility";
import Link from "next/link";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });
const nunito_700 = Nunito({ subsets: ["latin"], weight: "700" });

const DashBoard = () => {
    const date = new Date();
    const [projects, set_projects] = useState<Array<any>>([]);

    useEffect(() => {
        const fetch_data = async () => {
            const memberships = [];

            for (const member of (await teams.list()).teams) {
                const info = await database.getDocument(
                    "63e5feb8ebc122bb5993",
                    "63e5febc7968e4a1e24d",
                    member.$id
                );
                const members = await (
                    await teams.listMemberships(member.$id)
                ).memberships;

                memberships.push({
                    team: member,
                    data: info,
                    members,
                });
            }

            set_projects(memberships);
        };

        fetch_data();
    }, []);

    // Create an array full of month's name
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <Flex width={"100vw"} height="100vh">
            <SideBar current="dashboard" />
            <Box width={"full"} height="full" paddingTop={32} paddingX={20}>
                <Text className={nunito.className} fontSize={28}>
                    Today, {date.getDate()} {month[date.getMonth()]}
                </Text>
                <Flex marginTop={3} gap={4}>
                    <Input
                        placeholder="Searching for..."
                        bg="#dde0f2"
                        padding={6}
                        _placeholder={{ color: "gray.500" }}
                    />
                    <Button
                        bg="#2E3440"
                        color="#d2d8f3"
                        padding={6}
                        width={"300px"}
                        _hover={{ bg: "#2E3440" }}
                    >
                        Create new project
                    </Button>
                </Flex>
                <Text
                    marginTop={6}
                    className={nunito_700.className}
                    fontSize={16}
                >
                    Recent Projects
                </Text>
                <Flex marginTop={4}>
                    {projects.map((p) => {
                        return (
                            <Link
                                href={"/project/" + p.team.$id}
                                key={p.team.$id}
                            >
                                <Flex
                                    direction={"column"}
                                    padding={8}
                                    borderRadius="3xl"
                                    bg={p.data.color}
                                    width="500px"
                                >
                                    <Flex>
                                        {p.members.map((m: any) => {
                                            return (
                                                <Image
                                                    key={m.userName}
                                                    src={
                                                        storage.getFilePreview(
                                                            "63dfd4b2bf3364da5f0c",
                                                            m.userName
                                                        ).href
                                                    }
                                                    width={10}
                                                    borderRadius="full"
                                                    alt="User profile"
                                                />
                                            );
                                        })}
                                    </Flex>
                                    <Text
                                        marginTop={5}
                                        className={nunito.className}
                                        fontSize={22}
                                    >
                                        {p.team.name}
                                    </Text>
                                    <Text color="gray.600" marginTop={1}>
                                        {p.data.description}
                                    </Text>
                                    <Text
                                        marginTop={4}
                                        className={nunito.className}
                                    >
                                        {p.data.completed + "%"}
                                    </Text>
                                    <Box marginTop={2} position="relative">
                                        <Box
                                            width="full"
                                            height="2"
                                            borderRadius="3xl"
                                            bg="rgba(46, 52, 64, 0.4)"
                                        ></Box>
                                        <Box
                                            position={"absolute"}
                                            top={0}
                                            width={p.data.completed + "%"}
                                            height="2"
                                            borderRadius="3xl"
                                            bg="#2E3440"
                                        ></Box>
                                    </Box>
                                </Flex>
                            </Link>
                        );
                    })}
                </Flex>
            </Box>
        </Flex>
    );
};

export default DashBoard;
