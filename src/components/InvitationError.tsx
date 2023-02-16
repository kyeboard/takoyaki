import { Button, Flex } from "@pankod/refine-chakra-ui";
import { rise } from "animations";
import { useRouter } from "next/router";
import { ComponentType } from "react";
import Bold from "./Bold";

interface InvitationErrorProps {
    error: string;
    container: ComponentType<any>;
    animatedelement: ComponentType<any>;
}

const InvitationError: React.FC<InvitationErrorProps> = ({
    error,
    container: Container,
    animatedelement: AnimatedElement,
}) => {
    const router = useRouter();

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
                <Bold fontSize={18}>{error}</Bold>
                <Button
                    width="full"
                    marginTop={4}
                    style={{ animationDelay: "180ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    padding={6}
                    opacity={0}
                    color="#D8DEE9"
                    bg="#2E3440"
                    onClick={() => router.push("/dashboard")}
                    _hover={{ bg: "#2E3440" }}
                >
                    Go back to dashboard
                </Button>
            </AnimatedElement>
        </Container>
    );
};

export default InvitationError;
