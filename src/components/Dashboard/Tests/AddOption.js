import React from 'react';
import { Input, Button, Form } from 'antd';

const AddOptionPage = (props) => {
    const [forml] = Form.useForm();

    const generateKey = () => {
        const alphabetsArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
            "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        return alphabetsArr[props.questionOptions.length];
    }

    const onFinish = async (values) => {
        values.key = generateKey();
        props.setQuestionOptions([...props.questionOptions, values]);
        forml.resetFields();
    };


    return (
        <div>
            <Form form={forml} name='add-option' initialValues={{}} hideRequiredMark layout='vertical' onFinish={onFinish}>
                <Form.Item label='Option text:' name='text'>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button style={{ float: 'right' }} type='primary' htmlType='submit'>
                        Add Option
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddOptionPage;