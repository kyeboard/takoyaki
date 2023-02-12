import { Flex, keyframes, Text } from "@pankod/refine-chakra-ui";
import Link from "next/link";

interface QuickLinkProps {
    title: string;
    href: string;
    icon: React.ReactNode;
    delay: number
    current?: boolean;
}

const rise = keyframes`
    0% {
        opacity: 0;
        transform: translateY(55px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const QuickLink: React.FC<QuickLinkProps> = ({
    title,
    href,
    icon,
    current,
    delay
}) => {
    return (
        <Link href={href}>
            <Flex
                marginTop={4}
                bg={current ? "#d2d8f3" : "transparent"}
                padding={4}
                cursor="pointer"
                paddingX={6}
                borderRadius={10}
                alignItems={"center"}
                gap={6}
                opacity={0}
                style={{ animationDelay: `${delay}ms` }}
                animation={`${rise} 500ms ease-in-out forwards`}
            >
                {icon}
                <Text>{title}</Text>
            </Flex>
        </Link>
    );
};
