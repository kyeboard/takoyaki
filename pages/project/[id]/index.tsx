import SideBarProject from "@components/SideBarProject";
import { Flex } from "@pankod/refine-chakra-ui";
import { account } from "src/utility";

const DashBoard = () => {
    (async () => {
        console.log(await account.createJWT())
    })()

    return (
        <Flex>
            <SideBarProject current={"todos"} />
        </Flex>
    );
};

export default DashBoard;
