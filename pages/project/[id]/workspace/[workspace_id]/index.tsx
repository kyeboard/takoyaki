import SideBarProject from "@components/SideBarProject";
import NewTask from "@components/NewTodo";
import { Miltonian, Nunito } from "@next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Image,
    Input,
    keyframes,
    Spinner,
    Tab,
    Table,
    TableContainer,
    TabList,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@pankod/refine-chakra-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { database } from "src/utility";
import { Check, Edit, X } from "react-feather";
import EditTask from "@components/EditTask";

interface Todo extends Models.Document {
    status: boolean;
    title: string;
    due_date: string;
    assignee: string;
    priority: number;
}

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

const fallDown = keyframes`
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(20px);
        opacity: 0;
    }
`;

const complete = keyframes`
    0% {
        scale: 1;
        opacity: 0
        background-color: #dde0f2;
    }
    50% {
        scale: 1.02;
        opacity: 1;
        background-color: #a6d3a6;
    }
    0% {
        scale: 0;
        opacity: 0
        background-color: #dde0f2;
    }
`;

const font = Nunito({ subsets: ["latin"], weight: "800" });

const Todos = () => {
    const [todos, set_todos] = useState<Array<Todo>>([]);
    const [loading, set_loading] = useState<boolean>(true);
    const [all_todos, set_all_todos] = useState<Array<Todo>>([]);
    const router = useRouter();
    const actions = ["all", "today", "tomorrow", "week", "month", "year"];
    const [popup_state, set_popup_state] = useState<boolean>(false);
    const [edit_state, set_edit_state] = useState<string>("-");

    useEffect(() => {
        if (!router.isReady) return;

        const fetch_todos = async () => {
            const todos = (
                await database.listDocuments<Todo>(
                    router.query.id as string,
                    "todos"
                )
            ).documents;

            set_all_todos(todos);

            set_todos(todos);

            set_loading(false);
        };

        fetch_todos();
    }, [router]);

    const filter_with_difference = (
        key: moment.unitOfTime.Diff
    ): Array<Todo> => {
        const filter_todos: Todo[] = [];
        const today = moment(moment.now());

        for (const todo of all_todos) {
            const due_date_moment = moment(todo.due_date);

            if (due_date_moment.isSame(today, key)) {
                filter_todos.push(todo);
            }
        }

        return filter_todos;
    };

    const filter_todos = (key: string) => {
        const today = moment(moment.now());
        const tomorrow = moment(moment.now()).add(1, "day");
        const end_week = moment(moment.now()).endOf("week");
        const end_month = moment(moment.now()).endOf("month");
        const end_year = moment(moment.now()).endOf("month");

        switch (key) {
            case "all":
                set_todos(all_todos);
                break;

            case "today":
                set_todos(
                    all_todos.filter((t) =>
                        moment(t.due_date).isSame(today, "day")
                    )
                );
                break;

            case "tomorrow":
                set_todos(
                    all_todos.filter((t) =>
                        moment(t.due_date).isSame(tomorrow, "day")
                    )
                );
                break;

            case "week":
                set_todos(
                    all_todos.filter(
                        (t) =>
                            moment(t.due_date).isSameOrAfter(today) &&
                            moment(t.due_date).isSameOrBefore(end_week)
                    )
                );
                break;

            case "month":
                set_todos(
                    all_todos.filter(
                        (t) =>
                            moment(t.due_date).isSameOrAfter(today) &&
                            moment(t.due_date).isSameOrBefore(end_month)
                    )
                );
                break;

            case "year":
                set_todos(
                    all_todos.filter(
                        (t) =>
                            moment(t.due_date).isSameOrAfter(today) &&
                            moment(t.due_date).isSameOrBefore(end_year)
                    )
                );
                break;

            default:
        }
    };

    const MotionFlex = motion(Flex);
    const Container = motion(Flex);
    const AnimatedElement = motion(Flex);

    return (
        <Flex marginLeft={"350px"} width="full">
            <AnimatePresence>
                {popup_state && (
                    <NewTask
                        container={Container}
                        animatedelement={AnimatedElement}
                        close={() => set_popup_state(false)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {edit_state !== "-" && (
                    <EditTask
                        destroy_self={() => set_edit_state("-")}
                        container={Container}
                        animatedelement={AnimatedElement}
                        todo_id={edit_state}
                    />
                )}
            </AnimatePresence>
            <SideBarProject current="todos" />
            <Box paddingY={40} paddingX={10} width="calc(100% - 350px)">
                <Text
                    className={font.className}
                    fontSize={34}
                    opacity={0}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    Tasks
                </Text>
                <Flex gap={4} width="full" marginY={4}>
                    <Input
                        padding={6}
                        bg="#dde0f2"
                        style={{ animationDelay: "10ms" }}
                        opacity={0}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        placeholder="Searching for a needle in haystack? Start here..."
                    />
                    <Button
                        padding={6}
                        width="250px"
                        _hover={{ bg: "#2E3440" }}
                        bg="#2E3440"
                        onClick={() => set_popup_state(true)}
                        color="#dde0f2"
                        style={{ animationDelay: "30ms" }}
                        opacity={0}
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        Create new task
                    </Button>
                </Flex>
                <Tabs
                    marginTop={5}
                    onChange={(index) => filter_todos(actions[index])}
                >
                    <TabList gap={6}>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                            style={{ animationDelay: "30ms" }}
                            opacity={0}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            onSelect={() => filter_todos("today")}
                        >
                            All tasks
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                            style={{ animationDelay: "50ms" }}
                            opacity={0}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            Today
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                            style={{ animationDelay: "70ms" }}
                            opacity={0}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            Tomorrow
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                            style={{ animationDelay: "90ms" }}
                            opacity={0}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            This week
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                            style={{ animationDelay: "110ms" }}
                            opacity={0}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            This month
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                            style={{ animationDelay: "130ms" }}
                            opacity={0}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            This year
                        </Tab>
                    </TabList>
                </Tabs>
                {todos.length > 0 ? (
                    <TableContainer marginTop={2}>
                        <Table
                            variant="simple"
                            style={{
                                borderCollapse: "separate",
                                borderSpacing: "0px 15px",
                            }}
                        >
                            <Thead>
                                <Tr>
                                    <Th
                                        borderBottomColor={"transparent"}
                                        width={"full"}
                                        borderLeftRadius={"xl"}
                                        style={{ animationDelay: "100ms" }}
                                        opacity={0}
                                        animation={`${rise} 500ms ease-in-out forwards`}
                                    >
                                        Title
                                    </Th>
                                    <Th
                                        borderBottomColor={"transparent"}
                                        style={{ animationDelay: "130ms" }}
                                        opacity={0}
                                        animation={`${rise} 500ms ease-in-out forwards`}
                                    >
                                        Due Date
                                    </Th>
                                    <Th
                                        borderBottomColor={"transparent"}
                                        style={{ animationDelay: "160ms" }}
                                        opacity={0}
                                        animation={`${rise} 500ms ease-in-out forwards`}
                                    >
                                        Assignee
                                    </Th>
                                    <Th
                                        borderBottomColor={"transparent"}
                                        borderRightRadius="xl"
                                        style={{ animationDelay: "190ms" }}
                                        opacity={0}
                                        animation={`${rise} 500ms ease-in-out forwards`}
                                    >
                                        Priority
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {todos.map((t, i) => {
                                    return (
                                        <AnimatePresence key={t.$id}>
                                            <Tr
                                                bg={
                                                    moment(
                                                        moment.now()
                                                    ).isAfter(
                                                        moment(t.due_date)
                                                    )
                                                        ? "rgba(243, 139, 168, 0.1)	"
                                                        : "#dde0f2"
                                                }
                                                style={{
                                                    animationDelay: `${
                                                        10 * i
                                                    }ms`,
                                                }}
                                                opacity={0}
                                                _before={{
                                                    exit: {
                                                        animation: `${fallDown} 0.2s ease-in-out`,
                                                    },
                                                }}
                                                animation={`${rise} 500ms ease-in-out forwards`}
                                            >
                                                <Td
                                                    borderBottomColor={
                                                        "transparent"
                                                    }
                                                    borderLeftRadius={"xl"}
                                                >
                                                    {t.title}
                                                </Td>
                                                <Td
                                                    padding={5}
                                                    borderBottomColor={
                                                        "transparent"
                                                    }
                                                >
                                                    {moment(t.due_date).format(
                                                        "MMMM Do YYYY"
                                                    )}
                                                </Td>
                                                <Td
                                                    borderBottomColor={
                                                        "transparent"
                                                    }
                                                >
                                                    {t.assignee}
                                                </Td>
                                                <Td
                                                    borderBottomColor={
                                                        "transparent"
                                                    }
                                                >
                                                    {t.priority}
                                                </Td>
                                                <Td
                                                    borderBottomColor={
                                                        "transparent"
                                                    }
                                                    paddingX={2}
                                                    cursor="pointer"
                                                    onClick={() =>
                                                        set_edit_state(t.$id)
                                                    }
                                                >
                                                    <Edit size={19} />
                                                </Td>
                                                <Td
                                                    borderBottomColor={
                                                        "transparent"
                                                    }
                                                    cursor="pointer"
                                                    paddingX={4}
                                                    paddingRight={6}
                                                    borderRightRadius={"xl"}
                                                >
                                                    <Check size={20} />
                                                </Td>
                                            </Tr>
                                        </AnimatePresence>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                ) : loading == false ? (
                    <MotionFlex
                        w="full"
                        h="full"
                        justifyContent={"center"}
                        alignItems="center"
                        direction="column"
                        initial={{
                            opacity: 0,
                            transform: "translateY(30px)",
                        }}
                        animate={{
                            opacity: 1,
                            transform: "translateY(0px)",
                        }}
                        exit={{ opacity: 0, transform: "translateY(30px)" }}
                    >
                        <Image
                            src="/images/empty.png"
                            height={24}
                            width={24}
                            opacity={0}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            alt="No tasks to do!"
                        />
                        <Text
                            opacity={0}
                            style={{ animationDelay: "50ms" }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            marginTop={5}
                        >
                            When there&apos;s nothing on the to-do list, the day
                            is your oyster!
                        </Text>
                    </MotionFlex>
                ) : (
                    <Flex
                        width="full"
                        height="full"
                        alignItems={"center"}
                        justifyContent="center"
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        <Spinner color="#2E3440" />
                    </Flex>
                )}
            </Box>
        </Flex>
    );
};

export default Todos;
