import {
    Box,
    Button,
    Flex,
    Input,
    keyframes,
    Spinner,
    Stack,
    Text,
    Textarea,
    VStack,
} from "@pankod/refine-chakra-ui";
import { Nunito } from "@next/font/google";
import ColorSelection from "@components/ColorInput";
import FormItem from "@components/FormItem";
import { ComponentType, useEffect, useRef, useState } from "react";
import { rise, unfade } from "animations";
import { Mail, Plus, X } from "react-feather";
import { database, storage, teams } from "src/utility";
import { useRouter } from "next/router";
import { Permission, Role } from "@pankod/refine-appwrite";
import Validator from "validatorjs";
import {
    AnimatePresence,
    AnimationControls,
    motion,
    useAnimation,
} from "framer-motion";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const NewProject: React.FC<{
    destroy_self: () => void;
    variant: AnimationControls;
    container: ComponentType<any>;
    animatedelement: ComponentType<any>;
}> = ({
    destroy_self,
    variant,
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
    const [users, set_users] = useState<Array<string>>([]);
    const router = useRouter();
    const [has_sumbitted, set_has_sumbitted] = useState<boolean>(false);
    const [invalid, set_invalid] = useState<boolean>(false);

    useEffect(() => {
        document.title = "Create a new project - kyeboard";
    });

    const create_project = async (e: any) => {
        e.preventDefault();
        set_has_sumbitted(true);

        if (!name || !desc) return;

        set_show_loader(true);

        // Create team
        const team = await teams.create("unique()", name);

        // Create an entry in database for databases
        await database.createDocument(
            "teams",
            "teams",
            team.$id,
            {
                title: name,
                description: desc,
                color,
            },
            [
                Permission.update(Role.team(team.$id)),
                Permission.read(Role.team(team.$id)),
                Permission.delete(Role.team(team.$id)),
            ]
        );

        // Invite members
        for (const member of users) {
            set_status("Sending an invite link to " + member);

            await teams.createMembership(
                team.$id,
                member,
                [],
                window.location.origin + "/accept_invite"
            );
        }

        set_status("Done!");

        router.push(`/project/${team.$id}`);
    };

    const add_user = () => {
        const validator = new Validator(
            {
                email,
            },
            {
                email: "required|email",
            }
        );

        if (validator.passes()) {
            // Add to array
            set_users([...users, email]);

            // Just to not hit the edge case, lets keep the invalid to false
            set_invalid(false);
        } else {
            set_invalid(true);
        }
    };

    const remove_user = (email: string) => {
        const index = users.indexOf(email);

        set_users(users.filter((item, i) => index !== i));
    };

    return (
        <Box>
            <Container
                height="100vh"
                width="100vw"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onExitComplete={() => alert("Component has been unmounted")}
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
                        New Project
                    </Text>
                    <Flex
                        gap={12}
                        width={"full"}
                        height="full"
                        marginTop={10}
                        direction={{ sm: "row", base: "column" }}
                    >
                        <Box width={"full"} height={"full"}>
                            <form onSubmit={create_project}>
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
                                    title="Project Name"
                                    helper_message="Choose a great name for your project"
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
                                    title="Project Description"
                                    helper_message="Choose a great description for your project"
                                    placeholder="An awesome description..."
                                />
                                <Box marginTop={5}>
                                    <Text
                                        opacity={0}
                                        style={{ animationDelay: `140ms` }}
                                        animation={`${rise} 500ms ease-in-out forwards`}
                                    >
                                        Project Color
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
                                        onClick={create_project}
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
                                Invite members
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
                                    placeholder="Enter member's email address..."
                                />
                                <Button
                                    padding={6}
                                    _hover={{ bg: "#2E3440" }}
                                    opacity={0}
                                    style={{ animationDelay: `280ms` }}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                    bg="#2E3440"
                                    color="#D8DEE9"
                                    onClick={add_user}
                                >
                                    <Plus />
                                </Button>
                            </Flex>
                            {invalid ? (
                                <Text marginY={2} paddingX={4} color="#BF616A">
                                    Whoops! Email not recognized. Time to double
                                    check those typos.
                                </Text>
                            ) : (
                                <></>
                            )}
                            <VStack height={"full"} width="full" spacing={4}>
                                <AnimatePresence>
                                    {users.map((email) => {
                                        return (
                                            <AnimatedElement
                                                key={email}
                                                bg="#dde1f3"
                                                marginTop={5}
                                                width="full"
                                                padding={4}
                                                borderRadius={10}
                                                opacity={0}
                                                transition={{
                                                    duration: 0.3,
                                                }}
                                                initial={{
                                                    opacity: 0,
                                                    transform:
                                                        "translateY(20px)",
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    transform:
                                                        "translateY(0px)",
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    transform:
                                                        "translateY(20px)",
                                                }}
                                                gap={4}
                                                paddingX={6}
                                            >
                                                <Mail />
                                                {email}
                                                <Box
                                                    marginLeft="auto"
                                                    onClick={() =>
                                                        remove_user(email)
                                                    }
                                                >
                                                    <X size={20} />
                                                </Box>
                                            </AnimatedElement>
                                        );
                                    })}
                                </AnimatePresence>
                            </VStack>
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
                                    onClick={create_project}
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

export default NewProject;
