import {
    Box,
    Button,
    Flex,
    Image,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import Link from "next/link";
import moment from "moment";
import { ComponentType, useState } from "react";
import { Models } from "@pankod/refine-appwrite";
import { Check, Mail, X } from "react-feather";
import { database } from "src/utility";
import { rise } from "animations";
import { GetListResponse, useGetIdentity, useList } from "@pankod/refine-core";

interface Invitation extends Models.Document {
    name: string;
    accept_url: string;
}

interface InvitationsListProps {
    animatedelement: ComponentType<any>;
    identity: Models.Account<{}> | undefined;
    identityLoading: boolean;
    data: GetListResponse<Invitation> | undefined;
    isLoading: boolean;
    refetch: any;
}

const InvitationsList: React.FC<InvitationsListProps> = ({
    animatedelement: AnimatedElement,
    identity,
    identityLoading,
    data,
    isLoading,
    refetch,
}) => {
    // Show that the invitation is being removed
    const [removing, set_removing] = useState<string>("-");

    const remove_invitation = async (id: string) => {
        // Set removing
        set_removing(id);

        // Delete the document
        await database.deleteDocument(identity?.name ?? "", "invitations", id);

        // Refresh the data
        refetch();

        // Remove the loading icon
        set_removing("-");
    };

    return (
        <Flex direction="column" gap={5} marginTop={8}>
            {data?.data.map((n) => {
                return (
                    <AnimatedElement
                        key={n.id ?? Math.random().toString()}
                        bg="#dde0f2"
                        alignItems="center"
                        initial={{ opacity: 0, transform: "translateY(30px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        exit={{ opacity: 0, transform: "translateY(30px)" }}
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
                            marginLeft={"7"}
                            marginRight={13}
                            color="gray.600"
                            noOfLines={1}
                        >
                            {moment(n.$createdAt).fromNow()}
                        </Text>
                        <Flex gap={4} marginLeft={"auto"} borderRadius="lg">
                            <Button
                                bg="#d2d8f3"
                                paddingY={6}
                                paddingX={4}
                                width={{ sm: 32 }}
                                onClick={() => remove_invitation(n.id)}
                                _hover={{ bg: "#d2d8f3" }}
                                borderRadius="lg"
                            >
                                {removing == n.$id ? (
                                    <Spinner size={{ sm: "sm", base: "xs" }} />
                                ) : (
                                    <>
                                        <Text
                                            display={{
                                                sm: "inherit",
                                                base: "none",
                                            }}
                                        >
                                            Ignore
                                        </Text>
                                        <Box
                                            display={{
                                                base: "inherit",
                                                sm: "none",
                                            }}
                                        >
                                            <X />
                                        </Box>
                                    </>
                                )}
                            </Button>
                            <Link href={n.accept_url}>
                                <Button
                                    width={32}
                                    display={{ sm: "flex", base: "none" }}
                                    bg="#a6d3a6"
                                    _hover={{ bg: "#a6d3a6" }}
                                    padding={6}
                                    borderRadius="lg"
                                >
                                    Accept
                                </Button>
                                <Box
                                    display={{ base: "inherit", sm: "none" }}
                                    bg="#a6d3a6"
                                    _hover={{ bg: "#a6d3a6" }}
                                    padding={3}
                                    borderRadius="lg"
                                >
                                    <Check />
                                </Box>
                            </Link>
                        </Flex>
                    </AnimatedElement>
                );
            })}
            {isLoading ? (
                <Flex
                    width="full"
                    height="50vh"
                    alignItems={"center"}
                    animation={`${rise} 300ms ease-in-out forwards`}
                    justifyContent="center"
                >
                    <Spinner color="#2e3440" />
                </Flex>
            ) : data?.data.length == 0 ? (
                <Flex
                    width="full"
                    height="50vh"
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                    gap={6}
                >
                    <Image
                        src="/images/noinvitations.png"
                        width={24}
                        alt="No invitations"
                    />
                    <Text textAlign="center">
                        Well, this is awkward...there&apos;s no one asking you
                        to join their team.
                    </Text>
                </Flex>
            ) : (
                <></>
            )}
        </Flex>
    );
};

export default InvitationsList;
