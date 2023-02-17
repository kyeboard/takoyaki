import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import { rise } from "animations";
import { useRouter } from "next/router";
import { ComponentType, useState } from "react";
import { teams } from "src/utility";
import Bold from "./Bold";
import ExtraBold from "./ExtraBold";
import FormItem from "./FormItem";

interface NewMemberProps {
    container: ComponentType<any>;
    animatedelement: ComponentType<any>;
    destroy_self: () => void;
}

const NewMember: React.FC<NewMemberProps> = ({
    container: Container,
    animatedelement: AnimatedElement,
    destroy_self,
}) => {
    const [email, set_email] = useState<string>("");
    const [sumbitted, set_sumbitted] = useState<boolean>(false);
    const [loading, set_loading] = useState<boolean>(false);
    const router = useRouter();

    const invite_member = async () => {
        set_loading(true);

        await teams.createMembership(
            router.query.id as string,
            email,
            [],
            `${window.location.origin}/accept_invite`
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
                <ExtraBold
                    fontSize={28}
                    opacity={0}
                    align="center"
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    Invite a new member
                </ExtraBold>
                <form style={{ marginTop: 24 }}>
                    <FormControl>
                        <FormItem
                            style={{ animationDelay: "100ms" }}
                            animation={`${rise} 500ms ease-in-out forwards`}
                            value={email}
                            opacity={0}
                            set_value={set_email}
                            check={(d) => !(sumbitted && !d)}
                            helper_message="Your new member's email address..."
                            error_message="Uh, i dont think this is a correct email tbh"
                            placeholder="Email address..."
                            type="email"
                            title="Email address"
                        />
                        <Flex marginTop={6}>
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
                                onClick={invite_member}
                                _hover={{ bg: "#2E3440" }}
                            >
                                {loading ? (
                                    <Spinner size={"sm"} />
                                ) : (
                                    <Text>Create</Text>
                                )}
                            </Button>
                        </Flex>
                    </FormControl>
                </form>
            </AnimatedElement>
        </Container>
    );
};

export default NewMember;
