import { Flex } from "@pankod/refine-chakra-ui";

interface ColorSelectionProps {
    onChange: (new_value: string) => void;
    value: string;
}

interface Color {
    display: string;
    value: string;
}

const colors: Array<Color> = [
    {
        display: "rgb(243, 139, 168)",
        value: "rgba(243, 139, 168, 0.3)",
    },
    {
        display: "rgb(137, 180, 250)",
        value: "rgba(137, 180, 250, 0.3)",
    },
    {
        display: "rgb(166, 227, 161)",
        value: "rgba(166, 227, 161, 0.3)",
    },
    {
        display: "rgb(203, 166, 247)",
        value: "rgba(203, 166, 247, 0.3)",
    },
    {
        display: "rgb(245, 194, 231)",
        value: "rgba(245, 194, 231, 0.3)",
    },
    {
        display: "rgb(242, 205, 205)",
        value: "rgba(242, 205, 205, 0.3)",
    },
];

const ColorSelection: React.FC<ColorSelectionProps> = ({ onChange, value }) => {
    return (
        <Flex gap={3} marginTop={2}>
            {colors.map((color) => (
                <Flex
                    key={color.display}
                    width={8}
                    height={8}
                    borderRadius={4}
                    bg={color.display}
                    cursor="pointer"
                    onClick={() => onChange(color.value)}
                    border={
                        value === color.value ? "2px solid #2E3440" : "none"
                    }
                />
            ))}
        </Flex>
    );
};

export default ColorSelection;
