import { Box, Flex, Text } from "@pankod/refine-chakra-ui";
import { useOne } from "@pankod/refine-core";
import { rise } from "animations";
import Link from "next/link";
import Project from "types/Project";
import ExtraBold from "./ExtraBold";

interface ProjectCardProps {
    id: string;
    name: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name }) => {
    const { data, isLoading } = useOne<Project>({ resource: "teams", id });

    if (!isLoading) {
        return (
            <Flex width="full">
                <Flex
                    direction={"column"}
                    padding={8}
                    borderRadius="3xl"
                    bg={data?.data.color}
                    maxWidth="450px"
                    width="full"
                    opacity={0}
                    height="full"
                    animation={`${rise} 500ms ease-in-out forwards`}
                >
                    {/* <Flex>
                            {p.members.map((m: any, i: number) => {
                                return (
                                    <Image
                                        key={m.userName}
                                        borderColor="#2E3440"
                                        transform={`translateX(-${8 * i}px)`}
                                        borderWidth={2}
                                        borderStyle="solid"
                                        src={
                                            storage.getFilePreview(
                                                "63dfd4b2bf3364da5f0c",
                                                m.userName
                                            ).href
                                        }
                                        width={10}
                                        borderRadius="full"
                                        alt="User profile"
                                    />
                                );
                            })}
                        </Flex> */}
                    <ExtraBold marginTop={5} fontSize={24}>
                        {name}
                    </ExtraBold>
                    <Text color="gray.600" marginTop={2} marginBottom={4}>
                        {data?.data.description}
                    </Text>
                    <ExtraBold marginTop={"auto"}>
                        {data?.data.completed + "%"}
                    </ExtraBold>
                    <Box marginTop={2} position="relative">
                        <Box
                            width="full"
                            height="2"
                            borderRadius="3xl"
                            bg="rgba(46, 52, 64, 0.4)"
                        ></Box>
                        <Box
                            position={"absolute"}
                            top={0}
                            width={data?.data.completed + "%"}
                            height="2"
                            borderRadius="3xl"
                            bg="#2E3440"
                        ></Box>
                    </Box>
                </Flex>
            </Flex>
        );
    }

    return <></>;
};

export default ProjectCard;
