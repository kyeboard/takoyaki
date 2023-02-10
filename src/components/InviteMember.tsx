import { Nunito } from "@next/font/google";
import { Box, Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";
import { useState } from "react";
import { Check, Mail, Plus } from "react-feather";

const font = Nunito({ subsets: ["latin"], weight: "700" });

const InviteMember = () => {
    const [members, set_members] = useState<Array<string>>([
        "me.kyeboard@gmail.com",
    ]);
    const [new_member, set_new_member] = useState<string>("");
    const [sending, toggle_sending] = useState<boolean>(false);

    const add_member = () => {
        members.push(new_member);

        set_new_member("");
    };

    return (
        <Flex
            width="100vw"
            height="100vh"
            position={"fixed"}
            top={0}
            left={0}
            bg="rgba(46, 52, 64, 0.6)"
            backdropFilter="auto"
            backdropBlur="6px"
            zIndex={20}
        >
            <Box
                width={"500px"}
                borderLeftRadius="2xl"
                height="100vh"
                marginLeft={"auto"}
                bg="#e7e7f2"
                padding={7}
            >
                <Text
                    className={font.className}
                    fontSize={24}
                    textAlign="center"
                >
                    Invite member
                </Text>
                <Flex gap={5} marginTop={8}>
                    <Input
                        placeholder="Enter email address..."
                        bg="#dde0f2"
                        padding={6}
                        value={new_member}
                        onChange={(e) => set_new_member(e.target.value)}
                    />
                    <Button
                        _hover={{ bg: "#2E3440" }}
                        padding={6}
                        bg="#2E3440"
                        onClick={add_member}
                        color="#e7e7f2"
                    >
                        {new_member ? <Plus /> : <Check />}
                    </Button>
                </Flex>
                <Box marginTop={10}>
                    {members.map((e) => {
                        return (
                            <Flex
                                marginTop={2}
                                borderRadius={"lg"}
                                gap={4}
                                key={e}
                                bg="#DCE0F3"
                                padding={5}
                            >
                                <Mail />
                                <Text>{e}</Text>
                            </Flex>
                        );
                    })}
                </Box>
            </Box>
        </Flex>
    );
};

export default InviteMember;
