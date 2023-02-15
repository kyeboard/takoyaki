import SideBarProject from "@components/SideBarProject";
import { Box, Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";
import { account, database } from "src/utility";
import { Models } from "@pankod/refine-appwrite";
import { useEffect, useState } from "react";
import feather from "feather-icons";
import { Nunito } from "@next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import NewWorkspace from "@components/NewWorkspace";

const font = Nunito({ subsets: ["latin"], weight: "800" });

const DashBoard = () => {
    const [user, set_user] = useState<Models.Account<{}> | null>(null);
    const router = useRouter();
    const [workspaces, set_workspaces] = useState<Array<any>>([]);
    const [show_newproject, set_newproject] = useState<boolean>(false);

    useEffect(() => {
        const fetch_user = async () => {
            // console.log(router.query)
            set_user(await account.get());

            set_workspaces(
                (
                    await database.listDocuments(
                        // router.query.id as string,
                        "63ec33962d17e2ab9e3a",
                        "categories"
                    )
                ).documents
            );
        };

        fetch_user();
    }, []);

    return (
        <Flex>
            {show_newproject ? <NewWorkspace /> : <></>}
            <SideBarProject current={"todos"} />
            <Flex
                width={"calc(100% - 350px)"}
                direction="column"
                paddingX={14}
                paddingTop={40}
            >
                <Text fontSize={24} className={font.className}>
                    Hello, {user?.name}!
                </Text>
                <Flex gap={5} marginTop={4} width="full">
                    <Input
                        width="full"
                        bg="#dde0f2"
                        padding={6}
                        placeholder="Search for your workspaces..."
                    />
                    <Button
                        width="300px"
                        padding={6}
                        bg="#2E3440"
                        color="#D8DEE9"
                        onClick={() => set_newproject(true)}
                        _hover={{ bg: "#2E3440" }}
                    >
                        Create new workspace
                    </Button>
                </Flex>
                <Flex marginTop={8}>
                    {workspaces.map((w) => {
                        return (
                            <Link
                                key={w.$id}
                                href={`/project/${router.query.id}/workspace/${w.$id}`}
                            >
                                <Flex
                                    gap={2}
                                    direction="column"
                                    bg={w.color}
                                    borderRadius={"2xl"}
                                    width={"400px"}
                                    padding={8}
                                >
                                    <Box
                                        bg="rgba(46, 52, 64, 0.2)"
                                        width="fit-content"
                                        color="#2E3440"
                                        padding={3}
                                        borderRadius="xl"
                                        dangerouslySetInnerHTML={{
                                            __html: feather.icons.github.toSvg(),
                                        }}
                                    />
                                    <Text
                                        marginTop={2}
                                        fontSize={24}
                                        className={font.className}
                                    >
                                        {w.title}
                                    </Text>
                                    <Text color="gray.600">
                                        {w.description}
                                    </Text>
                                </Flex>
                            </Link>
                        );
                    })}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DashBoard;
