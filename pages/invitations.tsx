import Bold from "@components/Bold";
import ExtraBold from "@components/ExtraBold";
import SideBar from "@components/SideBar";
import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import moment from "moment";
import { useEffect, useState } from "react";
import { Check, Mail, Menu } from "react-feather";
import { account, database } from "src/utility";
import feathericons from "feather-icons";
import Link from "next/link";
import { rise } from "animations";
import InvitationsList from "@components/InvitationsList";
import { motion } from "framer-motion";
import Head from "next/head";

interface Invitation extends Models.Document {
    name: string;
    accept_url: string;
}

const Invitations = () => {
    const animatedelement = motion(Flex);
    const [expand, set_expand] = useState<boolean>(false);

    return (
        <Flex>
            <SideBar
                current="invitations"
                destroy_self={() => {
                    set_expand(false);
                }}
                expand={expand}
            />
            <Head>
                <title>Your invitations - planetary</title>
            </Head>
            <Box
                paddingLeft={{ sidebar_md: "400px", sm: "110px", base: 5 }}
                paddingRight={{ sm: 20, base: 4 }}
                marginTop={36}
                width="full"
            >
                <Flex
                    alignItems={"center"}
                    gap={5}
                    opacity={0}
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    <Box
                        display={{ sm: "none", base: "inherit" }}
                        onClick={() => set_expand(true)}
                    >
                        <Menu />
                    </Box>
                    <ExtraBold fontSize={{ sm: 28, base: 20 }}>
                        Invitations
                    </ExtraBold>
                </Flex>
                <Input
                    marginTop={3}
                    placeholder="Filter your invitations..."
                    bg="#dde0f2"
                    animation={`${rise} 300ms ease-in-out forwards`}
                    opacity={0}
                    style={{ animationDelay: "50ms" }}
                    width="full"
                    padding={6}
                />
                <InvitationsList animatedelement={animatedelement} />
            </Box>
        </Flex>
    );
};

export default Invitations;
