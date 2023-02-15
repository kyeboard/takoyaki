import SideBar from "@components/SideBar";
import NewProject from "@components/NewProject";
import { Nunito } from "@next/font/google";
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    keyframes,
    Show,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import { useEffect, useState } from "react";
import { account, database, storage, teams } from "src/utility";
import Link from "next/link";
import { Plus } from "react-feather";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });
const nunito_700 = Nunito({ subsets: ["latin"], weight: "700" });

const rise = keyframes`
    0% {
        opacity: 0;
        transform: translateY(55px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const DashBoard = () => {
    const date = new Date();
    const [is_loading, set_is_loading] = useState<boolean>(false);
    const [projects, set_projects] = useState<Array<any>>([]);
    const [show_newproject, set_newproject] = useState<boolean>(false);

    useEffect(() => {
        document.title = "Your projects - planetary";

        const fetch_data = async () => {
            const memberships = [];

            for (const member of (await teams.list()).teams) {
                const info = await database.getDocument(
                    "teams",
                    "teams",
                    member.$id
                );
                const members = (await teams.listMemberships(member.$id))
                    .memberships;

                memberships.push({
                    team: member,
                    data: info,
                    members,
                });
            }

            set_projects(memberships);
            set_is_loading(false);
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
            {show_newproject ? <NewProject /> : <></>}
            <Flex
                direction={"column"}
                width={{
                    sidebar_md: "calc(100vw - 350px)",
                    sm: "calc(100vw - 100px)",
                    base: "calc(100vw)",
                }}
                height="fit-content"
                paddingTop={32}
                paddingLeft={{ sidebar_md: 12, sm: 8, base: 4 }}
                paddingRight={{ sidebar_md: 12, sm: 0, base: 4 }}
                marginLeft={{ sidebar_md: "350px", sm: "80px", base: "0px" }}
            >
                <Text
                    className={nunito.className}
                    fontSize={28}
                    opacity={0}
                    style={{ animationDelay: "140ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    Today, {date.getDate()} {month[date.getMonth()]}
                </Text>
                <Flex
                    width="full"
                    marginTop={3}
                    gap={4}
                    opacity={0}
                    style={{ animationDelay: "140ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    <Input
                        placeholder="Searching for..."
                        bg="#dde0f2"
                        padding={6}
                        opacity={0}
                        style={{ animationDelay: "160ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        _placeholder={{ color: "gray.500" }}
                    />
                    {/* Create new project button */}
                    <Button
                        bg="#2E3440"
                        color="#d2d8f3"
                        padding={6}
                        opacity={0}
                        style={{ animationDelay: "180ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        width={"300px"}
                        display={{ sm: "inherit", base: "none" }}
                        onClick={() => set_newproject(true)}
                        _hover={{ bg: "#2E3440" }}
                    >
                        Create new project
                    </Button>
                    {/* Plus sign on small screens */}
                    <Button
                        bg="#2E3440"
                        color="#d2d8f3"
                        display={{ base: "inherit", sm: "none" }}
                        padding={6}
                        opacity={0}
                        style={{ animationDelay: "180ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        width={"80px"}
                        onClick={() => set_newproject(true)}
                        _hover={{ bg: "#2E3440" }}
                    >
                        <Plus />
                    </Button>
                </Flex>
                <Text
                    marginTop={6}
                    opacity={0}
                    style={{ animationDelay: "200ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    className={nunito_700.className}
                    fontSize={16}
                >
                    Recent Projects
                </Text>
                {projects.length != 0 ? (
                    <Flex
                        marginTop={4}
                        gap={6}
                        wrap="wrap"
                        flex={"1 1 0"}
                        height="fit-content"
                        paddingBottom={8}
                    >
                        {projects.map((p, i) => {
                            return (
                                <Link
                                    href={"/project/" + p.team.$id}
                                    key={p.team.$id}
                                    style={{ height: "auto" }}
                                >
                                    <Flex
                                        direction={"column"}
                                        padding={8}
                                        borderRadius="3xl"
                                        bg={p.data.color}
                                        width="450px"
                                        minWidth={"300px"}
                                        opacity={0}
                                        style={{
                                            animationDelay: `${40 * i}ms`,
                                        }}
                                        height="full"
                                        animation={`${rise} 500ms ease-in-out forwards`}
                                    >
                                        <Flex>
                                            {p.members.map(
                                                (m: any, i: number) => {
                                                    return (
                                                        <Image
                                                            key={m.userName}
                                                            borderColor="#2E3440"
                                                            transform={`translateX(-${
                                                                8 * i
                                                            }px)`}
                                                            borderWidth={2}
                                                            borderStyle="solid"
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
                                                }
                                            )}
                                        </Flex>
                                        <Text
                                            marginTop={5}
                                            className={nunito.className}
                                            fontSize={24}
                                        >
                                            {p.team.name}
                                        </Text>
                                        <Text
                                            color="gray.600"
                                            marginTop={2}
                                            marginBottom={4}
                                        >
                                            {p.data.description}
                                        </Text>
                                        <Text
                                            marginTop={"auto"}
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
                ) : is_loading ? (
                    <Flex
                        alignItems={"center"}
                        width="full"
                        opacity={0}
                        style={{ animationDelay: "250ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        justifyContent={"center"}
                        height="50vh"
                    >
                        <Spinner color="#2E3440" />
                    </Flex>
                ) : (
                    <Flex
                        alignItems={"center"}
                        justifyContent="center"
                        h={"65vh"}
                        direction="column"
                    >
                        <Image
                            src="/images/empty.png"
                            width={{ base: 24, sm: 32 }}
                            height={{ base: 24, sm: 32 }}
                            alt="Empty state"
                        />
                        <Text
                            marginTop={5}
                            maxWidth={96}
                            paddingX={5}
                            align="center"
                        >
                            When you thought you had a project due but it turns
                            out it was just a nightmare.
                        </Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default DashBoard;
