import ExtraBold from "@components/ExtraBold";
import SideBar from "@components/SideBar";
import { Models } from "@pankod/refine-appwrite";
import { Box, Flex } from "@pankod/refine-chakra-ui";
import { useState } from "react";
import { Menu } from "react-feather";
import { rise } from "animations";
import NotificationList from "@components/NotificationList";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

const Notifications = () => {
    const AnimatedElement = motion(Flex);
    const Container = motion(Flex);
    const [expand, set_expand] = useState<boolean>(false);

    return (
        <Flex
            width={"100vw"}
            height="100vh"
            direction={{ sm: "row", base: "column" }}
        >
            <Head>
                <title>Your notifications - planetary</title>
            </Head>
            <SideBar
                current="notifications"
                expand={expand}
                destroy_self={() => set_expand(false)}
            />
            <Box
                paddingLeft={{ sidebar_md: "400px", sm: "120px", base: "20px" }}
                paddingRight={{ sm: "40px", base: "20px" }}
                marginTop={36}
                width="full"
            >
                <Flex
                    alignItems={"center"}
                    gap={5}
                    opacity={0}
                    style={{ animationDelay: "140ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    <Box
                        display={{ sm: "none", base: "inherit" }}
                        onClick={() => set_expand(true)}
                    >
                        <Menu />
                    </Box>
                    <ExtraBold fontSize={{ sm: 28, base: 20 }}>
                        Notifications
                    </ExtraBold>
                </Flex>
                <AnimatePresence>
                    <NotificationList
                        animatedelement={AnimatedElement}
                        container={Container}
                    />
                </AnimatePresence>
            </Box>
        </Flex>
    );
};

export default Notifications;
