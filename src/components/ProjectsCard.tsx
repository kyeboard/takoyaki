import { Box, Flex, Text } from "@pankod/refine-chakra-ui";
import { useOne } from "@pankod/refine-core";
import { rise } from "animations";
import { useRouter } from "next/router";
import { ComponentType, Suspense } from "react";
import Project from "types/Project";
import ExtraBold from "./ExtraBold";

interface ProjectCardProps {
    id: string;
    name: string;
    animatedelement: ComponentType<any>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    id,
    name,
    animatedelement: AnimatedElement,
}) => {
    const { data, isLoading } = useOne<Project>({ resource: "teams", id });
    const router = useRouter();

    if (!isLoading) {
        return (
            <Flex maxW="450px" cursor="pointer" width="full">
                <AnimatedElement
                    direction={"column"}
                    padding={8}
                    onClick={() => router.push(`/project/${id}`)}
                    borderRadius="3xl"
                    bg={data?.data.color}
                    maxWidth="450px"
                    width="full"
                    opacity={0}
                    height="full"
                    initial={{
                        opacity: 0,
                        transform: "translateY(30px)",
                    }}
                    animate={{
                        opacity: 1,
                        transform: "translateY(0px)",
                    }}
                    exit={{ opacity: 0, transform: "translateY(30px)" }}
                    transition={{ duration: "0.3" }}
                >
                    <ExtraBold fontSize={24}>{name}</ExtraBold>
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
                </AnimatedElement>
            </Flex>
        );
    }

    return <></>;
};

export default ProjectCard;
