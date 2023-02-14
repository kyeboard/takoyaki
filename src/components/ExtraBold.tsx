import { Nunito } from "@next/font/google";
import { Text, TextProps } from "@pankod/refine-chakra-ui";

const font = Nunito({ subsets: ["latin"], weight: "800" });

const ExtraBold: React.FC<TextProps> = ({ children, ...props }) => {
    return (
        <Text className={font.className} {...props}>
            {children}
        </Text>
    );
};

export default ExtraBold;
