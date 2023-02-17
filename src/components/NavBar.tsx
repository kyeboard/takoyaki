import { Nunito } from "@next/font/google";
import { Models } from "@pankod/refine-appwrite";
import { Box, Button, Flex, Image, Text } from "@pankod/refine-chakra-ui";
import { rise, rise_reverse } from "animations";
import Link from "next/link";
import { ComponentType, useEffect, useState } from "react";
import { Menu, X } from "react-feather";
import { account, storage } from "src/utility";

interface NavBarProps {
    user: boolean;
    animatedelement: ComponentType<any>;
}

const nunito = Nunito({ subsets: ["latin"], weight: "800" });

const NavBar: React.FC<NavBarProps> = ({
    user,
    animatedelement: AnimatedElement,
}) => {
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
            padding={8}
            top={0}
            zIndex={1000}
            backdropFilter={"auto"}
            backdropBlur="5px"
            bg="rgba(231, 231, 242, 0.5)"
            paddingX={{ sm: 16, base: 6 }}
            alignItems={"center"}
            position="fixed"
            width={"100vw"}
        >
            <Link href="/">
                <Flex alignItems={"center"} gap={5}>
                    <Image
                        width={{ sm: 50, base: 42 }}
                        src="/images/logo.png"
                        alt="logo"
                    />
                    <Text fontSize={18}>Planetary</Text>
                </Flex>
            </Link>
            <AnimatedElement
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
                paddingTop={{ sm: "0px", base: open_dropdown ? 10 : 0 }}
                top={{ sm: 0, base: 24 }}
                initial={{
                    base: { opacity: 0, transform: "translateY(30px)" },
                }}
                animate={{ base: { opacity: 1, transform: "translateY(0px)" } }}
                exit={{ base: { opacity: 0, transform: "translateY(30px)" } }}
                left={0}
                transition={{ duration: "0.5s" }}
                color="#2E3440"
                bg="rgb(231, 231 , 242)"
            >
                <Link href="/">
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Home
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Dashboard
                    </Button>
                </Link>
                <Link href="/features">
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Features
                    </Button>
                </Link>
                <Link href="https://www.github.com/kyeboard/planetary/releases">
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Changelog
                    </Button>
                </Link>
                <Link href="mailto:me@kyeboard.me">
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Contact
                    </Button>
                </Link>
            </AnimatedElement>
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
                {open_dropdown ? (
                    <X onClick={() => set_open_dropdown(false)} />
                ) : (
                    <Menu onClick={() => set_open_dropdown(true)} />
                )}
            </Flex>
        </Flex>
    );
};

export default NavBar;
