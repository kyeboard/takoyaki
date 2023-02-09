import { Flex } from "@pankod/refine-chakra-ui";

interface ColorSelectionProps {
    onChange: (new_value: string) => void;
    value: string;
}

const colors = [
    "#f38ba8",
    "#89b4fa",
    "#a6e3a1",
    "#cba6f7",
    "#f5c2e7",
    "#b4befe",
    "#f2cdcd",
];

const ColorSelection: React.FC<ColorSelectionProps> = ({ onChange, value }) => {
    return (
        <Flex gap={3} marginTop={2}>
            {colors.map((color) => (
                <Flex
                    key={color}
                    width={8}
                    height={8}
                    borderRadius={4}
                    bg={color}
                    cursor="pointer"
                    onClick={() => onChange(color)}
                    border={value === color ? "2px solid #2E3440" : "none"}
                />
            ))}
        </Flex>
    );
};

export default ColorSelection;
