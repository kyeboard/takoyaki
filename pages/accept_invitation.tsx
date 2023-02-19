import InvitationError from "@components/InvitationError";
import SideBar from "@components/SideBar";
import { Flex, Image, Spinner, Text } from "@pankod/refine-chakra-ui";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { account, database } from "src/utility";

const AcceptInvitation = () => {
    const router = useRouter();
    const [error, set_error] = useState<string>("");

    useEffect(() => {
        if (!router.isReady) return;

        const accept_invite = async () => {
            const current_user = await account.get();

            // Check if it exists
            try {
                await database.updateDocument(
                    current_user.name,
                    "invitations",
                    router.query.teamId as string,
                    {
                        status: true,
                    }
                );

                router.push("/dashboard");
            } catch (err) {
                set_error("Invalid invitation!");
            }
        };

        accept_invite();
    }, [router]);

    const AnimatedElement = motion(Flex);
    const AnimatedContainer = motion(Flex);

    return (
        <Flex>
            <SideBar current="dashboard" destroy_self={() => {}} />
            <AnimatePresence>
                {error && (
                    <InvitationError
                        error={error}
                        container={AnimatedContainer}
                        animatedelement={AnimatedElement}
                    />
                )}
            </AnimatePresence>
            <Flex
                alignItems={"center"}
                width="calc(100vw - 400px)"
                height="100vh"
                justifyContent="center"
                marginLeft={"400px"}
                direction="column"
            >
                <Image
                    src="/images/accept_invite.png"
                    width={20}
                    alt="Accept invite icon"
                />
                <Flex gap={6} marginTop={4}>
                    <Spinner />
                    <Text>Accepting the invite...</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AcceptInvitation;
