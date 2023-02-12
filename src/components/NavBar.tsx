import { Nunito } from "@next/font/google";
import { Models } from "@pankod/refine-appwrite";
import { Box, Button, Flex, Heading, Image, Text } from "@pankod/refine-chakra-ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { account, storage } from "src/utility";

interface NavBarProps {
    user: boolean
}

const nunito = Nunito({ subsets: ["latin"], weight: "800" })

const NavBar: React.FC<NavBarProps> = ({ user }) => {
    const google_oauth = async () => {
        account.createOAuth2Session(
            "google",
            window.location.href + "dashboard"
        );
    };
    const [current_user, set_current_user] = useState<Models.Account<{}> | null>(null);

    useEffect(() => {
        const fetch_user = async () => {
            set_current_user(await account.get())
        }

        fetch_user()
    }, [set_current_user])

    console.log(current_user)

    return (
        <Flex
            padding={8}
            zIndex={1000}
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
            {
                current_user ? (
                    <Flex gap={4}>
                        <Image src={storage.getFilePreview("63dfd4b2bf3364da5f0c", current_user.name).href} width={12} borderRadius="full" />
                        <Box>
                            <Text className={nunito.className}>{current_user.name}</Text>
                            <Text color="gray.600">{current_user.email}</Text>
                        </Box>
                    </Flex>
                ) : (
                    <Button
                        bg="#dce0f3"
                        padding={6}
                        onClick={google_oauth}
                        width={"150px"}
                        _hover={{ bg: "#dce0f3" }}
                    >
                        Login
                    </Button>

                )
            }
        </Flex>
    );
};

export default NavBar;
