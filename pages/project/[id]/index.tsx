import SideBarProject from "@components/SideBarProject";
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import { account, database } from "src/utility";
import { Models } from "@pankod/refine-appwrite";
import { useEffect, useState } from "react";
import feather from "feather-icons";
import { Nunito } from "@next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import NewWorkspace from "@components/NewWorkspace";
import { AnimatePresence, motion } from "framer-motion";
import { rise } from "animations";
import { Plus } from "react-feather";

const font = Nunito({ subsets: ["latin"], weight: "800" });

const DashBoard: React.FC<{}> = () => {
    const [user, set_user] = useState<Models.Account<{}> | null>(null);
    const [workspaces, set_workspaces] = useState<Array<any>>([]);
    const [loading, set_loading] = useState<boolean>(true);
    const [show_newproject, set_newproject] = useState<boolean>(false);
    const [reload, set_reload] = useState<boolean>(false);
    const router = useRouter();
    const icons: { [key: string]: any } = new Object(feather.icons);

    useEffect(() => {
        if (!router.isReady) return;

        const fetch_user = async () => {
            set_user(await account.get());

            set_workspaces(
                (
                    await database.listDocuments(
                        router.query.id as string,
                        "categories"
                    )
                ).documents
            );
            set_loading(false);
            set_reload(false);
        };

        fetch_user();
    }, [router, reload]);

    const Container = motion(Flex);
    const AnimatedElement = motion(Flex);

    return (
        <Flex paddingBottom={1}>
            <AnimatePresence>
                {show_newproject && (
                    <NewWorkspace
                        container={Container}
                        animatedelement={AnimatedElement}
                        destroy_self={() => {
                            set_newproject(false);
                            set_reload(true);
                        }}
                    />
                )}
            </AnimatePresence>
            <SideBarProject current={"todos"} />
            <Flex
                width={{
                    sm: "calc(100% - 150px)",
                    base: "100%",
                    sidebar_md: "calc(100% - 350px)",
                }}
                direction="column"
                paddingX={{ sm: 14, base: 5 }}
                marginLeft={{ base: 0, sm: "80px", sidebar_md: "350px" }}
                paddingTop={{ base: 28, sm: 40 }}
            >
                <Text
                    fontSize={24}
                    className={font.className}
                    animation={`${rise} 300ms ease-in-out forwards`}
                    opacity={0}
                >
                    Hello, {user?.name}!
                </Text>
                <Flex gap={5} marginTop={4} width="full">
                    <Input
                        width="full"
                        bg="#dde0f2"
                        animation={`${rise} 300ms ease-in-out forwards`}
                        opacity={0}
                        style={{ animationDelay: "50ms" }}
                        padding={6}
                        placeholder="Search for your workspaces..."
                    />
                    <Button
                        width={{ sm: "350px" }}
                        padding={6}
                        bg="#2E3440"
                        color="#D8DEE9"
                        animation={`${rise} 300ms ease-in-out forwards`}
                        opacity={0}
                        style={{ animationDelay: "80ms" }}
                        onClick={() => set_newproject(true)}
                        _hover={{ bg: "#2E3440" }}
                    >
                        <Text display={{ sm: "inherit", base: "none" }}>
                            Create new workspace
                        </Text>
                        <Box display={{ sm: "none", base: "inherit" }}>
                            <Plus />
                        </Box>
                    </Button>
                </Flex>
                {loading ? (
                    <Flex
                        width="full"
                        height="50vh"
                        justifyContent={"center"}
                        alignItems="center"
                    >
                        <Spinner color="#2E3440" />
                    </Flex>
                ) : workspaces.length == 0 ? (
                    <Flex
                        alignItems={"center"}
                        justifyContent="center"
                        width="full"
                        direction="column"
                        height={"50vh"}
                        gap={6}
                    >
                        <Image src="/images/empty.png" width={24} />
                        <Text maxWidth={96} align="center">
                            Your to-dos are going to be more scrambled than an
                            egg on a trampoline if you don&apos;t arrange them
                            in workspaces.
                        </Text>
                    </Flex>
                ) : (
                    <Flex marginTop={8} width="full" height="full">
                        <Flex width="full" wrap="wrap" gap={5}>
                            {workspaces.map((w) => {
                                return (
                                    <Box key={w.$id} maxW="400px" w="full">
                                        <Link
                                            href={`/project/${router.query.id}/workspace/${w.$id}`}
                                        >
                                            <Flex
                                                gap={2}
                                                direction="column"
                                                bg={w.color}
                                                borderRadius={"2xl"}
                                                maxW={"400px"}
                                                width="full"
                                                padding={8}
                                            >
                                                <Box
                                                    bg="rgba(46, 52, 64, 0.2)"
                                                    width="fit-content"
                                                    color="#2E3440"
                                                    padding={3}
                                                    borderRadius="xl"
                                                    dangerouslySetInnerHTML={{
                                                        __html: icons[
                                                            w.icon as string
                                                        ].toSvg(),
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
                                    </Box>
                                );
                            })}
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default DashBoard;
