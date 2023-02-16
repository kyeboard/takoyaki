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
import NewMember from "@components/NewMember";
import ExtraBold from "@components/ExtraBold";
import { AnimatePresence, motion } from "framer-motion";
import Bold from "@components/Bold";
import RemoveUser from "@components/RemoveUser";

const Members = () => {
    const [members, set_members] = useState<Array<Models.Membership>>([]);
    const router = useRouter();
    const [show_new_member, set_show_new_member] = useState<boolean>(false);
    const [del_user, set_del_user] = useState<{
        username: string;
        membership_id: string;
    }>();
    const [show_remove_member, set_show_remove_member] =
        useState<boolean>(false);

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

    const container = motion(Flex);
    const animatedelement = motion(Flex);

    return (
        <Flex width="cacl(100vw - 300px)" height="100vh" marginLeft={"300px"}>
            <AnimatePresence>
                {show_new_member && (
                    <NewMember
                        container={container}
                        animatedelement={animatedelement}
                        destroy_self={() => set_show_new_member(false)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {show_remove_member && (
                    <RemoveUser
                        membership_id={del_user?.membership_id as string}
                        username={del_user?.username as string}
                        container={container}
                        animatedelement={animatedelement}
                        destroy_self={() => set_show_remove_member(false)}
                    />
                )}
            </AnimatePresence>
            <SideBarProject current="members" />
            <Box marginTop={36} marginX={20} width="full">
                <ExtraBold fontSize={36}>Members</ExtraBold>
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
                        _hover={{ bg: "#2E3440" }}
                        color="#D8DEE9"
                        onClick={() => set_show_new_member(true)}
                    >
                        <Text>Invite member</Text>
                    </Button>
                </Flex>
                <Flex marginTop={5} gap={6}>
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
                                        <ExtraBold fontSize={18}>
                                            {m.userName}
                                        </ExtraBold>
                                        <Text color="gray.500">
                                            {m.userEmail}
                                        </Text>
                                    </Box>
                                </Flex>
                                <Flex padding={4} gap={2}>
                                    <Bold>Joined: </Bold>
                                    <Text color="gray.600">
                                        {moment(m.joined).isValid()
                                            ? moment(m.joined).format(
                                                  "Do MMMM YYYY"
                                              )
                                            : "Invitation pending"}
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
                                    onClick={() => {
                                        set_del_user({
                                            username: m.userName,
                                            membership_id: m.$id,
                                        });

                                        set_show_remove_member(true);
                                    }}
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
