import { Models } from "@pankod/refine-appwrite";
import {
    Box,
    Flex,
    Image,
    Input,
    Spinner,
    Text,
} from "@pankod/refine-chakra-ui";
import feathericons from "feather-icons";
import { ComponentType, useState } from "react";
import { Check } from "react-feather";
import { database } from "src/utility";
import moment from "moment";
import Bold from "./Bold";
import { rise } from "animations";
import { useGetIdentity, useList } from "@pankod/refine-core";

interface NotificationListProps {
    container: ComponentType<any>;
    animatedelement: ComponentType<any>;
}

interface Notification extends Models.Document {
    icon: string;
    message: string;
}

const NotificationList: React.FC<NotificationListProps> = ({
    container: Container,
    animatedelement: AnimatedElement,
}) => {
    const { data: currentUser } =
        useGetIdentity<Models.Account<{}>>();

    const { data, isLoading, refetch } = useList<Notification>({
        resource: `notifications-${currentUser?.name}`,
    });
    const [filter, set_filter] = useState<string>("");
    const icons: { [key: string]: any } = new Object(feathericons.icons);

    const remove_notification = async (id: string) => {
        // Delete the document
        await database.deleteDocument(
            currentUser?.name ?? "",
            "notifications",
            id
        );

        // Refetch new documents
        refetch();
    };

    return (
        <Container direction="column" gap={5}>
            <Input
                marginTop={4}
                placeholder="Filter your notifications..."
                bg="#dde0f2"
                width="full"
                onChange={(e) => set_filter(e.target.value)}
                value={filter}
                padding={6}
                animation={`${rise} 500ms ease-in-out forwards`}
                opacity={0}
                marginBottom={5}
                style={{ animationDelay: "50ms" }}
            />

            {data?.data.map((n) => {
                if (!n.message.includes(filter)) return;

                return (
                    <AnimatedElement
                        key={n.id}
                        bg="#dde0f2"
                        alignItems="center"
                        padding={3}
                        initial={{
                            opacity: 0,
                            transform: "translateY(30px)",
                        }}
                        animate={{
                            opacity: 1,
                            transform: "translateY(0px)",
                        }}
                        exit={{ opacity: 0, transform: "translateY(30px)" }}
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
                        <Bold marginLeft={6}>{n.message}</Bold>
                        <Text
                            maxW={{ sm: "fit-content", base: 20 }}
                            w="full"
                            noOfLines={1}
                            textOverflow="ellipsis"
                            overflow="hidden"
                            marginLeft={"auto"}
                            marginRight={{ sm: 10, base: 4 }}
                            color="gray.600"
                        >
                            {moment(n.$createdAt).fromNow()}
                        </Text>
                        <Box
                            bg="#a6d3a6"
                            onClick={() => remove_notification(n.id)}
                            padding={3}
                            cursor="pointer"
                            borderRadius="lg"
                        >
                            <Check />
                        </Box>
                    </AnimatedElement>
                );
            })}
            {isLoading ? (
                <Flex
                    width="full"
                    height="50vh"
                    alignItems={"center"}
                    justifyContent="center"
                >
                    <Spinner color="#2E3440" />
                </Flex>
            ) : data?.data.length == 0 ? (
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
        </Container>
    );
};

export default NotificationList;
