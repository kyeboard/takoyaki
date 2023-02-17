import Bold from "@components/Bold";
import ExtraBold from "@components/ExtraBold";
import SideBar from "@components/SideBar";
import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Flex,
    Image,
    Input,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import moment from "moment";
import { useEffect, useState } from "react";
import { AlertTriangle, Check } from "react-feather";
import { account, database } from "src/utility";
import feathericons from "feather-icons";

interface Notifications extends Models.Document {
    icon: string;
    message: string;
}

const Notifications = () => {
    const [notifications, set_notifications] = useState<Array<Notifications>>(
        []
    );
    const icons: { [key: string]: any } = new Object(feathericons.icons);
    const [loading, set_loading] = useState<boolean>(true);

    useEffect(() => {
        const fetch_data = async () => {
            const current_user = await account.get();

            set_notifications(
                (
                    await database.listDocuments<Notifications>(
                        current_user.$id,
                        "notifications"
                    )
                ).documents
            );

            set_loading(false);
        };

        fetch_data();
    }, []);

    return (
        <Flex>
            <SideBar current="notifications" />
            <Box
                paddingLeft={"400px"}
                paddingRight={20}
                marginTop={36}
                width="full"
            >
                <ExtraBold fontSize={34}>Notifications</ExtraBold>
                <Input
                    marginTop={3}
                    placeholder="Filter your notifications..."
                    bg="#dde0f2"
                    width="full"
                    padding={6}
                />
                <Flex direction="column" gap={5} marginTop={8}>
                    {notifications.map((n) => {
                        return (
                            <Flex
                                key={n.$id}
                                bg="#dde0f2"
                                alignItems="center"
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
                                    <Text
                                        dangerouslySetInnerHTML={{
                                            __html: icons[n.icon].toSvg({
                                                width: 20,
                                                height: 20,
                                            }),
                                        }}
                                    />
                                </Flex>
                                <Text marginLeft={6}>{n.message}</Text>
                                <Text
                                    marginLeft={"auto"}
                                    marginRight={10}
                                    color="gray.600"
                                >
                                    {moment(n.$createdAt).format(
                                        "MMMM Do YYYY"
                                    )}
                                </Text>
                                <Box bg="#d2d8f3" padding={3} borderRadius="lg">
                                    <Check />
                                </Box>
                            </Flex>
                        );
                    })}
                </Flex>
                {loading ? (
                    <Flex
                        width="full"
                        height="50vh"
                        alignItems={"center"}
                        justifyContent="center"
                    >
                        <Spinner color="#2E3440" />
                    </Flex>
                ) : notifications.length == 0 ? (
                    <Flex
                        width="full"
                        height="50vh"
                        alignItems={"center"}
                        direction="column"
                        justifyContent="center"
                    >
                        <Image src="/images/nonotifications.png" width={20} />
                        <Text marginTop={4}>
                            Is this what inner peace feels like?
                        </Text>
                    </Flex>
                ) : (
                    <></>
                )}
            </Box>
        </Flex>
    );
};

export default Notifications;
