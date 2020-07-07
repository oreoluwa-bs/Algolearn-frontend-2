import React, { useState } from 'react';
import { Divider, Modal, Form, Input } from 'antd';
import { Editor, RichUtils, getDefaultKeyBinding, AtomicBlockUtils } from 'draft-js';
import StaticToolbar from './StaticToolbar';
import { mediaBlockRenderer } from './utils';
import '../../../styles/richtexteditor.css';
import 'draft-js/dist/Draft.css';

const RichTextEditor = (props) => {
    const { editorState, setEditorState, placeholder, readOnly, EditorState } = props;

    const editorRef = React.useRef(Editor);

    const [pictureModal, setPictureModal] = useState(false);
    const [formPicture] = Form.useForm();

    const [linkModal, setLinkModal] = useState(false);
    const [formLink] = Form.useForm();

    const renderPlaceholder = (placeholder, editorState) => {
        const contentState = editorState.getCurrentContent();
        const shouldHide = contentState.hasText() ||
            contentState.getBlockMap().first().getType() !== 'unstyled';
        return shouldHide ? '' : placeholder;
    }

    const handleOnChange = (editorState) => {
        setEditorState(editorState);
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleOnChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(e, editorState, 4);
            if (newEditorState) {
                handleOnChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }


    const toggleBlockType = (blockType) => {
        handleOnChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }

    const toggleInlineStyle = (inlineStyle) => {
        handleOnChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );

    }

    const handlePictureAdd = () => {
        formPicture.validateFields()
            .then(values => {
                formPicture.resetFields();
                setPictureModal(false);
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    "image",
                    "IMMUTABLE",
                    { src: values.url }
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(
                    editorState,
                    { currentContent: contentStateWithEntity },
                    "create-entity"
                );
                setEditorState(AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    `!['Image'](${values.url})`
                ));
                setTimeout(() => editorRef.current.focus(), 0);

            }).catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    const handleLinkAdd = () => {
        const selection = editorState.getSelection();
        formLink.validateFields()
            .then(values => {
                formLink.resetFields();
                setLinkModal(false);

                if (!values.url) {
                    handleOnChange(RichUtils.toggleLink(editorState, selection, null));
                    return 'handled';
                }
                const content = editorState.getCurrentContent();
                const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: values.url });
                const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
                const entityKey = contentWithEntity.getLastCreatedEntityKey();
                handleOnChange(RichUtils.toggleLink(newEditorState, selection, entityKey));

                setTimeout(() => editorRef.current.focus(), 0);
            }).catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <div className='RichEditor-root'>
            <div className='RichEditor-editor'>
                <div id='editor-container' className='editor' style={props.customStyle} onClick={() => editorRef.current.focus()}>
                    <Editor
                        readOnly={readOnly}
                        spellCheck
                        blockRendererFn={mediaBlockRenderer}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={mapKeyToEditorCommand}
                        editorState={editorState}
                        onChange={handleOnChange}
                        placeholder={renderPlaceholder(placeholder, editorState)}
                        ref={editorRef}
                    />
                </div>
            </div>
            <Divider />
            {
                !readOnly &&
                <>
                    <StaticToolbar
                        editorState={editorState}
                        toggleInlineStyle={toggleInlineStyle}
                        toggleBlockType={toggleBlockType}
                        onAddImage={() => setPictureModal(true)}
                        onAddLink={() => setLinkModal(true)}
                    />
                </>
            }
            <Modal
                visible={pictureModal}
                title="Insert Image Link"
                okText="Add Image"
                cancelText="Cancel"
                onCancel={() => setPictureModal(false)}
                onOk={handlePictureAdd}
            >
                <Form form={formPicture} layout="vertical" hideRequiredMark>
                    <Form.Item rules={[{ required: true, message: 'Please input image link' }]} name='url' hasFeedback>
                        <Input placeholder='https://example.com' />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                visible={linkModal}
                title="Insert Link"
                okText="Insert Link"
                cancelText="Cancel"
                onCancel={() => setLinkModal(false)}
                onOk={handleLinkAdd}
            >
                <Form form={formLink} layout="vertical" hideRequiredMark>
                    <Form.Item rules={[{ required: true, message: 'Please input link' }]} name='url' hasFeedback>
                        <Input placeholder='https://example.com' />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
}

export default RichTextEditor;