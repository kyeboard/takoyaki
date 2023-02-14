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
    Input,
    keyframes,
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

const font = Nunito({ subsets: ["latin"], weight: "800" });

const Todos = () => {
    const [todos, set_todos] = useState<Array<Todo>>([]);
    const [all_todos, set_all_todos] = useState<Array<Todo>>([]);
    const router = useRouter();
    const actions = ["all", "today", "tomorrow", "week", "month", "year"];
    const [popup_state, set_popup_state] = useState<boolean>(true);

    useEffect(() => {
        const fetch_todos = async () => {
            const todos = (
                await database.listDocuments<Todo>(
                    "63e89f329f780a476204",
                    // router.query.id as string,
                    "todos"
                )
            ).documents;

            set_all_todos(todos);

            set_todos(todos);
        };

        fetch_todos();
    }, []);

    const filter_with_difference = (
        key: moment.unitOfTime.Diff,
        value: number
    ): Array<Todo> => {
        const filter_todos: Todo[] = [];
        const today = moment(moment.now());

        for (const todo of all_todos) {
            const due_date_moment = moment(todo.due_date);

            if (due_date_moment.diff(today, key) == value) {
                filter_todos.push(todo);
            }
        }

        return filter_todos;
    };

    const filter_todos = (key: string) => {
        switch (key) {
            case "all":
                set_todos(all_todos);
                break;

            case "today":
                set_todos(filter_with_difference("days", 0));
                break;

            case "tomorrow":
                set_todos(filter_with_difference("days", 1));
                break;

            case "week":
                set_todos(filter_with_difference("weeks", 0));
                break;

            case "month":
                const filter_todos: Todo[] = [];
                const today = moment(moment.now());

                for (const todo of all_todos) {
                    const due_date_moment = moment(todo.due_date);

                    if (today.get("month") == due_date_moment.get("month")) {
                        filter_todos.push(todo);
                    }
                }

                set_todos(filter_todos);
                break;

            case "year":
                const filter_todos2: Todo[] = [];
                const today2 = moment(moment.now());

                for (const todo of all_todos) {
                    const due_date_moment = moment(todo.due_date);

                    if (today2.get("year") == due_date_moment.get("year")) {
                        filter_todos2.push(todo);
                    }
                }

                set_todos(filter_todos2);
                break;

            default:
        }
    };

    return (
        <Flex>
            {popup_state ? (
                <NewTask close={() => set_popup_state(false)} />
            ) : (
                <></>
            )}
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
                            style={{ animationDelay: "60ms" }}
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
                            style={{ animationDelay: "90ms" }}
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
                            style={{ animationDelay: "120ms" }}
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
                            style={{ animationDelay: "150ms" }}
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
                            style={{ animationDelay: "180ms" }}
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
                            style={{ animationDelay: "210ms" }}
                            opacity={0}
                            animation={`${rise} 500ms ease-in-out forwards`}
                        >
                            This year
                        </Tab>
                    </TabList>
                </Tabs>
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
                                    padding={3}
                                    borderLeftRadius="xl"
                                    borderBottomColor={"transparent"}
                                    width={"50px"}
                                ></Th>
                                <Th
                                    borderBottomColor={"transparent"}
                                    width={"full"}
                                    style={{ animationDelay: "180ms" }}
                                    opacity={0}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                >
                                    Title
                                </Th>
                                <Th
                                    borderBottomColor={"transparent"}
                                    style={{ animationDelay: "210ms" }}
                                    opacity={0}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                >
                                    Due Date
                                </Th>
                                <Th
                                    borderBottomColor={"transparent"}
                                    style={{ animationDelay: "240ms" }}
                                    opacity={0}
                                    animation={`${rise} 500ms ease-in-out forwards`}
                                >
                                    Assignee
                                </Th>
                                <Th
                                    borderBottomColor={"transparent"}
                                    borderRightRadius="xl"
                                    style={{ animationDelay: "270ms" }}
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
                                            bg="#dde0f2"
                                            style={{
                                                animationDelay: `${30 * i}ms`,
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
                                                borderLeftRadius={"xl"}
                                                borderBottomColor={
                                                    "transparent"
                                                }
                                            >
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        transform:
                                                            "translateY(-10px)",
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        transform:
                                                            "translateY(0px)",
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        transform:
                                                            "translate(10px)",
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                >
                                                    {t.status ? (
                                                        <Checkbox bg="#d2d8f3"></Checkbox>
                                                    ) : (
                                                        <Checkbox
                                                            bg="#d2d8f3"
                                                            borderColor={
                                                                "#d2d8f3"
                                                            }
                                                            borderRadius={"2xl"}
                                                        />
                                                    )}
                                                </motion.div>
                                            </Td>
                                            <Td
                                                borderBottomColor={
                                                    "transparent"
                                                }
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
                                                borderRightRadius={"xl"}
                                            >
                                                {t.priority}
                                            </Td>
                                        </Tr>
                                    </AnimatePresence>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Flex>
    );
};

export default Todos;
