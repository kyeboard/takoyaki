import { Nunito } from "@next/font/google";
import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from "@pankod/refine-chakra-ui";

const font = Nunito({ subsets: ["latin"], weight: "700" });

interface FormItemProps extends FormControlProps {
    value: string | number;
    set_value: any;
    check: (data: any) => boolean;
    error_message: string;
    title: string;
    placeholder: string;
    type: string;
    helper_message: string;
}

const FormItem: React.FC<FormItemProps> = ({
    value,
    title,
    placeholder,
    set_value,
    check,
    type,
    error_message,
    helper_message,
    ...props
}) => {
    const validity = check(value);

    return (
        <FormControl isInvalid={!validity} {...props}>
            <FormLabel className={font.className}>{title}</FormLabel>
            <Input
                bg="#dde0f2"
                onChange={(e) => set_value(e.target.value)}
                padding={6}
                placeholder={placeholder}
                type={type}
            />
            {validity ? (
                <FormHelperText>{helper_message}</FormHelperText>
            ) : (
                <FormErrorMessage>{error_message}</FormErrorMessage>
            )}
        </FormControl>
    );
};

export default FormItem;
