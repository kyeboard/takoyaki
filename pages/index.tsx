import { Nunito } from "@next/font/google";
import {
    Box,
    Button,
    Flex,
    Image,
    keyframes,
    Text,
} from "@pankod/refine-chakra-ui";
import { useEffect } from "react";
import { GitHub, Heart, Mail, Twitter } from "react-feather";

const font = Nunito({ subsets: ["latin"], weight: "800" });
const font_700 = Nunito({ subsets: ["latin"], weight: "700" });

const rise = keyframes`
    0% {
        opacity: 0;
        transform: translateY(55px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const Index = () => {
    useEffect(() => {
        document.title = "Welcome to planetary - a professional todo app";
    });
    const riseAnimation = `${rise} 500ms ease-in-out forwards`;

    return (
        <Flex
            width="100vw"
            height="100vh"
            alignItems="center"
            overflow={"hidden"}
        >
            <Box width="50%" paddingX={28}>
                <Text
                    marginTop={16}
                    textTransform="capitalize"
                    bg="#dce0f3"
                    padding={2}
                    width={36}
                    align="center"
                    animation={riseAnimation}
                    className={font_700.className}
                    borderRadius={"lg"}
                >
                    PLANETARY
                </Text>
                <Text
                    className={font.className}
                    fontSize={58}
                    marginTop={5}
                    lineHeight={"72px"}
                    opacity={0}
                    style={{ animationDelay: "100ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    To-Do&apos;s Never <br /> Looked So Good
                </Text>
                <Text
                    marginTop={5}
                    color="gray.600"
                    width={"80%"}
                    opacity={0}
                    style={{ animationDelay: "200ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    Organize your to-dos in style with planetary. From &quot;Ok
                    Boomer&quot; to &quot;Ight, Imma head out&quot;, you&apos;ll
                    find a touch of humor in your task management.
                </Text>
                <Flex marginTop={10} width="60%" gap={5}>
                    <Button
                        padding={7}
                        bg="#2E3440"
                        color="#dce0f3"
                        width="full"
                        opacity={0}
                        style={{ animationDelay: "300ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        Get started
                    </Button>
                    <Button
                        bg="#dce0f3"
                        color="#2e3440"
                        opacity={0}
                        style={{ animationDelay: "320ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        padding={7}
                        width="full"
                    >
                        See features
                    </Button>
                </Flex>
                <Flex
                    marginTop={20}
                    gap={7}
                    color="#2E3440"
                    opacity={0}
                    style={{ animationDelay: "350ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    <Text>Find me at </Text>
                    <GitHub />
                    <Twitter />
                    <Mail />
                    <Heart />
                </Flex>
            </Box>
            <Flex width="50%" justifyContent={"center"}>
                <Flex
                    width="fit-content"
                    direction={"column"}
                    height="100vh"
                    opacity={0}
                    style={{ animationDelay: "200ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    justifyContent={"center"}
                    gap={6}
                >
                    <Flex
                        bg="#dce0f3"
                        borderRadius="xl"
                        padding={8}
                        gap={28}
                        opacity={0}
                        style={{ animationDelay: "200ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        <Flex height="full" direction="column">
                            <Text className={font.className} fontSize={"xl"}>
                                Effectiveness
                            </Text>
                            <Text color="gray.600" marginTop={1}>
                                1 Feb 2023 - 1 Mar 2023
                            </Text>
                            <Flex
                                gap={2}
                                className={font_700.className}
                                marginTop={"auto"}
                                opacity={0}
                                style={{ animationDelay: "250ms" }}
                                animation={`${rise} 500ms ease-in-out forwards`}
                                alignItems="end"
                            >
                                <Text
                                    className={font.className}
                                    fontSize={32}
                                    lineHeight={"30px"}
                                >
                                    132
                                </Text>
                                <Text>Projects completed</Text>
                            </Flex>
                        </Flex>
                        <Box marginLeft={"auto"}>
                            <img src="/images/growth.svg" width={"320px"} />
                        </Box>
                    </Flex>
                    <Flex width="full" gap={5}>
                        <Flex
                            bg="#dce0f3"
                            direction={"column"}
                            padding={6}
                            opacity={0}
                            style={{ animationDelay: "250ms" }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            borderRadius={"2xl"}
                            height="fit-content"
                            width="50%"
                        >
                            <Text className={font.className} fontSize={"xl"}>
                                Team chat
                            </Text>
                            <Flex direction={"column"} alignItems="start">
                                <Flex
                                    marginTop={6}
                                    justifyContent={"center"}
                                    // alignItems={"center"}
                                    style={{ animationDelay: "250ms" }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                    borderRadius={"2xl"}
                                    gap={3}
                                >
                                    <Image
                                        width={10}
                                        borderRadius="full"
                                        height={10}
                                        alt="User profile"
                                        src="https://avatars.githubusercontent.com/u/97718086?v=4"
                                    />
                                    <Box
                                        bg="#d2d9f2"
                                        padding={4}
                                        borderBottomRadius="2xl"
                                        borderTopRightRadius={"2xl"}
                                    >
                                        Hey{" "}
                                        <span style={{ color: "#000000" }}>
                                            @kyeboard
                                        </span>
                                        , are you up to do this task?
                                    </Box>
                                </Flex>
                                <Flex
                                    marginTop={6}
                                    justifyContent={"center"}
                                    opacity={0}
                                    style={{ animationDelay: "280ms" }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                    borderRadius={"2xl"}
                                    gap={3}
                                >
                                    <Image
                                        width={10}
                                        borderRadius="full"
                                        height={10}
                                        alt="User profile"
                                        src="https://www.kyeboard.me/profile.png"
                                    />
                                    <Box
                                        bg="#d2d9f2"
                                        padding={4}
                                        borderBottomRadius="2xl"
                                        borderTopRightRadius={"2xl"}
                                    >
                                        Sure! Consider it done :D
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            direction="column"
                            bg="#dce0f3"
                            padding={6}
                            borderRadius={"2xl"}
                            width="50%"
                        >
                            <Text className={font.className} fontSize={"xl"}>
                                Invite members
                            </Text>
                            <Flex
                                marginTop={5}
                                direction="column"
                                gap={7}
                                width="full"
                            >
                                <Flex
                                    width={"full"}
                                    alignItems="center"
                                    opacity={0}
                                    style={{ animationDelay: "300ms" }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                >
                                    <Image
                                        src="https://avatars.githubusercontent.com/u/97718086?v=4"
                                        width={10}
                                        borderRadius="full"
                                    />
                                    <Box width="full" marginLeft={5}>
                                        <Text className={font_700.className}>
                                            kraanzu
                                        </Text>
                                        <Box
                                            marginTop={1}
                                            width="80%"
                                            height={2}
                                            borderRadius={"xl"}
                                            bg="#cacee2"
                                        />
                                    </Box>
                                    <Button
                                        bg="#cacee2"
                                        fontSize={"xs"}
                                        height={8}
                                        paddingX={8}
                                        borderRadius={"3xl"}
                                    >
                                        Send Invite
                                    </Button>
                                </Flex>
                                <Flex
                                    width={"full"}
                                    alignItems="center"
                                    opacity={0}
                                    style={{ animationDelay: "320ms" }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                >
                                    <Image
                                        src="https://www.kyeboard.me/profile.png"
                                        width={10}
                                        borderRadius="full"
                                    />
                                    <Box width="full" marginLeft={5}>
                                        <Text className={font_700.className}>
                                            kyeboard
                                        </Text>
                                        <Box
                                            width="80%"
                                            marginTop={1}
                                            height={2}
                                            borderRadius={"xl"}
                                            bg="#cacee2"
                                        />
                                    </Box>
                                    <Button
                                        bg="#cacee2"
                                        fontSize={"xs"}
                                        height={8}
                                        paddingX={8}
                                        borderRadius={"3xl"}
                                    >
                                        Send Invite
                                    </Button>
                                </Flex>
                                <Flex
                                    width={"full"}
                                    alignItems="center"
                                    opacity={0}
                                    style={{ animationDelay: "340ms" }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                >
                                    <Image
                                        src="https://avatars.githubusercontent.com/u/4458174?v=4"
                                        width={10}
                                        borderRadius="full"
                                    />
                                    <Box width="full" marginLeft={5}>
                                        <Text className={font_700.className}>
                                            ThePrimeagen
                                        </Text>
                                        <Box
                                            width="80%"
                                            marginTop={1}
                                            height={2}
                                            borderRadius={"xl"}
                                            bg="#cacee2"
                                        />
                                    </Box>
                                    <Button
                                        bg="#cacee2"
                                        fontSize={"xs"}
                                        height={8}
                                        paddingX={8}
                                        borderRadius={"3xl"}
                                    >
                                        Send Invite
                                    </Button>
                                </Flex>
                                <Flex
                                    width={"full"}
                                    alignItems="center"
                                    opacity={0}
                                    style={{ animationDelay: "360ms" }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                >
                                    <Image
                                        src="https://avatars.githubusercontent.com/u/176295?v=4"
                                        width={10}
                                        borderRadius="full"
                                    />
                                    <Box width="full" marginLeft={5}>
                                        <Text className={font_700.className}>
                                            jonhoo
                                        </Text>
                                        <Box
                                            width="80%"
                                            height={2}
                                            borderRadius={"xl"}
                                            bg="#cacee2"
                                        />
                                    </Box>
                                    <Button
                                        bg="#cacee2"
                                        fontSize={"xs"}
                                        marginTop={1}
                                        height={8}
                                        paddingX={8}
                                        borderRadius={"3xl"}
                                    >
                                        Send Invite
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Index;
