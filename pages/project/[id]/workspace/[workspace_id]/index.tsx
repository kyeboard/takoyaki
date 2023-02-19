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
import { database, storage } from "src/utility";
import { Check, Edit, Plus, X } from "react-feather";
import EditTask from "@components/EditTask";
import Head from "next/head";
import { useList } from "@pankod/refine-core";

interface Todo extends Models.Document {
    status: boolean;
    title: string;
    due_date: string;
    assignee: string[];
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
    const router = useRouter();
    const [popup_state, set_popup_state] = useState<boolean>(false);
    const [edit_state, set_edit_state] = useState<string>("-");
    const [filter, set_filter] = useState<string>("");
    const [completing, set_completing] = useState<string>("-");

    const {
        data: todos,
        isLoading: loading,
        refetch,
    } = useList<Todo>({
        resource: `todos-${router.query.id}`,
        config: {
            sort: [
                {
                    field: "due_date",
                    order: "asc",
                },
            ],
            filters: [
                {
                    field: "category",
                    operator: "eq",
                    value: router.query.workspace_id,
                },
            ],
        },
    });

    const MotionFlex = motion(Flex);
    const Container = motion(Flex);
    const AnimatedElement = motion(Flex);

    const complete_todo = async (id: string) => {
        set_completing(id);

        await database.updateDocument(router.query.id as string, "todos", id, {
            completed: true,
        });

        refetch();

        set_completing("-");
    };

    return (
        <Flex
            marginLeft={{ sidebar_md: "350px", sm: "110px", base: 0 }}
            width="full"
        >
            <Head>
                <title>Your tasks</title>
            </Head>
            <AnimatePresence>
                {popup_state && (
                    <NewTask
                        afterAll={refresh}
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
                        afterAll={refetch}
                        container={Container}
                        animatedelement={AnimatedElement}
                        todo_id={edit_state}
                    />
                )}
            </AnimatePresence>
            <SideBarProject current="todos" />
            <Box
                paddingY={{ sm: 40, base: 32 }}
                paddingX={{ sm: 10, base: 4 }}
                width={{
                    sidebar_md: "calc(100% - 350px)",
                    sm: "calc(100% - 110px)",
                    base: "calc(100%)",
                }}
            >
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
                        onChange={(e) => set_filter(e.target.value)}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        placeholder="Searching for a needle in haystack? Start here..."
                    />
                    <Button
                        padding={6}
                        width={{ sm: "250px", base: "50px" }}
                        _hover={{ bg: "#2E3440" }}
                        bg="#2E3440"
                        onClick={() => set_popup_state(true)}
                        color="#dde0f2"
                        style={{ animationDelay: "30ms" }}
                        opacity={0}
                        animation={`${rise} 500ms ease-in-out forwards`}
                    >
                        <Text display={{ sm: "inherit", base: "none" }}>
                            Create new task
                        </Text>
                        <Box display={{ sm: "none", base: "inherit" }}>
                            <Plus />
                        </Box>
                    </Button>
                </Flex>
                {todos?.total ?? 0 > 0 ? (
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
                                {todos?.data.map((t, i) => {
                                    if (!t.title.includes(filter)) return;

                                    return (
                                        <AnimatePresence key={t.id}>
                                            <Tr
                                                bg={
                                                    moment(
                                                        moment.now()
                                                    ).isAfter(
                                                        moment(t.due_date).add(
                                                            1,
                                                            "day"
                                                        )
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
                                                    <Flex alignItems="center">
                                                        {t.title}
                                                        <Flex
                                                            marginLeft={3}
                                                            bg="#a6d3a6"
                                                            padding={1}
                                                            paddingX={4}
                                                            fontSize="sm"
                                                            display={
                                                                t.completed
                                                                    ? "flex"
                                                                    : "none"
                                                            }
                                                            borderRadius={
                                                                "full"
                                                            }
                                                        >
                                                            Completed
                                                        </Flex>
                                                    </Flex>
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
                                                    <Flex
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        {t.assignee
                                                            .slice(0, 2)
                                                            .map((a, i) => {
                                                                return (
                                                                    <Image
                                                                        src={
                                                                            storage.getFilePreview(
                                                                                "63dfd4b2bf3364da5f0c",
                                                                                a
                                                                            )
                                                                                .href
                                                                        }
                                                                        transform={`translateX(-${
                                                                            10 *
                                                                            i
                                                                        }px)`}
                                                                        width={
                                                                            10
                                                                        }
                                                                        borderRadius="full"
                                                                        border="solid"
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor="#2E3440"
                                                                        alt="User profile"
                                                                        key={Math.random().toString()}
                                                                    />
                                                                );
                                                            })}
                                                        {t.assignee.length >
                                                            2 && (
                                                            <Flex
                                                                minW={10}
                                                                minH={10}
                                                                bg="#2E3440"
                                                                color="#D8DEE9"
                                                                borderRadius={
                                                                    "full"
                                                                }
                                                                transform={
                                                                    "translateX(-20px)"
                                                                }
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                +
                                                                {t.assignee
                                                                    .length - 2}
                                                            </Flex>
                                                        )}
                                                    </Flex>
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
                                                        set_edit_state(t.id)
                                                    }
                                                >
                                                    <Edit size={19} />
                                                </Td>
                                                <Td
                                                    borderBottomColor={
                                                        "transparent"
                                                    }
                                                    cursor="pointer"
                                                    onClick={() =>
                                                        complete_todo(t.id)
                                                    }
                                                    paddingX={4}
                                                    paddingRight={6}
                                                    borderRightRadius={"xl"}
                                                >
                                                    {completing == t.id ? (
                                                        <Spinner size="sm" />
                                                    ) : !t.completed ? (
                                                        <Check size={20} />
                                                    ) : (
                                                        <></>
                                                    )}
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
                            textAlign="center"
                            paddingX={{ base: 4, sm: 0 }}
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
