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
import { AlertTriangle, Check } from "react-feather";
import { account, database } from "src/utility";
import feathericons from "feather-icons";
import { rise } from "animations";
import NotificationList from "@components/NotificationList";
import { AnimatePresence, motion } from "framer-motion";

interface Notification extends Models.Document {
    icon: string;
    message: string;
}

const Notifications = () => {
    const AnimatedElement = motion(Flex);
    const Container = motion(Flex);

    return (
        <Flex>
            <SideBar current="notifications" />
            <Box
                paddingLeft={"400px"}
                paddingRight={20}
                marginTop={36}
                width="full"
            >
                <ExtraBold
                    animation={`${rise} 500ms ease-in-out forwards`}
                    opacity={0}
                    fontSize={34}
                >
                    Notifications
                </ExtraBold>
                <Input
                    marginTop={3}
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
