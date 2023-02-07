import { Button, Flex, Heading, Image, Text } from "@pankod/refine-chakra-ui";
import Link from "next/link";
import { account } from "src/utility";

const NavBar = () => {
    const google_oauth = async () => {
        account.createOAuth2Session(
            "google",
            window.location.href + "dashboard"
        );
    };

    return (
        <Flex
            padding={8}
            paddingX={16}
            alignItems={"center"}
            position="fixed"
            width={"100vw"}
        >
            <Flex alignItems={"center"} gap={5}>
                <Image width={50} src="/images/logo.png" alt="logo" />
                <Text fontSize={18}>Planetary</Text>
            </Flex>
            <Flex marginX={"auto"} gap={10}>
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
                <Link href="/changelog">
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Changelog
                    </Button>
                </Link>
                <Link href="https://www.kyeboard.me/contact">
                    <Button bg={"transparent"} _hover={{ bg: "#dce0f3" }}>
                        Contact
                    </Button>
                </Link>
            </Flex>
            <Button
                bg="#dce0f3"
                padding={6}
                onClick={google_oauth}
                width={"150px"}
                _hover={{ bg: "#dce0f3" }}
            >
                Login
            </Button>
        </Flex>
    );
};

export default NavBar;
