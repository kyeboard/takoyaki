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

interface Invitation extends Models.Document {
    name: string;
    accept_url: string;
}

const Invitations = () => {
    const [invitations, set_invitations] = useState<Array<Invitation>>([]);
    const [loading, set_loading] = useState<boolean>(true);

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
        const current_user = await account.get();

        await database.deleteDocument(current_user.name, "invitations", id);

        set_invitations(invitations.filter((f) => f.$id !== id));
    };

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
            </Box>
        </Flex>
    );
};

export default Invitations;
