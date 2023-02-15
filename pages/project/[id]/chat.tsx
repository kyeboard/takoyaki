import SideBarProject from "@components/SideBarProject";
import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Text,
} from "@pankod/refine-chakra-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Send } from "react-feather";
import { account, appwriteClient, database, storage } from "src/utility";

interface Message extends Models.Document {
    message: string;
    timestamp: string;
    author: string;
}

const Chat = () => {
    const [message, set_message] = useState<string>("");
    var prev_sender: string = "";
    const [user, set_user] = useState<Models.Account<{}> | null>();
    const [incoming, set_incoming] = useState<Array<Message>>([]);

    useEffect(() => {
        const fetch_user = async () => {
            set_user(await account.get());
        };

        fetch_user();

        appwriteClient.subscribe<Message>(
            "databases.63ec33962d17e2ab9e3a.collections.chat.documents",
            (payload) => {
                set_incoming([...incoming, payload.payload]);

                console.log(payload.payload);
            }
        );
    }, [incoming]);

    const send_message = () => {
        database.createDocument("63ec33962d17e2ab9e3a", "chat", "unique()", {
            message,
            author: user?.name as string,
            timestamp: new Date(),
        });

        set_message("");
    };

    return (
        <Flex width={"100vw"} height={"100vh"}>
            <SideBarProject current="chat" />
            <Box width={"calc(100vw - 350px)"} height={"100%"} padding={5}>
                <Flex
                    height={"calc(100vh - 90px)"}
                    paddingY={6}
                    direction="column"
                    justifyContent="end"
                >
                    {incoming.map((f) => {
                        const render = (
                            <Flex key={f.$id} gap={5} marginTop={4}>
                                {prev_sender == f.author ? (
                                    <Box width={12}></Box>
                                ) : (
                                    <Image
                                        src={
                                            storage.getFilePreview(
                                                "63dfd4b2bf3364da5f0c",
                                                f.author
                                            ).href
                                        }
                                        width={12}
                                        height={12}
                                        borderRadius={"full"}
                                        alt="user profile"
                                    />
                                )}
                                <Text
                                    borderBottomRadius={"2xl"}
                                    borderTopRightRadius={"2xl"}
                                    bgColor={"#dde0f2"}
                                    padding={4}
                                    paddingX={6}
                                >
                                    {f.message}
                                </Text>
                            </Flex>
                        );

                        prev_sender = f.author;

                        return render;
                    })}
                </Flex>
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
