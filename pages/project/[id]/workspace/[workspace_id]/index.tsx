import SideBarProject from "@components/SideBarProject";
import { Nunito } from "@next/font/google";
import moment from "moment";
import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Input,
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

const font = Nunito({ subsets: ["latin"], weight: "800" });

const Todos = () => {
    const [todos, set_todos] = useState<Array<Todo>>([]);
    const [all_todos, set_all_todos] = useState<Array<Todo>>([]);
    const router = useRouter();
    const actions = ["all", "today", "tomorrow", "week", "month", "year"];

    useEffect(() => {
        const fetch_todos = async () => {
            // console.log();
            const todos = (
                await database.listDocuments<Todo>(
                    router.query.id as string,
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
            <SideBarProject current="todos" />
            <Box paddingY={40} paddingX={10} width="calc(100% - 350px)">
                <Text className={font.className} fontSize={30}>
                    Tasks
                </Text>
                <Flex gap={4} width="full" marginY={4}>
                    <Input
                        padding={6}
                        bg="#dde0f2"
                        placeholder="Search your todo..."
                    />
                    <Button
                        padding={6}
                        width="250px"
                        bg="#2E3440"
                        color="#dde0f2"
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
                        >
                            Today
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                        >
                            Tomorrow
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                        >
                            This week
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
                        >
                            This month
                        </Tab>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
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
                                >
                                    Title
                                </Th>
                                <Th borderBottomColor={"transparent"}>
                                    Due Date
                                </Th>
                                <Th borderBottomColor={"transparent"}>
                                    Assignee
                                </Th>
                                <Th
                                    borderBottomColor={"transparent"}
                                    borderRightRadius="xl"
                                >
                                    Priority
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {todos.map((t) => {
                                return (
                                    <Tr key={t.$id} bg="#dde0f2">
                                        <Td
                                            borderLeftRadius={"xl"}
                                            borderBottomColor={"transparent"}
                                        >
                                            {t.status ? (
                                                <Checkbox bg="#d2d8f3"></Checkbox>
                                            ) : (
                                                <Checkbox
                                                    bg="#d2d8f3"
                                                    borderColor={"#d2d8f3"}
                                                    borderRadius={"2xl"}
                                                />
                                            )}
                                        </Td>
                                        <Td borderBottomColor={"transparent"}>
                                            {t.title}
                                        </Td>
                                        <Td
                                            padding={5}
                                            borderBottomColor={"transparent"}
                                        >
                                            {moment(t.due_date).format(
                                                "MMMM Do YYYY"
                                            )}
                                        </Td>
                                        <Td borderBottomColor={"transparent"}>
                                            {t.assignee}
                                        </Td>
                                        <Td
                                            borderBottomColor={"transparent"}
                                            borderRightRadius={"xl"}
                                        >
                                            {t.priority}
                                        </Td>
                                    </Tr>
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
