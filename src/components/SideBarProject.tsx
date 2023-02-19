import { Flex, Image, Text, Box } from "@pankod/refine-chakra-ui";
import { useGetIdentity } from "@pankod/refine-core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    Settings,
    Folder,
    MessageSquare,
    Users,
    Video,
    Key,
    X,
} from "react-feather";
import { account } from "src/utility";
import { QuickLink } from "./QuickLink";

interface SideBarProps {
    current: string;
    expand?: boolean;
    destroy_self?: () => void;
}

const SideBarProject: React.FC<SideBarProps> = ({
    current,
    expand,
    destroy_self,
}) => {
    const { data: user, isError } = useGetIdentity();
    const router = useRouter();

    useEffect(() => {
        if (isError) {
            router.push("/");
        }
    }, [isError]);

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
                    <Box display={{ sidebar_md: "initial", base: "none" }}>
                        <Text>Purple Light</Text>
                        <Text color="gray.500" fontSize={13}>
                            me@kyeboard.me
                        </Text>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
};

SideBarProject.defaultProps = {
    expand: false,
    destroy_self: () => {},
};

export default SideBarProject;
