import SideBar from "@components/SideBar";
import NewProject from "@components/NewProject";
import { Box } from "@pankod/refine-chakra-ui";

const DashBoard = () => {
    return (
        <Box>
            <SideBar current="dashboard" />
            {/* <NewProject /> */}
        </Box>
    );
};

export default DashBoard;
