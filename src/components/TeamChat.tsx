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

const TeamChat = () => {
    const [message, set_message] = useState<string>("");
    var prev_sender: string = "";
    const [user, set_user] = useState<Models.Account<{}> | null>();
    const [incoming, set_incoming] = useState<Array<Message>>([]);

    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        const fetch_user = async () => {
            set_user(await account.get());
        };

        fetch_user();

        const unsubscribe = appwriteClient.subscribe<Message>(
            `databases.${router.query.id}.collections.chat.documents`,
            (payload) => {
                console.log(incoming, payload);
                set_incoming([...incoming, payload.payload]);
                console.log(incoming, payload.payload);
            }
        );

        return unsubscribe;
    }, [incoming, router]);

    const send_message = () => {
        database.createDocument(router.query.id as string, "chat", "unique()", {
            message,
            author: user?.name as string,
            timestamp: new Date(),
        });

        set_message("");
    };

    return (
        <Flex>
            <Flex
                height={"calc(100vh - 90px)"}
                paddingY={6}
                direction="column"
                justifyContent="end"
            >
                {incoming.map((f) => {
                    const render = (
                        <Flex
                            key={f.$id}
                            // animation={`${rise} 500ms ease-in-out forwards`}
                            // initial={{ opacity: 0, y: 10 }}
                            // animate={{ opacity: 1, y: 0 }}
                            // exit={{ opacity: 0, y: -10 }}
                            // transition={{ duration: 0.2 }}
                            gap={5}
                            marginTop={f.author == prev_sender ? 3 : 8}
                            flexDirection={
                                f.author == (user?.name as string)
                                    ? "row-reverse"
                                    : "row"
                            }
                            marginLeft={
                                f.author == (user?.name as string)
                                    ? "auto"
                                    : "0px"
                            }
                        >
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
                                borderTopRightRadius={
                                    f.author == (user?.name as string)
                                        ? "0px"
                                        : "2xl"
                                }
                                borderTopLeftRadius={
                                    f.author == (user?.name as string)
                                        ? "2xl"
                                        : "0px"
                                }
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
        </Flex>
    );
};

export default TeamChat;
