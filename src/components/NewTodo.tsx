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
    Text,
} from "@pankod/refine-chakra-ui";
import moment from "moment";
import { useEffect, useState } from "react";
import { storage, teams } from "src/utility";
import FormItem from "./FormItem";

const font = Nunito({ subsets: ["latin"], weight: "800" });
const font_bold = Nunito({ subsets: ["latin"], weight: "700" });

const NewTask = () => {
    const [members, set_members] = useState<Array<Models.Membership>>([]);
    const [title, set_title] = useState<string>("");
    const [date, set_date] = useState<string>("");
    const [priority, set_priority] = useState<number>(0);

    const [assignee, set_assignee] = useState<Array<string>>(["0xsapphir3"]);

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
                (await teams.listMemberships("63e89f329f780a476204"))
                    .memberships
            );
        };

        fetch_data();
    }, []);

    return (
        <Flex
            width="100vw"
            height="100vh"
            position={"fixed"}
            top="0"
            left="0"
            bg="rgba(47, 53, 65, 0.5)"
            zIndex={2000}
            backdropFilter="auto"
            backdropBlur="6px"
        >
            <Box
                width="100vw"
                height="90vh"
                bg="#e7e7f2"
                marginTop="auto"
                padding={10}
                borderTopRadius={"xl"}
            >
                <Text
                    className={font.className}
                    textAlign="center"
                    fontSize={34}
                >
                    Create a new todo
                </Text>
                <Flex marginTop={14} gap={20}>
                    <Box width="60%">
                        <form>
                            <Flex direction="column" gap={5}>
                                <FormItem
                                    value={title}
                                    set_value={set_title}
                                    check={(d) => d}
                                    title="Title"
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
                                    placeholder=""
                                    check={(d) => {
                                        const parsed = moment(d);

                                        return (
                                            parsed.isValid() &&
                                            parsed.isSameOrAfter(moment.now())
                                        );
                                    }}
                                    helper_message="Due date? Time's a-ticking!"
                                    type="date"
                                    error_message="You can't just go back in time, you know"
                                />
                                <FormItem
                                    value={priority}
                                    title="Priority"
                                    placeholder="Prioritize your tasks as number"
                                    set_value={set_priority}
                                    check={(d) => d > 0}
                                    helper_message="Prioritize your tasks"
                                    type="number"
                                    error_message="Weird priority, might wanna double check that"
                                />
                            </Flex>
                            <Button
                                type="submit"
                                width="full"
                                padding={6}
                                marginTop={6}
                                bg="#2E3440"
                                color="#D8DEE9"
                                _hover={{ bg: "#2E3440" }}
                            >
                                Create new task
                            </Button>
                        </form>
                    </Box>
                    <Box width="40%">
                        <Text className={font_bold.className}>
                            Assign members
                        </Text>
                        <Flex direction="column" gap={4} marginTop={2}>
                            {members.map((m) => {
                                return (
                                    <Flex
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
            </Box>
        </Flex>
    );
};

export default NewTask;
