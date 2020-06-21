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
        pattern: RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
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
);

export const ConfirmPasswordRules = (getFieldValue) => ({
    validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject('The two passwords that you entered do not match!');
    },
});

// /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/