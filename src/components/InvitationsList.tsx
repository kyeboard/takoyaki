import { Button, Flex, Image, Spinner, Text } from "@pankod/refine-chakra-ui";
import Link from "next/link";
import moment from "moment";
import { ComponentType, useEffect, useState } from "react";
import { Models } from "@pankod/refine-appwrite";
import { Mail } from "react-feather";
import { account, database } from "src/utility";
import { rise } from "animations";

interface Invitation extends Models.Document {
    name: string;
    accept_url: string;
}

interface InvitationsListProps {
    animatedelement: ComponentType<any>;
}

const InvitationsList: React.FC<InvitationsListProps> = ({
    animatedelement: AnimatedElement,
}) => {
    const [invitations, set_invitations] = useState<Array<Invitation>>([]);
    const [loading, set_loading] = useState<boolean>(true);
    const [removing, set_removing] = useState<string>("-");

    useEffect(() => {
        const fetch_data = async () => {
            const current_user = await account.get();

            set_invitations(
                (
                    await database.listDocuments<Invitation>(
                        current_user.name,
                        "invitations"
                    )
                ).documents
            );

            set_loading(false);
        };

        fetch_data();
    }, []);

    const remove_invitation = async (id: string) => {
        set_removing(id);

        const current_user = await account.get();

        await database.deleteDocument(current_user.name, "invitations", id);

        set_invitations(invitations.filter((f) => f.$id !== id));

        set_removing("-");
    };

    return (
        <Flex direction="column" gap={5} marginTop={8}>
            {invitations.map((n) => {
                return (
                    <AnimatedElement
                        key={n.$id}
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
                        >
                            {moment(n.$createdAt).fromNow()}
                        </Text>
                        <Flex gap={4} marginLeft={"auto"} borderRadius="lg">
                            <Button
                                bg="#d2d8f3"
                                padding={6}
                                width={32}
                                onClick={() => remove_invitation(n.$id)}
                                _hover={{ bg: "#d2d8f3" }}
                                borderRadius="lg"
                            >
                                {removing == n.$id ? (
                                    <Spinner size="sm" />
                                ) : (
                                    <Text>Ignore</Text>
                                )}
                            </Button>
                            <Link href={n.accept_url}>
                                <Button
                                    width={32}
                                    bg="#a6d3a6"
                                    _hover={{ bg: "#a6d3a6" }}
                                    padding={6}
                                    borderRadius="lg"
                                >
                                    Accept
                                </Button>
                            </Link>
                        </Flex>
                    </AnimatedElement>
                );
            })}
            {loading ? (
                <Flex
                    width="full"
                    height="50vh"
                    alignItems={"center"}
                    animation={`${rise} 300ms ease-in-out forwards`}
                    justifyContent="center"
                >
                    <Spinner color="#2e3440" />
                </Flex>
            ) : invitations.length == 0 ? (
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
                    <Text>
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
