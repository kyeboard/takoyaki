import {
    Box,
    Button,
    Flex,
    Image,
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
import { database, storage, teams } from "src/utility";
import moment from "moment";
import Bold from "./Bold";
import { Models } from "@pankod/refine-appwrite";
import ExtraBold from "./ExtraBold";
const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const EditTask: React.FC<{
    destroy_self: () => void;
    container: ComponentType<any>;
    animatedelement: ComponentType<any>;
    todo_id: string;
}> = ({
    destroy_self,
    todo_id,
    container: Container,
    animatedelement: AnimatedElement,
}) => {
    const [title, set_title] = useState<string>("");
    const [due_date, set_due_date] = useState<string>("");
    const [status, set_status] = useState<string>("Updating your todo...");
    const [show_loader, set_show_loader] = useState<boolean>(false);
    const [priority, set_priority] = useState<number>(0);
    const router = useRouter();
    const [has_sumbitted, set_has_sumbitted] = useState<boolean>(false);
    const [members, set_members] = useState<Array<Models.Membership>>([]);
    const icons: { [key: string]: any } = new Object(feathericons.icons);

    useEffect(() => {
        if (!router.isReady) return;

        document.title = "Edit task - kyeboard";

        const fetch_members = async () => {
            const todo = await database.getDocument(
                router.query.id as string,
                "todos",
                todo_id
            );

            // Set the values
            set_title(todo.title);
            set_due_date(moment(todo.due_date).format("yyyy-MM-DD"));
            set_priority(todo.priority);
            set_assignee(todo.assignee);

            set_members(
                (await teams.listMemberships(router.query.id as string))
                    .memberships
            );
        };

        fetch_members();
    }, [router]);

    const update_workspace = async (e: any) => {
        // Prevent form redirection
        e.preventDefault();

        // Set has sumbitted
        set_has_sumbitted(true);

        // Parse the date
        const parsed_date = moment(due_date);

        // Pass checks
        if (
            !(
                title &&
                parsed_date.isValid() &&
                parsed_date.isSameOrAfter(moment.now()) &&
                priority > 0
            )
        ) {
            return; // The form is not correctly filled up
        }

        // Set to show the loader since the process has started
        set_show_loader(true);

        // Update the todo
        await database.updateDocument(
            router.query.id as string,
            "todos",
            todo_id,
            {
                title,
                due_date,
                priority,
                assignee,
                category: router.query.workspace_id as string,
            }
        );

        // Set done
        set_status("Done!");

        // Destroy self (no more need)
        destroy_self();

        // router.push(`/project/${team.$id}`);
    };

    const [assignee, set_assignee] = useState<Array<string>>([]);

    const toggle_assignee = (user: string) => {
        const index = assignee.indexOf(user);

        if (index === -1) {
            set_assignee([...assignee, user]);
        } else {
            set_assignee(assignee.filter((item, i) => index !== i));
        }
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
                        Edit your task
                    </Text>
                    <Flex
                        gap={12}
                        width={"full"}
                        height="full"
                        marginTop={12}
                        direction={{ sm: "row", base: "column" }}
                    >
                        <Box width={"full"} height={"full"}>
                            <form onSubmit={update_workspace}>
                                <FormItem
                                    value={title}
                                    set_value={set_title}
                                    check={(d) => !(has_sumbitted && !d)}
                                    title="Title"
                                    opacity="0"
                                    style={{ animationDelay: "120ms" }}
                                    animation={`${rise} 600ms ease-in-out forwards`}
                                    placeholder="Title for your new task..."
                                    helper_message="Task names so fly, they'll make Snoop
                                    Dogg nod in approval"
                                    type="text"
                                    error_message="Ever heard of non-existant todos?"
                                />
                                <FormItem
                                    marginTop={6}
                                    value={due_date}
                                    set_value={set_due_date}
                                    title="Due Date"
                                    opacity="0"
                                    style={{ animationDelay: "150ms" }}
                                    animation={`${rise} 600ms ease-in-out forwards`}
                                    placeholder=""
                                    check={(d) => {
                                        const parsed = moment(d);

                                        return (
                                            !has_sumbitted ||
                                            (parsed.isValid() &&
                                                parsed.isSameOrAfter(
                                                    moment.now()
                                                ))
                                        );
                                    }}
                                    helper_message="Due date? Time's a-ticking!"
                                    type="date"
                                    error_message="You can't just go back in time, you know"
                                />
                                <FormItem
                                    value={priority}
                                    title="Priority"
                                    marginTop={6}
                                    opacity="0"
                                    style={{ animationDelay: "180ms" }}
                                    animation={`${rise} 600ms ease-in-out forwards`}
                                    placeholder="Prioritize your tasks as number"
                                    set_value={set_priority}
                                    check={(d) => !(has_sumbitted && !(d > 0))}
                                    helper_message="Prioritize your tasks"
                                    type="number"
                                    error_message="Weird priority, might wanna double check that"
                                />
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
                                        onClick={update_workspace}
                                        color="#D8DEE9"
                                    >
                                        Update
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
                        <Box width="60%">
                            <Bold
                                opacity="0"
                                style={{ animationDelay: "240ms" }}
                                animation={`${rise} 600ms ease-in-out forwards`}
                            >
                                Assign members
                            </Bold>
                            <Flex direction="column" gap={4} marginTop={2}>
                                {members.map((m, i) => {
                                    return (
                                        <Flex
                                            opacity="0"
                                            style={{
                                                animationDelay: `${40 * i}ms`,
                                            }}
                                            animation={`${rise} 600ms ease-in-out forwards`}
                                            cursor={"pointer"}
                                            onClick={() =>
                                                toggle_assignee(m.userName)
                                            }
                                            key={m.$id}
                                            padding={5}
                                            gap={6}
                                            bg={
                                                assignee.includes(m.userName)
                                                    ? "#2E3440"
                                                    : "#dde0f2"
                                            }
                                            color={
                                                assignee.includes(m.userName)
                                                    ? "#dde0f2"
                                                    : "#2E3440"
                                            }
                                            borderRadius={"2xl"}
                                        >
                                            <Image
                                                src={
                                                    storage.getFilePreview(
                                                        "63dfd4b2bf3364da5f0c",
                                                        m.userName
                                                    ).href
                                                }
                                                borderRadius="full"
                                                height="12"
                                                alt="User profile"
                                            />
                                            <Box>
                                                <ExtraBold>
                                                    {m.userName}
                                                </ExtraBold>
                                                <Text>{m.userEmail}</Text>
                                            </Box>
                                        </Flex>
                                    );
                                })}
                            </Flex>
                        </Box>
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

export default EditTask;
