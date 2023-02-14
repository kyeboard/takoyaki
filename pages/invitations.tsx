import Bold from "@components/Bold";
import ExtraBold from "@components/ExtraBold";
import SideBar from "@components/SideBar";
import { Models } from "@pankod/refine-appwrite";
import { Box, Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";
import moment from "moment";
import { useEffect, useState } from "react";
import { Check, Mail } from "react-feather";
import { database } from "src/utility";
import feathericons from "feather-icons";

interface Invitation extends Models.Document {
    name: string;
    accept_url: string;
}

const Invitations = () => {
    const [invitations, set_invitations] = useState<Array<Invitation>>([]);

    useEffect(() => {
        const fetch_data = async () => {
            set_invitations(
                (
                    await database.listDocuments<Invitation>(
                        "0xsapphir3",
                        "63eb97da4abaa754af8f"
                    )
                ).documents
            );
        };

        fetch_data();
    }, []);

    return (
        <Flex>
            <SideBar current="invitations" />
            <Box
                paddingLeft={"400px"}
                paddingRight={20}
                marginTop={36}
                width="full"
            >
                <ExtraBold fontSize={34}>Invitations</ExtraBold>
                <Input
                    marginTop={3}
                    placeholder="Filter your invitations..."
                    bg="#dde0f2"
                    width="full"
                    padding={6}
                />
                <Flex direction="column" gap={5} marginTop={8}>
                    {invitations.map((n) => {
                        return (
                            <Flex
                                key={n.$id}
                                bg="#dde0f2"
                                alignItems="center"
                                padding={3}
                                borderRadius="lg"
                            >
                                <Flex
                                    bg="#d2d8f3"
                                    padding={3}
                                    justifyContent="center"
                                    alignItems={"center"}
                                    borderRadius="full"
                                >
                                    <Mail size={20} />
                                </Flex>
                                <Text marginLeft={6}>{n.name}</Text>
                                <Text
                                    marginLeft={"4"}
                                    marginRight={10}
                                    color="gray.600"
                                >
                                    {moment(n.$createdAt).format(
                                        "MMMM Do YYYY"
                                    )}
                                </Text>
                                <Flex
                                    gap={4}
                                    marginLeft={"auto"}
                                    borderRadius="lg"
                                >
                                    <Button
                                        bg="#d2d8f3"
                                        padding={6}
                                        width={32}
                                        _hover={{ bg: "#d2d8f3" }}
                                        borderRadius="lg"
                                    >
                                        Ignore
                                    </Button>
                                    <Button
                                        width={32}
                                        bg="#a6d3a6"
                                        _hover={{ bg: "#a6d3a6" }}
                                        padding={6}
                                        borderRadius="lg"
                                    >
                                        Accept
                                    </Button>
                                </Flex>
                            </Flex>
                        );
                    })}
                </Flex>
            </Box>
        </Flex>
    );
};

export default Invitations;
