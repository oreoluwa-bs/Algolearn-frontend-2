export const PasswordRules = [
    {
        required: true,
        message: 'Please input your password!',
    },
    {
        min: 6,
        message: 'Password should be 6 or more characters long'
    },
    {
        whitespace: true,
        message: 'Password can not start with a space'
    }
];

export const EmailRules = [
    {
        required: true,
        message: 'Please input your email address!',
    },
    {
        // eslint-disable-next-line no-control-regex
        pattern: RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
        message: 'Please input a valid email address!',
    }
];

export const NameRules = (inputname) => (
    [
        {
            required: true,
            message: `Please input your ${inputname.toLowerCase()}!`,
        },
        {
            whitespace: true,
            message: `${inputname} can not start with a space`
        }
    ]
)