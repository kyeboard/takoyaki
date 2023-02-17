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
import { Check, Mail } from "react-feather";
import { account, database } from "src/utility";
import feathericons from "feather-icons";
import Link from "next/link";
import { rise } from "animations";
import InvitationsList from "@components/InvitationsList";
import { motion } from "framer-motion";

interface Invitation extends Models.Document {
    name: string;
    accept_url: string;
}

const Invitations = () => {
    const animatedelement = motion(Flex);

    return (
        <Flex>
            <SideBar current="invitations" />
            <Box
                paddingLeft={"400px"}
                paddingRight={20}
                marginTop={36}
                width="full"
            >
                <ExtraBold
                    fontSize={34}
                    animation={`${rise} 300ms ease-in-out forwards`}
                    opacity={0}
                >
                    Invitations
                </ExtraBold>
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
