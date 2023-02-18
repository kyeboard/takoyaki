import SideBar from "@components/SideBar";
import NewProject from "@components/NewProject";
import { Box, Flex } from "@pankod/refine-chakra-ui";
import { rise } from "animations";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExtraBold from "@components/ExtraBold";
import ProjectsList from "@components/ProjectsList";
import Head from "next/head";
import { Menu } from "react-feather";

const DashBoard = () => {
    const date = new Date();
    const [show_new, set_show_new] = useState<boolean>(false);
    const [refresh, set_refresh] = useState<boolean>(true);
    const [expand, set_expand] = useState<boolean>(false);

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

    const Container = motion(Flex);
    const AnimatedElement = motion(Flex);
    const ProjectCardAnimated = motion(Flex);

    return (
        <Flex
            width={"100vw"}
            height="100vh"
            direction={{ sm: "row", base: "column" }}
        >
            <Head>
                <title>Your dashboard - planetary</title>
            </Head>
            <SideBar
                current="dashboard"
                expand={expand}
                destroy_self={() => set_expand(false)}
            />
            <Flex
                direction="column"
                marginTop={5}
                paddingLeft={{ sidebar_md: 12, sm: 8, base: 6 }}
                paddingRight={{ sidebar_md: 12, sm: 0, base: 6 }}
                width={{
                    sidebar_md: "calc(100vw - 350px)",
                    sm: "calc(100vw - 100px)",
                    base: "calc(100vw)",
                }}
                marginLeft={{
                    sidebar_md: "350px",
                    sm: "80px",
                    base: "0px",
                }}
            >
                <AnimatePresence initial={true}>
                    {show_new && (
                        <NewProject
                            container={Container}
                            afterAll={() => set_refresh(true)}
                            animatedelement={AnimatedElement}
                            destroy_self={() => set_show_new(false)}
                        />
                    )}
                </AnimatePresence>
                <Flex direction={"column"} height="fit-content" paddingTop={32}>
                    <Flex
                        alignItems={"center"}
                        gap={5}
                        opacity={0}
                        style={{ animationDelay: "140ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        <Box onClick={() => set_expand(true)}>
                            <Menu />
                        </Box>
                        <ExtraBold fontSize={{ sm: 28, base: 20 }}>
                            Today, {date.getDate()} {month[date.getMonth()]}
                        </ExtraBold>
                    </Flex>
                </Flex>
                <Box width="full">
                    <ProjectsList
                        refresh={refresh}
                        set_refresh={set_refresh}
                        set_show_new={set_show_new}
                        animatedelement={ProjectCardAnimated}
                    />
                </Box>
            </Flex>
        </Flex>
    );
};

export default DashBoard;
