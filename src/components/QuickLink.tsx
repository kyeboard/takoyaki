import { Flex, Text } from "@pankod/refine-chakra-ui";
import Link from "next/link";

interface QuickLinkProps {
    title: string;
    href: string;
    icon: React.ReactNode;
    current?: boolean;
}

export const QuickLink: React.FC<QuickLinkProps> = ({
    title,
    href,
    icon,
    current,
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
            >
                {icon}
                <Text>{title}</Text>
            </Flex>
        </Link>
    );
};
