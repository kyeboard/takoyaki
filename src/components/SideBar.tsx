import { Flex, Image, Text, Box } from "@pankod/refine-chakra-ui";
import { BarChart2, Bell, Settings, Calendar, Inbox } from "react-feather";
import { QuickLink } from "./QuickLink";

interface SideBarProps {
    current: string;
}

const SideBar: React.FC<SideBarProps> = ({ current }) => {
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
                title="Projects"
                href="/dashboard"
                icon={<BarChart2 size={22} />}
                current={current === "dashboard"}
            />
            <QuickLink
                title="Notifications"
                href="/notifications"
                icon={<Bell size={22} />}
                current={current === "notifications"}
            />
            <QuickLink
                title="Invitations"
                href="/invitations"
                icon={<Inbox size={22} />}
                current={current === "invitations"}
            />
            <QuickLink
                title="Calendar"
                href="/calendar"
                icon={<Calendar size={22} />}
                current={current === "calendar"}
            />
            <QuickLink
                title="Settings"
                href="/settings"
                icon={<Settings size={22} />}
                current={current === "settings"}
            />
            <Flex marginTop="auto" gap={5} alignItems="center">
                <Image
                    src="https://www.kyeboard.me/profile.png"
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

export default SideBar;
