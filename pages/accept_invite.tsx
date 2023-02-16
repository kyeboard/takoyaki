import Bold from "@components/Bold";
import InvitationError from "@components/InvitationError";
import SideBar from "@components/SideBar";
import { Flex, Image, Spinner, Text } from "@pankod/refine-chakra-ui";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { teams } from "src/utility";

const AcceptInvite = () => {
    const router = useRouter();
    const [error, set_error] = useState<string>("");

    useEffect(() => {
        if (!router.isReady) return;

        const accept_invite = async () => {
            try {
                await teams.updateMembershipStatus(
                    router.query.teamId as string,
                    router.query.membershipId as string,
                    router.query.userId as string,
                    router.query.secret as string
                );
            } catch (err: any) {
                set_error(err.message);
            }
        };

        accept_invite();
    }, [router]);

    const Container = motion(Flex);
    const AnimatedElement = motion(Flex);

    return (
        <Flex width="100vw" height="100vh">
            <AnimatePresence>
                {error && (
                    <InvitationError
                        error={error}
                        container={Container}
                        animatedelement={AnimatedElement}
                    />
                )}
            </AnimatePresence>
            <SideBar current="dashboard" />
            <Flex
                width="full"
                height="full"
                marginLeft="350px"
                alignItems="center"
                justifyContent="center"
                direction="column"
            >
                <Image width={24} src="/images/accept_invite.png" />
                <Flex gap={4} marginTop={4}>
                    <Spinner color="#2E3440" />
                    <Bold>Accepting the invitation...</Bold>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AcceptInvite;
