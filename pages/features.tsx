import ExtraBold from "@components/ExtraBold";
import { Box, Flex, Text } from "@pankod/refine-chakra-ui";
import { rise } from "animations";
import Head from "next/head";
import { Eye, MessageSquare, Package, Users, Video } from "react-feather";

const Features = () => {
    return (
        <Flex
            direction="column"
            alignItems={"center"}
            marginTop={32}
            w="100vw"
            h="calc(100vh - 300px)"
        >
            <Head>
                <title>Awesome features - planetary</title>
            </Head>
            <ExtraBold
                fontSize={48}
                align="center"
                w="full"
                opacity={0}
                animation={`${rise} 500ms ease-in-out forwards`}
            >
                Features
            </ExtraBold>
            <Text
                fontSize={16}
                marginTop={1}
                color="gray.600"
                opacity={0}
                animation={`${rise} 500ms ease-in-out forwards`}
                style={{ animationDelay: "50ms" }}
                align={"center"}
                maxW="450px"
                paddingX={5}
            >
                Our app&apos;s features are like a personal assistant - but
                better, because they won&apos;t call in sick or drink all your
                coffee!
            </Text>
            <Flex
                wrap="wrap"
                marginTop={8}
                gap={2}
                padding={5}
                justifyContent="center"
            >
                <Flex
                    bg="#dce0f3"
                    padding={7}
                    marginTop={2}
                    borderRadius="xl"
                    direction="column"
                    opacity={0}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    style={{ animationDelay: "100ms" }}
                    maxW={"400px"}
                >
                    <Box
                        borderRadius={"xl"}
                        padding={4}
                        bg="rgba(46, 52, 64, 0.1)"
                        w="fit-content"
                    >
                        <Package />
                    </Box>
                    <ExtraBold marginTop={4} fontSize={24}>
                        Task Management
                    </ExtraBold>
                    <Text marginTop={2}>
                        When your team is managed with our app, you can finally
                        focus on the important things in life, like browsing
                        memes.
                    </Text>
                </Flex>
                <Flex
                    bg="#dce0f3"
                    padding={7}
                    marginTop={2}
                    borderRadius="xl"
                    direction="column"
                    opacity={0}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    style={{ animationDelay: "150ms" }}
                    maxW={"400px"}
                >
                    <Box
                        borderRadius={"xl"}
                        padding={4}
                        bg="rgba(46, 52, 64, 0.1)"
                        w="fit-content"
                    >
                        <MessageSquare />
                    </Box>
                    <ExtraBold marginTop={4} fontSize={24}>
                        Team chat
                    </ExtraBold>
                    <Text marginTop={2}>
                        Easily take a break and chill with your team mates with
                        an inbuilt chat feature.
                    </Text>
                </Flex>
                <Flex
                    bg="#dce0f3"
                    padding={7}
                    marginTop={2}
                    opacity={0}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    style={{ animationDelay: "250ms" }}
                    borderRadius="xl"
                    direction="column"
                    maxW={"400px"}
                >
                    <Box
                        borderRadius={"xl"}
                        padding={4}
                        bg="rgba(46, 52, 64, 0.1)"
                        w="fit-content"
                    >
                        <Users />
                    </Box>
                    <ExtraBold marginTop={4} fontSize={24}>
                        Team management
                    </ExtraBold>
                    <Text marginTop={2}>
                        Easily invite other members to your project to collab,
                        as well as remove them if they spam :P
                    </Text>
                </Flex>
                <Flex
                    bg="#dce0f3"
                    padding={7}
                    marginTop={2}
                    borderRadius="xl"
                    direction="column"
                    opacity={0}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    style={{ animationDelay: "300ms" }}
                    maxW={"400px"}
                >
                    <Box
                        borderRadius={"xl"}
                        padding={4}
                        bg="rgba(46, 52, 64, 0.1)"
                        w="fit-content"
                    >
                        <Eye />
                    </Box>
                    <ExtraBold marginTop={4} fontSize={24}>
                        Beautiful UI
                    </ExtraBold>
                    <Text marginTop={2}>
                        Amazingly beautiful UI, it&apos;s like the Mona Lisa of
                        task management apps - minus the creepy smile!
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Features;
