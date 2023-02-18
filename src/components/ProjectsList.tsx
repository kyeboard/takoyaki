// Import dependencies
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
import { rise } from "animations";
import { AnimatePresence } from "framer-motion";
import { ComponentType, useEffect, useState } from "react";
import { Plus } from "react-feather";
import { teams } from "src/utility";
import Bold from "./Bold";
import ProjectCard from "./ProjectsCard";

// Props 
interface ProjectsListProps {
    refresh: boolean;
    set_refresh: (status: boolean) => void;
    animatedElement: ComponentType<any>;
    set_show_new: (show: boolean) => void;
}

// The amazingly beautiful component
const ProjectsList: React.FC<ProjectsListProps> = ({
    refresh,
    set_refresh,
    animatedElement: AnimatedElement,
    set_show_new,
}) => {
    // States
    const [user_teams, set_user_teams] = useState<Array<Models.Team>>();
    const [loading, set_loading] = useState<boolean>(false);
    const [filter, set_filter] = useState<string>("");

    useEffect(() => {
        if (!refresh) return;

        const fetchTeams = async () => {
            set_loading(true);
            set_user_teams((await teams.list()).teams);
            set_loading(false);
        };

        fetchTeams();

        set_refresh(false);
    }, [refresh, set_refresh]);

    return (
        <Box width="full">
            <Flex
                width="full"
                marginTop={3}
                gap={4}
                opacity={0}
                style={{ animationDelay: "140ms" }}
                animation={`${rise} 500ms ease-in-out forwards`}
            >
                <Input
                    placeholder="Searching for..."
                    bg="#dde0f2"
                    padding={6}
                    opacity={0}
                    value={filter}
                    onChange={(e) => set_filter(e.target.value)}
                    style={{ animationDelay: "160ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    _placeholder={{ color: "gray.500" }}
                />
                <Button
                    bg="#2E3440"
                    color="#d2d8f3"
                    padding={6}
                    opacity={0}
                    style={{ animationDelay: "180ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    width={"300px"}
                    display={{ sm: "inherit", base: "none" }}
                    onClick={() => set_show_new(true)}
                    _hover={{ bg: "#2E3440" }}
                >
                    Create new project
                </Button>
                <Button
                    bg="#2E3440"
                    color="#d2d8f3"
                    display={{ base: "inherit", sm: "none" }}
                    padding={6}
                    opacity={0}
                    style={{ animationDelay: "180ms" }}
                    animation={`${rise} 500ms ease-in-out forwards`}
                    width={"80px"}
                    onClick={() => set_show_new(true)}
                    _hover={{ bg: "#2E3440" }}
                >
                    <Plus />
                </Button>
            </Flex>
            <Bold
                marginTop={6}
                opacity={0}
                style={{ animationDelay: "200ms" }}
                animation={`${rise} 500ms ease-in-out forwards`}
                fontSize={16}
            >
                Recent Projects
            </Bold>

            <Flex marginTop={4} gap={6} wrap="wrap" paddingBottom={10}>
                <AnimatePresence>
                    {user_teams ? (
                        user_teams.map((team) => {
                            if (!team.name.includes(filter)) return;

                            return (
                                <ProjectCard
                                    animatedelement={AnimatedElement}
                                    id={team.$id}
                                    key={team.$id}
                                    name={team.name}
                                />
                            );
                        })
                    ) : !loading && !refresh ? (
                        <Flex
                            height="50vh"
                            width="full"
                            direction="column"
                            alignItems={"center"}
                            justifyContent="center"
                        >
                            <Image
                                src="/images/empty.png"
                                width={24}
                                height={24}
                                alt="Empty state"
                            />
                            <Text marginTop={4}>
                                When you realize there are no projects to work
                                on and it&apos;s only Monday.
                            </Text>
                        </Flex>
                    ) : (
                        <></>
                    )}
                </AnimatePresence>
                {loading ? (
                    <Flex
                        width="full"
                        height="50vh"
                        alignItems="center"
                        justifyContent={"center"}
                    >
                        <Spinner color="#2E3440" />
                    </Flex>
                ) : (
                    <></>
                )}
            </Flex>
        </Box>
    );
};

export default ProjectsList;
