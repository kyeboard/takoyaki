import { extendTheme } from "@pankod/refine-chakra-ui";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#E7E7F2",
                color: "#2E3440",
            },
        },
    },
    components: {
        Button: {
            defaultProps: {
                _hover: { bg: "#2E3440" },
            },
        },
    },
});

export default theme;
