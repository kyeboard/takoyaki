import SideBarProject from "@components/SideBarProject";
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Text,
} from "@pankod/refine-chakra-ui";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { storage, teams } from "src/utility";
import type { Models } from "@pankod/refine-appwrite";
import InviteMember from "@components/InviteMember";
import { Nunito } from "@next/font/google";

const font = Nunito({ subsets: ["latin"], weight: "800" });
const font_700 = Nunito({ subsets: ["latin"], weight: "700" });

const Members = () => {
    const [members, set_members] = useState<Array<Models.Membership>>([]);
    const router = useRouter();

    useEffect(() => {
        const fetch_data = async () => {
            const { id } = router.query;

            if (!id) return;

            set_members(
                (await teams.listMemberships(id as string)).memberships
            );
        };

        fetch_data();
    }, [router.query]);

    return (
        <Flex width="100vw" height="100vh">
            {/* <InviteMember /> */}
            <SideBarProject current="members" />
            <Box marginTop={32} marginX={20} width="full">
                <Text className={font.className} fontSize={36}>
                    Members
                </Text>
                <Flex gap={5} width="full" marginTop={3}>
                    <Input
                        placeholder="Filter your members..."
                        bg="#DCE0F3"
                        width={"full"}
                        padding={7}
                    />
                    <Button
                        padding={7}
                        width={"220px"}
                        bg="#2E3440"
                        color="#D8DEE9"
                    >
                        <Text>Invite member</Text>
                    </Button>
                </Flex>
                <Flex marginTop={5}>
                    {members.map((m) => {
                        return (
                            <Box
                                key={m.$id}
                                bg="#dde0f2"
                                padding={3}
                                width={"400px"}
                                borderRadius="2xl"
                            >
                                <Flex
                                    padding={5}
                                    bg="#d2d8f3"
                                    alignItems={"center"}
                                    borderRadius={"2xl"}
                                >
                                    <Image
                                        width={14}
                                        borderRadius="full"
                                        src={
                                            storage.getFilePreview(
                                                "63dfd4b2bf3364da5f0c",
                                                m.userName
                                            ).href
                                        }
                                        alt={"User profile"}
                                    />
                                    <Box marginLeft={4}>
                                        <Text
                                            className={font.className}
                                            fontSize={18}
                                        >
                                            {m.userName}
                                        </Text>
                                        <Text color="gray.500">
                                            {m.userEmail}
                                        </Text>
                                    </Box>
                                </Flex>
                                <Flex padding={4} gap={2}>
                                    <Text className={font_700.className}>
                                        Joined:{" "}
                                    </Text>
                                    <Text color="gray.600">
                                        {moment(m.joined).format(
                                            "Do MMMM YYYY"
                                        )}
                                    </Text>
                                </Flex>
                                <hr
                                    style={{
                                        marginLeft: "20px",
                                        marginRight: "20px",
                                        borderColor: "#7181a2",
                                    }}
                                />
                                <Button
                                    width="full"
                                    marginTop={2}
                                    _hover={{ bg: "transparent" }}
                                    bg="transparent"
                                    color="#BF616A"
                                >
                                    Remove
                                </Button>
                            </Box>
                        );
                    })}
                </Flex>
            </Box>
        </Flex>
    );
};

export default Members;
