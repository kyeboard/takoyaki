import SideBarProject from "@components/SideBarProject";
import { Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";
import { account } from "src/utility";
import { Models } from "@pankod/refine-appwrite";
import { useEffect, useState } from "react";
import { Nunito } from "@next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const font = Nunito({ subsets: ["latin"], weight: "800" });

const DashBoard = () => {
    const [user, set_user] = useState<Models.Account<{}> | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetch_user = async () => {
            set_user(await account.get());
        };

        fetch_user();
    }, []);

    return (
        <Flex>
            <SideBarProject current={"todos"} />
            <Flex
                width={"calc(100% - 350px)"}
                direction="column"
                paddingX={14}
                paddingTop={40}
            >
                <Text fontSize={24} className={font.className}>
                    Hello, {user?.name}!
                </Text>
                <Flex gap={5} marginTop={4} width="full">
                    <Input
                        width="full"
                        bg="#dde0f2"
                        padding={6}
                        placeholder="Search for your workspaces..."
                    />
                    <Link href={`/project/${router.query.id}/workspace/new`}>
                        <Button
                            width="300px"
                            padding={6}
                            bg="#2E3440"
                            color="#D8DEE9"
                            _hover={{ bg: "#2E3440" }}
                        >
                            Create new workspace
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DashBoard;
