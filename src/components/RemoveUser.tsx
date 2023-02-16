import { Button, Flex, Spinner, Text } from "@pankod/refine-chakra-ui";
import { rise } from "animations";
import { useRouter } from "next/router";
import { ComponentType, useState } from "react";
import { teams } from "src/utility";
import Bold from "./Bold";

interface RemoveUserProps {
    container: ComponentType<any>;
    animatedelement: ComponentType<any>;
    destroy_self: () => void;
    username: string;
    membership_id: string;
}

const RemoveUser: React.FC<RemoveUserProps> = ({
    container: Container,
    animatedelement: AnimatedElement,
    destroy_self,
    username,
    membership_id,
}) => {
    const [loading, set_loading] = useState<boolean>(false);
    const router = useRouter();

    const remove_member = async () => {
        set_loading(true);

        const membership = await teams.deleteMembership(
            router.query.id as string,
            membership_id
        );

        destroy_self();
    };

    return (
        <Container
            position={"fixed"}
            top={0}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            left={0}
            width="100vw"
            height={"100vh"}
            bg="rgba(46, 52, 64, 0.5)"
            zIndex={20000}
            backdropFilter={"auto"}
            backdropBlur="7px"
            alignItems={"center"}
            justifyContent="center"
        >
            <AnimatedElement
                width={"650px"}
                initial={{ opacity: 0, transform: "translateY(30px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(30px)" }}
                padding={8}
                borderRadius={"xl"}
                bg="#e6e6f2"
                height="fit-content"
                direction="column"
            >
                <Bold fontSize={16}>
                    Are you sure you want to remove {username}?
                </Bold>
                <Flex marginTop={8}>
                    <Button
                        width="full"
                        padding={6}
                        color="#BF616A"
                        opacity={0}
                        bg="transparent"
                        style={{ animationDelay: "150ms" }}
                        onClick={destroy_self}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        _hover={{ bg: "transparent" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        width="full"
                        style={{ animationDelay: "180ms" }}
                        animation={`${rise} 500ms ease-in-out forwards`}
                        padding={6}
                        opacity={0}
                        color="#D8DEE9"
                        bg="#2E3440"
                        onClick={remove_member}
                        _hover={{ bg: "#2E3440" }}
                    >
                        {loading ? <Spinner size={"sm"} /> : <Text>Ok</Text>}
                    </Button>
                </Flex>
            </AnimatedElement>
        </Container>
    );
};

export default RemoveUser;
