import React from 'react';
import {
    BoldOutlined, ItalicOutlined, UnderlineOutlined,
    UnorderedListOutlined, OrderedListOutlined, CodeOutlined,
    PictureOutlined, LinkOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faHeading } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'antd';

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
    { label: 'Header', style: 'header-three', icon: <FontAwesomeIcon icon={faHeading} /> },
    { label: 'Blockquote', style: 'blockquote', icon: <FontAwesomeIcon icon={faQuoteLeft} /> },
    { label: 'UL', labelLong: 'Unordered List', style: 'unordered-list-item', icon: <UnorderedListOutlined /> },
    { label: 'OL', labelLong: 'Ordered List', style: 'ordered-list-item', icon: <OrderedListOutlined /> },
    { label: 'Code Block', style: 'code-block', icon: <CodeOutlined /> },
];

const BlockStyleControls = (props) => {
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
                    <Tooltip key={type.label} title={type.labelLong ?? type.label}>
                        <span key={type.label} className={className} onMouseDown={onToggle}>
                            {type.icon ?? type.label}
                        </span>
                    </Tooltip>
                );
            })}
        </span>
    );
};

const InlineStyleControls = (props) => {
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
                    <Tooltip key={type.label} title={type.label}>
                        <span className={className} onMouseDown={onToggle}>
                            {type.icon ?? type.label}
                        </span>
                    </Tooltip>
                );
            })}
        </span>
    );
};

const OtherControls = (props) => {
    const { onAddImage, onAddLink } = props;
    return (
        <>
            <Tooltip title="Insert Image">
                <span className="RichEditor-styleButton" onClick={onAddImage}>
                    <PictureOutlined />
                </span>
            </Tooltip>
            <Tooltip title="Insert External Link">
                <span className="RichEditor-styleButton" onClick={onAddLink}>
                    <LinkOutlined />
                </span>
            </Tooltip>
        </>
    )
}


const StaticToolbar = (props) => {
    const { editorState, toggleBlockType, toggleInlineStyle, onAddImage, onAddLink } = props;
    return (
        <>
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <OtherControls
                onAddImage={onAddImage}
                onAddLink={onAddLink}
            />
        </>
    );
}

export default StaticToolbar;