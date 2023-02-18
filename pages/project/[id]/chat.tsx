import SideBarProject from "@components/SideBarProject";
import { Models } from "@pankod/refine-appwrite";
import { Box, Flex } from "@pankod/refine-chakra-ui";
import TeamChat from "@components/TeamChat";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

interface Message extends Models.Document {
    message: string;
    timestamp: string;
    author: string;
}

const Chat = () => {
    const animatedElement = motion(Flex);

    return (
        <Flex
            width={"100vw"}
            height={"100vh"}
            marginLeft={{ sidebar_md: "350px", sm: "100px", base: "10px" }}
        >
            <SideBarProject current="chat" />
            <Head>
                <title>Team chat - planetary</title>
            </Head>
            <Box
                width={{
                    sidebar_md: "calc(100vw - 350px)",
                    sm: "calc(100vw - 100px)",
                }}
                height={"100%"}
                padding={5}
            >
                <AnimatePresence>
                    <TeamChat animatedElement={animatedElement} />
                </AnimatePresence>
            </Box>
        </Flex>
    );
};

export default Chat;
