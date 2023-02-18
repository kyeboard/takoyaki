import Bold from "@components/Bold";
import ExtraBold from "@components/ExtraBold";
import SideBar from "@components/SideBar";
import { Models, Query } from "@pankod/refine-appwrite";
import {
    Box,
    Flex,
    Image,
    Input,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import moment from "moment";
import { ComponentType, useEffect, useState } from "react";
import { AlertTriangle, Check, Menu } from "react-feather";
import { account, database } from "src/utility";
import feathericons from "feather-icons";
import { rise } from "animations";
import NotificationList from "@components/NotificationList";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

interface Notification extends Models.Document {
    icon: string;
    message: string;
}

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
                <Input
                    marginTop={4}
                    placeholder="Filter your notifications..."
                    bg="#dde0f2"
                    width="full"
                    padding={6}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    opacity={0}
                    style={{ animationDelay: "50ms" }}
                />
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
