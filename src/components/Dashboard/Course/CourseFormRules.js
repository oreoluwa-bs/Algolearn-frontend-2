export const TextInputRules = (inputname) => (
    [
        {
            required: true,
            message: `Please input the ${inputname.toLowerCase()}!`,
        },
        {
            whitespace: true,
            message: `${inputname} can not start with a space`
        }
    ]
);
