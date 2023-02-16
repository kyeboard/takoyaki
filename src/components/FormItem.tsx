import { Nunito } from "@next/font/google";
import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
} from "@pankod/refine-chakra-ui";

const font = Nunito({ subsets: ["latin"], weight: "700" });

interface FormItemProps extends FormControlProps {
    value: string | number;
    set_value: any;
    check: (data: any) => boolean;
    error_message: string;
    title: string;
    is_textarea?: boolean;
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
    is_textarea,
    type,
    error_message,
    helper_message,
    ...props
}) => {
    const validity = check(value);

    return (
        <FormControl isInvalid={!validity} {...props}>
            <FormLabel className={font.className}>{title}</FormLabel>
            {is_textarea ? (
                <Textarea
                    bg="#dde0f2"
                    onChange={(e) => set_value(e.target.value)}
                    paddingX={6}
                    paddingY={4}
                    value={value}
                    resize={"none"}
                    height={36}
                    placeholder={placeholder}
                />
            ) : (
                <Input
                    bg="#dde0f2"
                    onChange={(e) => set_value(e.target.value)}
                    padding={6}
                    value={value}
                    placeholder={placeholder}
                    type={type}
                />
            )}
            {validity ? (
                <FormHelperText>{helper_message}</FormHelperText>
            ) : (
                <FormErrorMessage>{error_message}</FormErrorMessage>
            )}
        </FormControl>
    );
};

FormItem.defaultProps = {
    is_textarea: false,
};

export default FormItem;
