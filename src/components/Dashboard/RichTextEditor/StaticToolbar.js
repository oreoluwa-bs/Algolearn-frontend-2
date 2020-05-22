import React from 'react';
import {
    BoldOutlined, ItalicOutlined, UnderlineOutlined,
    UnorderedListOutlined, OrderedListOutlined, CodeOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faHeading } from '@fortawesome/free-solid-svg-icons'

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: <BoldOutlined /> },
    { label: 'Italic', style: 'ITALIC', icon: <ItalicOutlined /> },
    { label: 'Underline', style: 'UNDERLINE', icon: <UnderlineOutlined /> },
    // { label: 'Monospace', style: 'CODE', icon: null },
];

const BLOCK_TYPES = [
    // { label: 'H1', style: 'header-one', icon: null },
    // { label: 'H2', style: 'header-two' icon: null },
    // { label: 'H4', style: 'header-four', icon: null },
    // { label: 'H5', style: 'header-five', icon: null },
    // { label: 'H6', style: 'header-six', icon: null },
    { label: 'Header', style: 'header-two', icon: <FontAwesomeIcon icon={faHeading} /> },
    { label: 'Blockquote', style: 'blockquote', icon: <FontAwesomeIcon icon={faQuoteLeft} /> },
    { label: 'UL', style: 'unordered-list-item', icon: <UnorderedListOutlined /> },
    { label: 'OL', style: 'ordered-list-item', icon: <OrderedListOutlined /> },
    { label: 'Code Block', style: 'code-block', icon: <CodeOutlined /> },
];


export const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <span className="RichEditor-controls">
            {BLOCK_TYPES.map((type) => {
                const active = type.style === blockType;

                let className = 'RichEditor-styleButton';
                if (active) {
                    className += ' RichEditor-activeButton';
                }

                const onToggle = (e) => {
                    e.preventDefault();
                    props.onToggle(type.style);
                };

                return (
                    <span key={type.label} className={className} onMouseDown={onToggle}>
                        {type.icon ?? type.label}
                    </span>
                );
            })}
        </span>
    );
};


export const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <span className="RichEditor-controls">
            {INLINE_STYLES.map((type) => {
                const active = currentStyle.has(type.style);

                let className = 'RichEditor-styleButton';
                if (active) {
                    className += ' RichEditor-activeButton';
                }

                const onToggle = (e) => {
                    e.preventDefault();
                    props.onToggle(type.style);
                };

                return (
                    <span key={type.label} className={className} onMouseDown={onToggle}>
                        {type.icon ?? type.label}
                    </span>
                );
            })}
        </span>
    );
};