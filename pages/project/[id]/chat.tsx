import SideBarProject from "@components/SideBarProject";
import { Box, Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Send } from "react-feather";
import { appwriteClient, database } from "src/utility";

interface Message {
    message: string;
    timestamp: string;
    author: string;
}

const Chat = () => {
    const [message, set_message] = useState<string>("");
    const [incoming, set_incoming] = useState<Array<Message>>([]);

    useEffect(() => {
        appwriteClient.subscribe<Message>(
            "databases.63e6000013274e2a24af.collections.chat.documents",
            (payload) => {
                incoming.push(payload.payload);
            }
        );
    }, [incoming]);

    const send_message = () => {
        database.createDocument("63e6000013274e2a24af", "chat", "unique()", {
            message,
            author: "kyeboard",
            timestamp: new Date(),
        });
    };

    return (
        <Flex width={"100vw"} height={"100vh"}>
            <SideBarProject current="chat" />
            <Box width={"calc(100vw - 350px)"} height={"100%"} padding={5}>
                <Box height={"calc(100vh - 90px)"}>
                    {incoming.map((f) => {
                        return <Text key={f.timestamp}>{f.message}</Text>;
                    })}
                </Box>
                <Flex alignItems={"center"} gap={5}>
                    <Input
                        bg="#dde0f2"
                        padding={7}
                        onChange={(e) => set_message(e.target.value)}
                        placeholder="Enter your message..."
                    />
                    <Button bg="#acebe2" padding={7} onClick={send_message}>
                        <Send />
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Chat;
