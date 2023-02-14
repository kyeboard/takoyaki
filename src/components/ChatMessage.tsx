import { Box, Flex } from "@pankod/refine-chakra-ui";
import { rise } from "animations";
import ChakraNextImage from "./ChakraNextImage";

interface ChatMessageProps {
    animationDelay: number;
    imageSrc: string;
    children: React.ReactNode
}

const ChatMessage: React.FC<ChatMessageProps> = ({ animationDelay, imageSrc, children }) => {
    return (
        <Flex
            marginTop={6}
            justifyContent={"center"}
            style={{ animationDelay: `${animationDelay}ms` }}
            animation={`${rise} 500ms ease-in-out forwards`}
            borderRadius={"2xl"}
            gap={3}
        >
            <ChakraNextImage
                width={10}
                borderRadius="full"
                height={10}
                alt="User profile"
                src={imageSrc}
            />
            <Box
                bg="#d2d9f2"
                padding={4}
                borderBottomRadius="2xl"
                borderTopRightRadius={"2xl"}
            >
                {children}
            </Box>
        </Flex>
    );
};

export default ChatMessage;
