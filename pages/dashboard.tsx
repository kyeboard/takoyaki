import SideBar from "@components/SideBar";
import NewProject from "@components/NewProject";
import { Nunito } from "@next/font/google";
import { Box, Button, Flex, Input, Text } from "@pankod/refine-chakra-ui";

const nunito = Nunito({ subsets: ["latin"], weight: "800" });
const nunito_700 = Nunito({ subsets: ["latin"], weight: "700" });

const DashBoard = () => {
    const date = new Date();

    // Create an array full of month's name
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <Flex width={"100vw"} height="100vh">
            <SideBar current="dashboard" />
            <Box width={"full"} height="full" paddingTop={32} paddingX={20}>
                <Text className={nunito.className} fontSize={28}>
                    Today, {date.getDate()} {month[date.getMonth()]}
                </Text>
                <Flex marginTop={3} gap={4}>
                    <Input
                        placeholder="Searching for..."
                        bg="#dde0f2"
                        padding={6}
                        _placeholder={{ color: "gray.500" }}
                    />
                    <Button
                        bg="#2E3440"
                        color="#d2d8f3"
                        padding={6}
                        width={"300px"}
                        _hover={{ bg: "#2E3440" }}
                    >
                        Create new project
                    </Button>
                </Flex>
                <Text
                    marginTop={6}
                    className={nunito_700.className}
                    fontSize={16}
                >
                    Recent Projects
                </Text>
            </Box>
            <NewProject />
        </Flex>
    );
};

export default DashBoard;
