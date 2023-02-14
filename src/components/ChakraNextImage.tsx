import { chakra } from "@pankod/refine-chakra-ui";
import Image from "next/image";

export default chakra(Image, {
    shouldForwardProp: (prop) =>
        ["width", "height", "src", "alt"].includes(prop),
});
