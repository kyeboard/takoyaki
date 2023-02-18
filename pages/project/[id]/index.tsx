import SideBarProject from "@components/SideBarProject";
import { Box, Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";
import { useState } from "react";
import { useRouter } from "next/router";
import NewWorkspace from "@components/NewWorkspace";
import { AnimatePresence, motion } from "framer-motion";
import { rise } from "animations";
import { Menu, Plus } from "react-feather";
import ExtraBold from "@components/ExtraBold";
import Head from "next/head";
import WorkspacesList from "@components/WorkspacesList";

const DashBoard: React.FC<{}> = () => {
    const [show_newproject, set_newproject] = useState<boolean>(false);
    const [filter, set_filter] = useState<string>("");
    const [reload, set_reload] = useState<boolean>(false);
    const router = useRouter();
    const [expand, set_expand] = useState<boolean>(false);

    const Container = motion(Flex);
    const AnimatedElement = motion(Flex);

    return (
        <Flex paddingBottom={1}>
            <Head>
                <title>Your workspaces - planetary</title>
            </Head>
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
            <SideBarProject
                current={"todos"}
                expand={expand}
                destroy_self={() => set_expand(false)}
            />
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
                <Flex
                    alignItems={"center"}
                    gap={5}
                    opacity={0}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    <Box
                        display={{ sm: "none", base: "inherit" }}
                        onClick={() => set_expand(true)}
                    >
                        <Menu />
                    </Box>
                    <ExtraBold fontSize={{ sm: 28, base: 20 }}>
                        Workspaces
                    </ExtraBold>
                </Flex>
                <Flex gap={5} marginTop={4} width="full">
                    <Input
                        width="full"
                        bg="#dde0f2"
                        onChange={(e) => set_filter(e.target.value)}
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
                <WorkspacesList
                    filter={filter}
                    reload={reload}
                    revert={() => set_reload(false)}
                />
            </Flex>
        </Flex>
    );
};

export default DashBoard;
