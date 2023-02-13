import {
    Box,
    Button,
    Flex,
    Input,
    keyframes,
    Spinner,
    Text,
    Textarea,
} from "@pankod/refine-chakra-ui";
import { Nunito } from "@next/font/google";
import ColorSelection from "@components/ColorInput";
import { useEffect, useState } from "react";
import feathericons from "feather-icons";
import { database, storage, teams } from "src/utility";
import { useRouter } from "next/router";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const rise = keyframes`
    0% {
        opacity: 0;
        transform: translateY(45px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const unfade = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const NewWorkspace = () => {
    const [color, set_color] = useState<string>("pink");
    const [name, set_name] = useState<string>("");
    const [desc, set_desc] = useState<string>("");
    const [status, set_status] = useState<string>(
        "Setting up your workspace..."
    );
    const [show_loader, set_show_loader] = useState<boolean>(false);
    const [email, set_email] = useState<string>("");
    const router = useRouter();
    const [invalid, set_invalid] = useState<boolean>(false);

    useEffect(() => {
        document.title = "Create a new workspace - kyeboard";
    });

    const create_workspace = async () => {
        set_show_loader(true);
    };

    return (
        <Flex
            zIndex={1}
            direction={"column"}
            width={"100vw"}
            height="100vh"
            paddingTop={32}
            paddingX={24}
        >
            <Text
                className={nunito.className}
                align="center"
                fontSize={36}
                opacity={0}
                style={{ animationDelay: `0ms` }}
                animation={`${rise} 500ms ease-in-out forwards`}
            >
                New Workspace
            </Text>
            <Flex gap={12} width={"full"} height="full" marginTop={10}>
                <Box width={"full"} height={"full"}>
                    <Box>
                        <Text
                            opacity={0}
                            style={{ animationDelay: `40ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            Workspace Name
                        </Text>
                        <Input
                            opacity={0}
                            style={{ animationDelay: `60ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            bg="#dde1f3"
                            padding={6}
                            marginTop={2}
                            onChange={(e) => set_name(e.target.value)}
                            placeholder="A unique name for your workspace..."
                        />
                    </Box>
                    <Box marginTop={5}>
                        <Text
                            opacity={0}
                            style={{ animationDelay: `100ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            Workspace Description
                        </Text>
                        <Textarea
                            bg="#dde1f3"
                            opacity={0}
                            style={{ animationDelay: `120ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            paddingX={6}
                            paddingY={4}
                            onChange={(e) => set_desc(e.target.value)}
                            height={44}
                            resize="none"
                            marginTop={2}
                            placeholder="A legendary description about your workspace..."
                        />
                    </Box>
                    <Box marginTop={5}>
                        <Text
                            opacity={0}
                            style={{ animationDelay: `140ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            Workspace Color
                        </Text>
                        <Box
                            opacity={0}
                            style={{ animationDelay: `160ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            <ColorSelection
                                value={color}
                                onChange={set_color}
                            />
                        </Box>
                    </Box>
                    <Flex gap={5} marginTop={8}>
                        <Button
                            padding={6}
                            width="full"
                            bg="transparent"
                            opacity={0}
                            style={{ animationDelay: `200ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            _hover={{ bg: "transparent" }}
                            color="#f38ba8"
                        >
                            Cancel
                        </Button>
                        <Button
                            width="full"
                            padding={6}
                            opacity={0}
                            style={{ animationDelay: `230ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            _hover={{ bg: "#2E3440" }}
                            bg="#2E3440"
                            onClick={create_workspace}
                            color="#D8DEE9"
                        >
                            Create
                        </Button>
                    </Flex>
                </Box>
                <Box
                    borderRight={"solid"}
                    borderWidth={1}
                    opacity={0}
                    style={{ animationDelay: `200ms` }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    borderColor="#DCE0F3"
                ></Box>
                <Flex width={"full"} direction="column" position={"relative"}>
                    <Text
                        opacity={0}
                        style={{ animationDelay: `240ms` }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        Choose an icon
                    </Text>
                    <Flex marginTop={2} gap={5}>
                        <Input
                            bg="#dde1f3"
                            padding={6}
                            value={email}
                            opacity={0}
                            style={{ animationDelay: `260ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            onChange={(e) => set_email(e.target.value)}
                            placeholder="Nothing looks good without an icon! Type your icon..."
                        />
                    </Flex>
                    <Flex
                        height={"fit-content"}
                        width="100%"
                        wrap="wrap"
                        gap={5}
                        justifyContent="center"
                        overflow={"scroll"}
                        marginY={6}
                    >
                        {Object.entries(feathericons.icons).map(
                            (key, value) => {
                                if (key[0].includes(email)) {
                                    return (
                                        <Flex
                                            padding={5}
                                            rounded="lg"
                                            bg="#dde1f3"
                                            key={key[0]}
                                            dangerouslySetInnerHTML={{ __html: (new Object(feathericons.icons))[key[0]].toSvg() }}
                                        ></Flex>
                                    );
                                } else {
                                    return <></>;
                                }
                            }
                        )}
                    </Flex>
                </Flex>
            </Flex>
            {show_loader ? (
                <Flex
                    position={"absolute"}
                    height="100vh"
                    width="100vw"
                    zIndex={100000}
                    bg="rgba(46, 52, 64, 0.6)"
                    backdropFilter="auto"
                    backdropBlur="6px"
                    left="0"
                    opacity={0}
                    style={{ animationDelay: `120ms` }}
                    animation={`${unfade} 500ms ease-in-out forwards`}
                    direction={"column"}
                    className={nunito.className}
                    fontSize={18}
                    gap={5}
                    color="#D8DEE9"
                    alignItems={"center"}
                    justifyContent="center"
                    top="0"
                >
                    <Spinner color="#D8DEE9" />
                    <Text>{status}</Text>
                </Flex>
            ) : (
                <></>
            )}
        </Flex>
    );
};

export default NewWorkspace;
