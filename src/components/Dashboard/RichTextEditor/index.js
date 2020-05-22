import React, { useState } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { BlockStyleControls, InlineStyleControls } from './StaticToolbar';
import { getSelectionRange, getSelectionCoords } from './utils';
import InlineToolbar from './InlineToolbar';
import '../../../styles/richtexteditor.css';
import 'draft-js/dist/Draft.css';

const RichTextEditor = (props) => {
    const { editorState, setEditorState, editorRef, placeholder, EditorState } = props;
    const [inlineToolbarState, setInlineToolbarState] = useState({ show: false });

    const renderPlaceholder = (placeholder, editorState) => {
        const contentState = editorState.getCurrentContent();
        const shouldHide = contentState.hasText() ||
            contentState.getBlockMap().first().getType() !== 'unstyled';
        return shouldHide ? '' : placeholder;
    }

    const handleOnChange = (editorState) => {
        if (!editorState.getSelection().isCollapsed()) {
            const selectionRange = getSelectionRange();
            if (!selectionRange) {
                setInlineToolbarState({ show: false });
                return;
            }
            const selectionCoords = getSelectionCoords(selectionRange);
            setInlineToolbarState({
                ...inlineToolbarState,
                position: {
                    top: selectionCoords.offsetTop,
                    left: selectionCoords.offsetLeft
                }, show: true
            });
        } else {
            setInlineToolbarState({ show: false });
        }
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


    const setLink = () => {
        // getting url from prompt dialogue
        const urlValue = prompt('Paste URL', '');
        // getting current contentState
        const contentState = editorState.getCurrentContent();
        // creating Entity
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'SEGMENTED',
            { url: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        // updating currentContent property in editorState
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        // generating and saving new editor state
        setEditorState(RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey));


        setTimeout(() => editorRef.current.focus(), 0);
    }

    return (
        <div className='RichEditor-root'>
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <div className='RichEditor-editor'>
                <div id='editor-container' className='editor' style={props.customStyle} onClick={() => editorRef.current.focus()}>
                    <Editor
                        spellCheck
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={mapKeyToEditorCommand}
                        editorState={editorState}
                        onChange={handleOnChange}
                        placeholder={renderPlaceholder(placeholder, editorState)}
                        ref={editorRef}
                    />
                    {
                        inlineToolbarState.show ? <InlineToolbar
                            editorState={editorState}
                            onToggleInline={toggleInlineStyle}
                            onToggleBlock={toggleBlockType}
                            position={inlineToolbarState.position}
                            setLink={setLink}
                            customStyle={props.customStyle}
                        /> : null
                    }
                </div>
            </div>
        </div>
    );
}

export default RichTextEditor;