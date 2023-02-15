import { Nunito } from "@next/font/google";
import { Models } from "@pankod/refine-appwrite";
import { Box, Button, Flex, Image, Text } from "@pankod/refine-chakra-ui";
import { rise, rise_reverse } from "animations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "react-feather";
import { account, storage } from "src/utility";

interface NavBarProps {
    user: boolean;
}

const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const NavBar: React.FC<NavBarProps> = ({ user }) => {
    const [open_dropdown, set_open_dropdown] = useState<boolean>(false);

    const google_oauth = async () => {
        account.createOAuth2Session(
            "google",
            window.location.href + "dashboard"
        );
    };
    const [current_user, set_current_user] =
        useState<Models.Account<{}> | null>(null);

    useEffect(() => {
        // const fetch_user = async () => {
        //     set_current_user(await account.get());
        // };
        // fetch_user();
    }, [set_current_user]);

    return (
        <Flex
            height={28}
            zIndex={1000}
            backdropFilter={"auto"}
            backdropBlur="5px"
            bg="rgba(231, 231, 242, 0.5)"
            paddingRight={{ sm: 16, base: 6 }}
            alignItems={"center"}
            position="fixed"
            width={"100vw"}
        >
            <Link href="/">
                <Flex
                    bg="#dde0f2"
                    paddingLeft={"20%"}
                    width="350px"
                    height={28}
                    alignItems={"center"}
                    gap={5}
                >
                    <Image
                        width={{ sm: 50, base: 42 }}
                        src="/images/logo.png"
                        alt="logo"
                    />
                    <Text fontSize={18}>Planetary</Text>
                </Flex>
            </Link>
            <Flex
                marginX={"auto"}
                gap={{ sm: 10, base: 6 }}
                position={{ sm: "relative", base: "absolute" }}
                width={{ sm: "fit-content", base: "100vw" }}
                height={{
                    sm: "fit-content",
                    base: open_dropdown ? "100vh" : "0vh",
                }}
                overflow="hidden"
                direction={{ sm: "row", base: "column" }}
                textAlign={{ sm: "start", base: "center" }}
                top={{ sm: 0, base: 32 }}
                animation={
                    open_dropdown
                        ? `${rise_reverse} 500ms ease-in-out forwards`
                        : ""
                }
                left={0}
                color="#2E3440"
                bg="rgb(231, 231 ,242)"
            >
                <Link href="/" replace>
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Home
                    </Button>
                </Link>
                <Link href="/dashboard" replace>
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Dashboard
                    </Button>
                </Link>
                <Link href="/changelog" replace>
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Changelog
                    </Button>
                </Link>
                <Link href="https://www.kyeboard.me/contact" replace>
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Contact
                    </Button>
                </Link>
            </Flex>
            {current_user ? (
                <Link href="/settings" replace>
                    <Flex gap={4}>
                        <Image
                            src={
                                storage.getFilePreview(
                                    "63dfd4b2bf3364da5f0c",
                                    current_user.name
                                ).href
                            }
                            width={12}
                            alt={"User pfp"}
                            borderRadius="full"
                        />
                        <Box>
                            <Text className={nunito.className}>
                                {current_user.name}
                            </Text>
                            <Text color="gray.600">{current_user.email}</Text>
                        </Box>
                    </Flex>
                </Link>
            ) : (
                <Button
                    bg="#dce0f3"
                    display={{ sm: "inherit", base: "none" }}
                    padding={6}
                    onClick={google_oauth}
                    width={"150px"}
                    _hover={{ bg: "#dce0f3" }}
                >
                    Login
                </Button>
            )}
            <Flex marginLeft="auto" display={{ sm: "none", base: "flex" }}>
                <Menu onClick={() => set_open_dropdown(true)} />
            </Flex>
        </Flex>
    );
};

export default NavBar;
