import { Flex, Image, Text, Box } from "@pankod/refine-chakra-ui";
import { useEffect, useState } from "react";
import { BarChart2, Bell, Settings, Calendar, Inbox } from "react-feather";
import { account, storage } from "src/utility";
import { QuickLink } from "./QuickLink";

interface SideBarProps {
    current: string;
}

const SideBar: React.FC<SideBarProps> = ({ current }) => {
    const [user, set_user] = useState<any>(null);

    useEffect(() => {
        const fetch_user = async () => {
            set_user(await account.get());
        };

        fetch_user();
    }, [set_user]);

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
                    src={
                        storage.getFilePreview(
                            "63dfd4b2bf3364da5f0c",
                            (user ?? { name: "" }).name
                        ).href
                    }
                    width="60px"
                    borderRadius={"full"}
                    alt="Test User"
                />
                <Box>
                    <Text>{(user ?? { name: "" }).name}</Text>
                    <Text color="gray.500" fontSize={13}>
                        {(user ?? { email: "" }).email}
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
