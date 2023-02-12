import { Flex, Image, Text, Box } from "@pankod/refine-chakra-ui";
import { useRouter } from "next/router";
import {
    BarChart2,
    Bell,
    Settings,
    Calendar,
    Inbox,
    Folder,
    MessageSquare,
    Users,
    Video,
} from "react-feather";
import { account } from "src/utility";
import { QuickLink } from "./QuickLink";

interface SideBarProps {
    current: string;
}

const SideBarProject: React.FC<SideBarProps> = ({ current }) => {
    const router = useRouter();

    return (
        <Flex
            flexDirection={"column"}
            bg="#dde0f2"
            height="100vh"
            color="#2E3440"
            padding={6}
            paddingTop={36}
            width={"350px"}
        >
            <QuickLink
                title="To-Dos"
                delay={10}
                href={`/project/${router.query.id}`}
                icon={<Folder size={22} />}
                current={current === "todos"}
            />
            <QuickLink
                title="Team chat"
                href={`/project/${router.query.id}/chat`}
                delay={40}
                icon={<MessageSquare size={22} />}
                current={current === "chat"}
            />
            <QuickLink
                title="Events"
                delay={70}
                href={`/project/${router.query.id}/events`}
                icon={<Video size={22} />}
                current={current === "events"}
            />
            <QuickLink
                title="Members"
                delay={100}
                href={`/project/${router.query.id}/members`}
                icon={<Users size={22} />}
                current={current === "members"}
            />
            <QuickLink
                title="Settings"
                delay={130}
                href={`/project/${router.query.id}/settings`}
                icon={<Settings size={22} />}
                current={current === "settings"}
            />
            <Flex marginTop="auto" gap={5} alignItems="center">
                <Image
                    src="https://avatars.githubusercontent.com/u/115910279?v=4"
                    width="14"
                    borderRadius={"full"}
                    alt="Test User"
                />
                <Box>
                    <Text>Purple Light</Text>
                    <Text color="gray.500" fontSize={13}>
                        me@kyeboard.me
                    </Text>
                </Box>
                <Text marginLeft="auto" fontSize={20} color="gray.500">
                    ...
                </Text>
            </Flex>
        </Flex>
    );
};

export default SideBarProject;
