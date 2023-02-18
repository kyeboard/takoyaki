import { Box, Flex, Image, Spinner, Text } from "@pankod/refine-chakra-ui";
import { useList } from "@pankod/refine-core";
import Link from "next/link";
import feather from "feather-icons";
import { useRouter } from "next/router";
import ExtraBold from "./ExtraBold";

const WorkspacesList: React.FC<{
    filter: string;
    reload: boolean;
    revert: () => void;
}> = ({ filter, reload, revert }) => {
    // Get the router
    const router = useRouter();

    // Get all the workspaces
    const { data, isLoading, refetch } = useList({
        resource: `categories-${router.query.id}`,
    });

    if (reload) {
        refetch();
        revert(); // Set refres to false
    }

    // icon list
    const icons: { [key: string]: any } = new Object(feather.icons);

    return (
        <Flex>
            {isLoading ? (
                <Flex
                    width="full"
                    height="50vh"
                    justifyContent={"center"}
                    alignItems="center"
                >
                    <Spinner color="#2E3440" />
                </Flex>
            ) : data?.data.length == 0 ? (
                <Flex
                    alignItems={"center"}
                    justifyContent="center"
                    width="full"
                    direction="column"
                    height={"50vh"}
                    gap={6}
                >
                    <Image
                        src="/images/empty.png"
                        width={24}
                        alt="No workspaces"
                    />
                    <Text maxWidth={96} align="center">
                        Your to-dos are going to be more scrambled than an egg
                        on a trampoline if you don&apos;t arrange them in
                        workspaces.
                    </Text>
                </Flex>
            ) : (
                <Flex marginTop={8} width="full" height="full">
                    <Flex width="full" wrap="wrap" gap={5} h="fit-content">
                        {data?.data.map((w) => {
                            if (!w.title.includes(filter)) return;

                            return (
                                <Box
                                    key={w.id}
                                    maxW="400px"
                                    w="full"
                                    h="auto"
                                    flexGrow={1}
                                >
                                    <Link
                                        href={`/project/${router.query.id}/workspace/${w.id}`}
                                    >
                                        <Flex
                                            gap={2}
                                            direction="column"
                                            bg={w.color}
                                            borderRadius={"2xl"}
                                            maxW={"400px"}
                                            width="full"
                                            padding={8}
                                        >
                                            <Box
                                                bg="rgba(46, 52, 64, 0.2)"
                                                width="fit-content"
                                                color="#2E3440"
                                                padding={3}
                                                borderRadius="xl"
                                                dangerouslySetInnerHTML={{
                                                    __html: icons[
                                                        w.icon as string
                                                    ].toSvg(),
                                                }}
                                            />
                                            <ExtraBold
                                                marginTop={2}
                                                fontSize={24}
                                            >
                                                {w.title}
                                            </ExtraBold>
                                            <Text color="gray.600">
                                                {w.description}
                                            </Text>
                                        </Flex>
                                    </Link>
                                </Box>
                            );
                        })}
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};

export default WorkspacesList;
