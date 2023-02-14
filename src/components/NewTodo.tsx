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
    Text,
} from "@pankod/refine-chakra-ui";
import moment from "moment";
import { FormEvent, useEffect, useState } from "react";
import { X } from "react-feather";
import { database, storage, teams } from "src/utility";
import FormItem from "./FormItem";

const font = Nunito({ subsets: ["latin"], weight: "800" });
const font_bold = Nunito({ subsets: ["latin"], weight: "700" });

interface NewTaskProps {
    close: () => void;
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

const NewTask: React.FC<NewTaskProps> = ({ close }) => {
    const [members, set_members] = useState<Array<Models.Membership>>([]);
    const [title, set_title] = useState<string>("");
    const [date, set_date] = useState<string>("");
    const [priority, set_priority] = useState<number>(0);
    const [has_sumbitted, set_has_sumbitted] = useState<boolean>(false);

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

    const handle_sumbit = async (e: FormEvent<HTMLFormElement>) => {
        // Prevent default behaviour
        e.preventDefault();

        // Set has sumbitted
        set_has_sumbitted(true);

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
            "63e89f329f780a476204",
            "todos",
            "unique()",
            {
                title,
                due_date: date,
                priority,
                status: false,
                assignee,
                category: "63e89f329f780a476204",
            }
        );
    };

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
            animation={`${unfade} 500ms ease-in-out forwards`}
        >
            <Box
                width="100vw"
                height="90vh"
                bg="#e7e7f2"
                marginTop="auto"
                opacity="0"
                style={{ animationDelay: "50ms" }}
                animation={`${rise} 600ms ease-in-out forwards`}
                padding={10}
                position="relative"
                borderTopRadius={"xl"}
            >
                <Box
                    onClick={close}
                    position={"absolute"}
                    right={8}
                    top={8}
                    cursor="pointer"
                >
                    <X />
                </Box>
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
                                Create new task
                            </Button>
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
            </Box>
        </Flex>
    );
};

export default NewTask;
