import SideBarProject from "@components/SideBarProject";
import { Box, Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";
import { useEffect, useState } from "react";
import { Send } from "react-feather";
import { appwriteClient, database } from "src/utility";

const Chat = () => {
    const [message, set_message] = useState<string>("");
    const [display_messages, set_display_messages] = useState<Array<any>>([]);

    useEffect(() => {
        // Add event listeners
        window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                send_message();
            }
        });

        const unsubscribe = appwriteClient.subscribe(
            "databases.63e3b29fc39c2b57482b.collections.63e3b2a3f059f3ce8456.documents",
            (payload) => {
                console.log(payload);
            }
        );
    }, [display_messages]);

    const send_message = async () => {
        await database.createDocument(
            "63e3b29fc39c2b57482b",
            "63e3b2a3f059f3ce8456",
            "unique()",
            {
                message,
                send_by: "kyeboard",
            }
        );
    };

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
