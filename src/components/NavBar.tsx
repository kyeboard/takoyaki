import { Nunito } from "@next/font/google";
import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Button,
    Flex,
    Image,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import { useAuthenticated } from "@pankod/refine-core";
import { rise, rise_reverse } from "animations";
import Link from "next/link";
import { useRouter } from "next/router";
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
    const { isLoading, isError, refetch } = useAuthenticated();
    const [logging_out, set_logging_out] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (isError) {
            router.push("/");
        }
    }, [isError]);

    const toggle_auth = async () => {
        if (isError) {
            account.createOAuth2Session(
                "google",
                window.location.href + "dashboard"
            );
        } else {
            set_logging_out(true);

            await account.deleteSession("current");

            set_logging_out(false);

            router.push("/");

            refetch();
        }
    };

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
                color="#2E3440"
                bg="rgb(231, 231 , 242)"
            >
                <Link href="/">
                    <Button
                        onClick={() => set_open_dropdown(false)}
                        bg={"transparent"}
                        _hover={{ bg: "#dce0f3" }}
                    >
                        Home
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button
                        onClick={() => set_open_dropdown(false)}
                        bg={"transparent"}
                        _hover={{ bg: "#dce0f3" }}
                    >
                        Dashboard
                    </Button>
                </Link>
                <Link href="/features">
                    <Button
                        onClick={() => set_open_dropdown(false)}
                        bg={"transparent"}
                        _hover={{ bg: "#dce0f3" }}
                    >
                        Features
                    </Button>
                </Link>
                <Link href="https://www.github.com/kyeboard/planetary/releases">
                    <Button
                        onClick={() => set_open_dropdown(false)}
                        bg={"transparent"}
                        _hover={{ bg: "#dce0f3" }}
                    >
                        Changelog
                    </Button>
                </Link>
                <Link href="mailto:me@kyeboard.me">
                    <Button
                        onClick={() => set_open_dropdown(false)}
                        bg={"transparent"}
                        _hover={{ bg: "#dce0f3" }}
                    >
                        Contact
                    </Button>
                </Link>
            </AnimatedElement>
            <Button
                bg="#dce0f3"
                display={{ sm: "inherit", base: "none" }}
                padding={6}
                onClick={toggle_auth}
                width={"150px"}
                _hover={{ bg: "#dce0f3" }}
            >
                {isLoading ? (
                    <Spinner size="sm" />
                ) : isError ? (
                    <Text>Login</Text>
                ) : !logging_out ? (
                    <Text>Logout</Text>
                ) : (
                    <Spinner size="sm" />
                )}
            </Button>
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
