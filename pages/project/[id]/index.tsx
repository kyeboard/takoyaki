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

const font = Nunito({ subsets: ["latin"], weight: "800" });

const DashBoard: React.FC<{}> = () => {
    const [user, set_user] = useState<Models.Account<{}> | null>(null);
    const [workspaces, set_workspaces] = useState<Array<any>>([]);
    const [loading, set_loading] = useState<boolean>(true);
    const [show_newproject, set_newproject] = useState<boolean>(false);
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
        };

        fetch_user();
    }, [router]);

    const Container = motion(Flex);
    const AnimatedElement = motion(Flex);

    return (
        <Flex>
            <AnimatePresence>
                {show_newproject && (
                    <NewWorkspace
                        container={Container}
                        animatedelement={AnimatedElement}
                        destroy_self={() => set_newproject(false)}
                    />
                )}
            </AnimatePresence>
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
                {loading ? (
                    <Flex
                        width="full"
                        height="full"
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
                        height={"full"}
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
                    <Flex marginTop={8} gap={6}>
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
                            );
                        })}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default DashBoard;
