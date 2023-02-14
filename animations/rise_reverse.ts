import { keyframes } from "@pankod/refine-chakra-ui";

export default keyframes`
    0% {
        opacity: 0;
        transform: translateY(-55px);
        height: 0vh;
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
        height: 100vh;
    }
`;
