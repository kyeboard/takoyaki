import { Box, Button, Flex, Text, Image } from "@pankod/refine-chakra-ui";
import { rise } from "animations";
import Link from "next/link";
import { Bold, ChakraNextImage, ExtraBold } from "@components";
import { useEffect } from "react";
import { GitHub, Heart, Mail, Twitter } from "react-feather";

const Index = () => {
    useEffect(() => {
        document.title = "Welcome to planetary - a professional todo app";
    });

    const riseAnimation = `${rise} 500ms ease-in-out forwards`;

    return (
        <Flex
            width="100vw"
            height="100vh"
            alignItems={{ sm: "center", base: "start" }}
            direction={{ sm: "row", base: "column" }}
        >
            <Box
                width={{ sm: "50%", base: "100%" }}
                paddingX={{ sm: 28, base: 6 }}
            >
                <Box
                    marginTop={{ sm: 16, base: 32 }}
                    bg="#dce0f3"
                    padding={2}
                    width={36}
                    textAlign="center"
                    animation={riseAnimation}
                    borderRadius={"lg"}
                >
                    <Bold>PLANETARY</Bold>
                </Box>
                <ExtraBold
                    fontSize={{ sm: "3.4rem", base: "3rem" }}
                    marginTop={5}
                    lineHeight={{ sm: "3.8rem", base: "3.4rem" }}
                    opacity={0}
                    style={{ animationDelay: "100ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    To-Do&apos;s Never <br /> Looked So Good
                </ExtraBold>
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
                <Flex
                    marginTop={{ sm: 10, base: 6 }}
                    direction={{ sm: "row", base: "column" }}
                    width={{ sm: "60%", base: "full" }}
                    gap={5}
                >
                    <Link href="/login" style={{ width: "100%" }}>
                        <Button
                            padding={7}
                            bg="#2E3440"
                            color="#dce0f3"
                            width="full"
                            opacity={0}
                            _hover={{ bg: "#2E3440" }}
                            style={{ animationDelay: "300ms" }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            Get started
                        </Button>
                    </Link>
                    <Link href="/features" style={{ width: "100%" }}>
                        <Button
                            bg="#dce0f3"
                            _hover={{ bg: "#dce0f3" }}
                            color="#2e3440"
                            opacity={0}
                            style={{ animationDelay: "320ms" }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            padding={7}
                            width="full"
                        >
                            See features
                        </Button>
                    </Link>
                </Flex>
                <Flex
                    marginTop={{ sm: 20, base: 14 }}
                    gap={7}
                    color="#2E3440"
                    opacity={0}
                    style={{ animationDelay: "350ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    <Text>Find me at </Text>
                    <Link href="https://www.github.com/kyeboard">
                        <GitHub />
                    </Link>
                    <Link href="https://twitter.com/kyeboard_">
                        <Twitter />
                    </Link>
                    <Link href="https://www.github.com/sponsors/kyeboard">
                        <Heart />
                    </Link>
                    <Link href="mailto:me@kyeboard.me">
                        <Mail />
                    </Link>
                </Flex>
            </Box>
            <Flex
                width="50%"
                justifyContent={"center"}
                display={{ sm: "flex", base: "none" }}
            >
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
                        gap={"5vw"}
                        opacity={0}
                        width="fit-content"
                        style={{ animationDelay: "200ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        <Flex height="full" direction="column">
                            <ExtraBold fontSize={"xl"}>Effectiveness</ExtraBold>
                            <Text color="gray.600" marginTop={1}>
                                1 Feb 2023 - 1 Mar 2023
                            </Text>
                            <Flex
                                gap={2}
                                marginTop={"auto"}
                                height={12}
                                opacity={0}
                                style={{ animationDelay: "250ms" }}
                                animation={`${rise} 500ms ease-in-out forwards`}
                                alignItems="end"
                            >
                                <ExtraBold fontSize={32} lineHeight={"30px"}>
                                    132
                                </ExtraBold>
                                <Bold>Projects completed</Bold>
                            </Flex>
                        </Flex>
                        <Box marginLeft={"auto"} marginTop="auto">
                            <Image
                                src="/images/growth.svg"
                                width={"15vw"}
                                alt="Growth graph"
                            />
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
                            <ExtraBold fontSize={"xl"}>Team chat</ExtraBold>
                            <Flex direction={"column"} alignItems="start">
                                <Flex
                                    marginTop={6}
                                    justifyContent={"center"}
                                    style={{ animationDelay: "250ms" }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                    borderRadius={"2xl"}
                                    gap={3}
                                >
                                    <Image
                                        maxWidth={10}
                                        width={"3.5vw"}
                                        height={"3.5vw"}
                                        borderRadius="full"
                                        maxHeight={10}
                                        alt="User profile"
                                        src="https://avatars.githubusercontent.com/u/97718086?v=4"
                                    />
                                    <Box
                                        bg="#d2d9f2"
                                        width="full"
                                        padding={4}
                                        borderBottomRadius="2xl"
                                        borderTopRightRadius={"2xl"}
                                    >
                                        <Text
                                            overflow={"hidden"}
                                            noOfLines={2}
                                            textOverflow={"ellipsis"}
                                        >
                                            Hey{" "}
                                            <span style={{ color: "#000000" }}>
                                                @kyeboard
                                            </span>
                                            , are you up to do this task?
                                        </Text>
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
                                        maxWidth={10}
                                        width={"3.5vw"}
                                        height={"3.5vw"}
                                        borderRadius="full"
                                        maxHeight={10}
                                        src="https://avatars.githubusercontent.com/u/115910279?v=4"
                                        alt="User profile"
                                    />
                                    <Box
                                        bg="#d2d9f2"
                                        padding={4}
                                        borderBottomRadius="2xl"
                                        borderTopRightRadius={"2xl"}
                                    >
                                        <Text
                                            overflow={"hidden"}
                                            noOfLines={2}
                                            textOverflow={"ellipsis"}
                                        >
                                            Sure! Consider it done :D
                                        </Text>
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
                            <ExtraBold fontSize={"xl"}>
                                Invite members
                            </ExtraBold>
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
                                        maxWidth={10}
                                        width={"3.5vw"}
                                        alt="User profile"
                                        borderRadius="full"
                                    />
                                    <Box width="full" marginLeft={5}>
                                        <Bold>kraanzu</Bold>
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
                                        _hover={{ bg: "#cacee2" }}
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
                                        maxWidth={10}
                                        width={"3.5vw"}
                                        src="https://avatars.githubusercontent.com/u/115910279?v=4"
                                        alt="User profile"
                                        borderRadius="full"
                                    />
                                    <Box width="full" marginLeft={5}>
                                        <Bold>kyeboard</Bold>
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
                                        _hover={{ bg: "#cacee2" }}
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
                                        maxWidth={10}
                                        width={"3.5vw"}
                                        alt={"User profile"}
                                        borderRadius="full"
                                    />
                                    <Box width="full" marginLeft={5}>
                                        <Bold
                                            textOverflow={"ellipsis"}
                                            overflow="hidden"
                                            noOfLines={1}
                                        >
                                            ThePrimeagen
                                        </Bold>
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
                                        _hover={{ bg: "#cacee2" }}
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
                                        maxWidth={10}
                                        width={"3.5vw"}
                                        alt={"User profile"}
                                        borderRadius="full"
                                    />
                                    <Box width="full" marginLeft={5}>
                                        <Bold>jonhoo</Bold>
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
                                        _hover={{ bg: "#cacee2" }}
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
