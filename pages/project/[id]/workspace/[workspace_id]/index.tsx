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
    const router = useRouter();

    useEffect(() => {
        const fetch_todos = async () => {
            // console.log();
            set_todos(
                (
                    await database.listDocuments<Todo>(
                        router.query.id as string,
                        "todos"
                    )
                ).documents
            );
        };

        fetch_todos();
    });

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
                <Tabs marginTop={5}>
                    <TabList gap={6}>
                        <Tab
                            _selected={{
                                borderBottomColor: "#2E3440",
                                borderBottomWidth: "2px",
                                transition: "border-bottom 0.2s",
                            }}
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
                <TableContainer marginTop={5}>
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
                                    padding={7}
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
