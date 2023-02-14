import { Nunito } from "@next/font/google";
import { chakra, Text, TextProps } from "@pankod/refine-chakra-ui";

const font = Nunito({ subsets: ["latin"], weight: "700" });

const Bold: React.FC<TextProps> = ({ children, ...props }) => {
    return (
        <Text className={font.className} {...props}>
            {children}
        </Text>
    );
};

export default Bold;
