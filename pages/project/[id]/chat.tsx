import SideBarProject from "@components/SideBarProject";
import { Box, Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Send } from "react-feather";
import { appwriteClient, database } from "src/utility";

const Chat = () => {
    const [message, set_message] = useState<string>("");
    const [display_messages, set_display_messages] = useState<Array<any>>([]);
    const route = useRouter();

    const send_message = async () => {
        await database.createDocument(
            // route.query.id as string,
            "63e6000013274e2a24af",
            "chat",
            "unique()",
            {
                message,
                timestamp: new Date(),
                author: "kyeboard",
            }
        );
    };

    useEffect(() => {
        // Add event listeners
        window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                send_message();
            }
        });

        const unsubscribe = appwriteClient.subscribe(
            `databases.63e6000013274e2a24af.collections.chat.documents.create`,
            (payload) => {
                console.log(payload);
            }
        );
    }, [display_messages, send_message]);

    return (
        <Flex width={"100vw"} height={"100vh"}>
            <SideBarProject current="chat" />
            <Box width={"100%"} height={"100%"} padding={5}>
                <Box height={"calc(100vh - 90px)"}>
                    {Array.from(display_messages).map((e) => {
                        return (
                            <Box key={e.message}>
                                <Text>{e.send_by}</Text>
                                <Text>{e.message}</Text>
                            </Box>
                        );
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
