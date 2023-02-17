import SideBarProject from "@components/SideBarProject";
import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Text,
    usePrevious,
} from "@pankod/refine-chakra-ui";
import { rise } from "animations";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Send } from "react-feather";
import { account, appwriteClient, database, storage } from "src/utility";

interface Message extends Models.Document {
    message: string;
    timestamp: string;
    author: string;
}

const Chat = () => {
    return (
        <Flex width={"100vw"} height={"100vh"} marginLeft="350px">
            <SideBarProject current="chat" />
            <Box
                width={"calc(100vw - 350px)"}
                height={"100%"}
                padding={5}
            ></Box>
        </Flex>
    );
};

export default Chat;
