import { Flex, Image, Text, Box, keyframes } from "@pankod/refine-chakra-ui";
import { useEffect, useState } from "react";
import {
    BarChart2,
    Bell,
    Settings,
    Calendar,
    Inbox,
    Menu,
    X,
} from "react-feather";
import { account, storage } from "src/utility";
import { QuickLink } from "./QuickLink";

interface SideBarProps {
    current: string;
    expand?: boolean;
    destroy_self: () => void;
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

const SideBar: React.FC<SideBarProps> = ({ current, expand, destroy_self }) => {
    const [user, set_user] = useState<any>(null);

    useEffect(() => {
        const fetch_user = async () => {
            set_user(await account.get());
        };

        fetch_user();
    }, [set_user]);

    return (
        <Flex
            position={"fixed"}
            height={"100vh"}
            color="#2E3440"
            padding={3}
            left={0}
            top={0}
            bg="#dde0f2"
            display={{ sm: "flex", base: expand ? "flex" : "none" }}
            zIndex={{ sm: 100, base: expand ? 20000 : 0 }}
            alignItems="center"
            paddingTop={{ sm: 36 }}
            width={{ sm: "90px", sidebar_md: "350px", base: "100vw" }}
        >
            <Flex
                display={{ sm: "flex", base: expand ? "flex" : "none" }}
                flexDirection={"column"}
                height="full"
                left={0}
                width={{ base: "full" }}
            >
                <Flex display={{ sm: "none", base: "flex" }}>
                    <Box marginLeft={"auto"} padding={4} onClick={destroy_self}>
                        <X />
                    </Box>
                </Flex>
                <QuickLink
                    title="Projects"
                    href="/dashboard"
                    icon={<BarChart2 size={22} />}
                    delay={0}
                    current={current === "dashboard"}
                />
                <QuickLink
                    title="Notifications"
                    href="/notifications"
                    icon={<Bell size={22} />}
                    delay={30}
                    current={current === "notifications"}
                />
                <QuickLink
                    title="Invitations"
                    delay={60}
                    href="/invitations"
                    icon={<Inbox size={22} />}
                    current={current === "invitations"}
                />
                <Flex
                    marginTop="auto"
                    gap={5}
                    width="full"
                    height={{ sm: "fit-content", base: "full" }}
                    paddingX={3}
                    paddingBottom={3}
                    alignItems="center"
                    opacity={0}
                    style={{ animationDelay: "140ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    <Image
                        src={
                            storage.getFilePreview(
                                "63dfd4b2bf3364da5f0c",
                                (user ?? { name: "" }).name as string
                            ).href
                        }
                        width={14}
                        borderRadius={"full"}
                        alt="Test User"
                    />
                    <Box
                        marginRight="auto"
                        display={{ sidebar_md: "initial", sm: "none" }}
                    >
                        <Text>{(user ?? { name: "" }).name}</Text>
                        <Text color="gray.500" fontSize={14}>
                            {(user ?? { email: "" }).email}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
};

SideBar.defaultProps = {
    expand: false,
    destroy_self: () => {},
};

export default SideBar;
