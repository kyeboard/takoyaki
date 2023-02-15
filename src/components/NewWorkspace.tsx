import {
    Box,
    Button,
    Flex,
    Input,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import { Nunito } from "@next/font/google";
import ColorSelection from "@components/ColorInput";
import FormItem from "@components/FormItem";
import { ComponentType, useEffect, useState } from "react";
import { rise, unfade } from "animations";
import feathericons from "feather-icons";
import { useRouter } from "next/router";
const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const NewWorkspace: React.FC<{
    destroy_self: () => void;
    container: ComponentType<any>;
    animatedelement: ComponentType<any>;
}> = ({
    destroy_self,
    container: Container,
    animatedelement: AnimatedElement,
}) => {
    const [color, set_color] = useState<string>("pink");
    const [name, set_name] = useState<string>("");
    const [desc, set_desc] = useState<string>("");
    const [status, set_status] = useState<string>(
        "Setting up your workspace..."
    );
    const [show_loader, set_show_loader] = useState<boolean>(false);
    const [email, set_email] = useState<string>("");
    const [icon, set_icon] = useState<string>("");
    const router = useRouter();
    const [has_sumbitted, set_has_sumbitted] = useState<boolean>(false);
    const [invalid, set_invalid] = useState<boolean>(false);
    const icons: { [key: string]: any } = new Object(feathericons.icons);

    useEffect(() => {
        document.title = "Create a new workspace - kyeboard";
    });

    const create_workspace = async (e: any) => {
        e.preventDefault();
        set_has_sumbitted(true);

        if (!name || !desc) return;

        set_show_loader(true);

        set_status("Done!");

        // router.push(`/project/${team.$id}`);
    };

    return (
        <Box>
            <Container
                height="100vh"
                width="100vw"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                bg="rgba(46, 52, 64, 0.6)"
                position="fixed"
                key="main-component"
                zIndex={2000}
                overflow="scroll"
                backdropFilter="auto"
                backdropBlur={"6px"}
            >
                <AnimatedElement
                    zIndex={1}
                    marginTop={"10vh"}
                    direction={"column"}
                    width={"100vw"}
                    height="fit-content"
                    minHeight={"90vh"}
                    paddingBottom={12}
                    opacity={0}
                    initial={{ opacity: 0, transform: "translateY(30px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(30px)" }}
                    borderTopRadius={"2xl"}
                    paddingTop={12}
                    bg="#e7e7f2"
                    paddingX={"5vw"}
                >
                    <Text
                        className={nunito.className}
                        align="center"
                        fontSize={{ sm: 32, base: 24 }}
                        opacity={0}
                        style={{ animationDelay: `0ms` }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        New Workspace
                    </Text>
                    <Flex
                        gap={12}
                        width={"full"}
                        height="full"
                        marginTop={10}
                        direction={{ sm: "row", base: "column" }}
                    >
                        <Box width={"full"} height={"full"}>
                            <form onSubmit={create_workspace}>
                                <FormItem
                                    value={name}
                                    type="text"
                                    opacity={0}
                                    style={{ animationDelay: `60ms` }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                    set_value={(v: string) => set_name(v)}
                                    check={(d) => !(has_sumbitted && !d)}
                                    error_message={
                                        "Ah I see, can't even think of a good project name?"
                                    }
                                    title="Workspace Name"
                                    helper_message="Choose a great name for your workspace"
                                    placeholder="An awesome name..."
                                />
                                <FormItem
                                    marginTop={7}
                                    value={desc}
                                    type="text"
                                    is_textarea={true}
                                    opacity={0}
                                    style={{ animationDelay: `60ms` }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                    set_value={(v: string) => set_desc(v)}
                                    check={(d) => !(has_sumbitted && !d)}
                                    error_message={
                                        "It's okay if you are dumb sometimes..."
                                    }
                                    title="Workspace Description"
                                    helper_message="Choose a great description for your workspace"
                                    placeholder="An awesome description..."
                                />
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
                                <Flex
                                    gap={5}
                                    marginTop={8}
                                    display={{ base: "none", sm: "flex" }}
                                >
                                    <Button
                                        padding={6}
                                        width="full"
                                        bg="transparent"
                                        opacity={0}
                                        onClick={destroy_self}
                                        style={{ animationDelay: `200ms` }}
                                        animation={`${rise} 500ms ease-in-out forwards`}
                                        _hover={{ bg: "transparent" }}
                                        color="#f38ba8"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        width="full"
                                        type="submit"
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
                            </form>
                        </Box>
                        <Box
                            borderRight={"solid"}
                            borderWidth={1}
                            display={{ base: "none", sm: "flex" }}
                            opacity={0}
                            style={{ animationDelay: `200ms` }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            borderColor="#DCE0F3"
                        ></Box>
                        <Flex width={"full"} direction="column">
                            <Text
                                opacity={0}
                                style={{ animationDelay: `240ms` }}
                                animation={`${rise} 500ms ease-in-out forwards`}
                            >
                                Choose an icon
                            </Text>
                            <Flex marginTop={2} gap={5}>
                                <Input
                                    _placeholder={{ color: "gray.500" }}
                                    bg="#dde1f3"
                                    padding={6}
                                    opacity={0}
                                    onChange={(e) => set_email(e.target.value)}
                                    style={{ animationDelay: `260ms` }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                    placeholder="search for the coffee icon..."
                                />
                            </Flex>
                            <Flex height={"65vh"} overflow="scroll" wrap={"wrap"} gap={6} marginTop={5}>
                                {Object.keys(feathericons.icons).map(
                                    (key, value) => {
                                        return (
                                            <Flex
                                                padding={4}
                                                rounded="lg"
                                                bg={
                                                    key == icon
                                                        ? "#2E3440"
                                                        : "#dde1f3"
                                                }
                                                onClick={() => set_icon(key)}
                                                borderWidth={2}
                                                cursor="pointer"
                                                height={14}
                                                boxSizing="border-box"
                                                key={key}
                                                color={
                                                    key == icon
                                                        ? "#D8DEE9"
                                                        : "#2E3440"
                                                }
                                                dangerouslySetInnerHTML={{
                                                    __html: icons[key].toSvg({
                                                        width: 20,
                                                        height: 20,
                                                    }),
                                                }}
                                            ></Flex>
                                        );
                                    }
                                )}
                            </Flex>
                            <Flex
                                gap={5}
                                marginTop={8}
                                display={{ sm: "none", base: "flex" }}
                            >
                                <Button
                                    padding={6}
                                    width="full"
                                    bg="transparent"
                                    opacity={0}
                                    onClick={destroy_self}
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
                        </Flex>
                    </Flex>
                </AnimatedElement>
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
                        top={0}
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
                    >
                        <Spinner color="#D8DEE9" />
                        <Text>{status}</Text>
                    </Flex>
                ) : (
                    <></>
                )}
            </Container>
        </Box>
    );
};

export default NewWorkspace;
