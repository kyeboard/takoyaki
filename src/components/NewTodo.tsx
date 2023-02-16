import { Nunito } from "@next/font/google";
import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Image,
    Input,
    keyframes,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import moment from "moment";
import { useRouter } from "next/router";
import { ComponentType, FormEvent, useEffect, useState } from "react";
import { X } from "react-feather";
import { database, storage, teams } from "src/utility";
import FormItem from "./FormItem";

const font = Nunito({ subsets: ["latin"], weight: "800" });
const font_bold = Nunito({ subsets: ["latin"], weight: "700" });

interface NewTaskProps {
    close: () => void;
    container: ComponentType<any>;
    animatedelement: ComponentType<any>;
}

const unfade = keyframes`
    0% {
        opacity: 0.5
    }
    100% {
        opacity: 1
    }
`;

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

const NewTask: React.FC<NewTaskProps> = ({
    close,
    container: Container,
    animatedelement: AnimatedElement,
}) => {
    const [members, set_members] = useState<Array<Models.Membership>>([]);
    const [title, set_title] = useState<string>("");
    const [date, set_date] = useState<string>("");
    const [loading, set_loading] = useState<boolean>(false);
    const [priority, set_priority] = useState<number>(0);
    const [has_sumbitted, set_has_sumbitted] = useState<boolean>(false);
    const router = useRouter();

    const [assignee, set_assignee] = useState<Array<string>>([]);

    const toggle_assignee = (user: string) => {
        const index = assignee.indexOf(user);

        if (index === -1) {
            set_assignee([...assignee, user]);
        } else {
            set_assignee(assignee.filter((item, i) => index !== i));
        }
    };

    useEffect(() => {
        const fetch_data = async () => {
            set_members(
                (await teams.listMemberships(router.query.id as string))
                    .memberships
            );
        };

        fetch_data();
    }, []);

    const handle_sumbit = async (e: FormEvent<HTMLFormElement>) => {
        // Prevent default behaviour
        e.preventDefault();

        // Set has sumbitted
        set_has_sumbitted(true);
        set_loading(true)

        // Parse the input date
        const parsed_date = moment(date);

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

        // Create a new todo
        await database.createDocument(
            router.query.id as string,
            "todos",
            "unique()",
            {
                title,
                due_date: date,
                priority,
                assignee,
                category: router.query.workspace_id as string,
            }
        );

        set_loading(false);

        close();
    };

    return (
        <Container
            width="100vw"
            height="100vh"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            bg="rgba(47, 53, 65, 0.5)"
            position={"fixed"}
            top="0"
            left="0"
            zIndex={2000}
            backdropFilter="auto"
            backdropBlur="6px"
        >
            <AnimatedElement
                width="100vw"
                minHeight="90vh"
                bg="#e7e7f2"
                marginTop="10vh"
                opacity="0"
                direction="column"
                initial={{ opacity: 0, transform: "translateY(30px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(30px)" }}
                padding={10}
                borderTopRadius={"xl"}
            >
                <Text
                    className={font.className}
                    textAlign="center"
                    fontSize={34}
                    opacity="0"
                    style={{ animationDelay: "80ms" }}
                    animation={`${rise} 300ms ease-in-out forwards`}
                >
                    Create a new todo
                </Text>
                <Flex marginTop={14} gap={20}>
                    <Box width="60%">
                        <form onSubmit={handle_sumbit}>
                            <Flex direction="column" gap={5}>
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
                                    value={date}
                                    set_value={set_date}
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
                                                parsed.isAfter(moment.now()))
                                        );
                                    }}
                                    helper_message="Due date? Time's a-ticking!"
                                    type="date"
                                    error_message="You can't just go back in time, you know"
                                />
                                <FormItem
                                    value={priority}
                                    title="Priority"
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
                            </Flex>
                            <Flex>
                                <Button
                                    type="submit"
                                    width="full"
                                    padding={6}
                                    marginTop={6}
                                    color="#BF616A"
                                    opacity="0"
                                    onClick={close}
                                    bg="transparent"
                                    style={{ animationDelay: "210ms" }}
                                    animation={`${rise} 600ms ease-in-out forwards`}
                                    _hover={{ bg: "transparent" }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    width="full"
                                    padding={6}
                                    marginTop={6}
                                    bg="#2E3440"
                                    opacity="0"
                                    style={{ animationDelay: "210ms" }}
                                    animation={`${rise} 600ms ease-in-out forwards`}
                                    color="#D8DEE9"
                                    _hover={{ bg: "#2E3440" }}
                                >
                                    Create
                                </Button>
                            </Flex>
                        </form>
                    </Box>
                    <Box width="40%">
                        <Text
                            className={font_bold.className}
                            opacity="0"
                            style={{ animationDelay: "240ms" }}
                            animation={`${rise} 600ms ease-in-out forwards`}
                        >
                            Assign members
                        </Text>
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
                                            <Text className={font.className}>
                                                {m.userName}
                                            </Text>
                                            <Text>{m.userEmail}</Text>
                                        </Box>
                                    </Flex>
                                );
                            })}
                        </Flex>
                    </Box>
                </Flex>
                {loading ? (
                    <Flex
                        position={"fixed"}
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
                        fontSize={18}
                        gap={5}
                        color="#D8DEE9"
                        alignItems={"center"}
                        justifyContent="center"
                    >
                        <Spinner color="#D8DEE9" />
                    </Flex>
                ) : (
                    <></>
                )}
            </AnimatedElement>
        </Container>
    );
};

export default NewTask;
