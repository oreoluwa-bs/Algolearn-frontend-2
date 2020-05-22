import React from 'react';
import {
    BoldOutlined, ItalicOutlined, UnderlineOutlined,
    UnorderedListOutlined, OrderedListOutlined, CodeOutlined,
    LinkOutlined
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


// const InlineToolbar = ({ editorState, onToggleInline, onToggleBlock, position, setLink }) => {
//     const currentStyle = editorState.getCurrentInlineStyle();
//     const selection = editorState.getSelection();
//     const blockType = editorState
//         .getCurrentContent()
//         .getBlockForKey(selection.getStartKey())
//         .getType();

//     return (
//         <div
//             className="toolbar"
//             style={position}
//         >
//             <ul className="toolbar-items">
//                 {INLINE_STYLES.map(type =>
//                     <li
//                         key={type.label}
//                         className={`toolbar-item ${type.style.toLowerCase()} ${currentStyle.has(type.style) ? 'active' : ''}`}
//                         onMouseDown={(e) => {
//                             e.preventDefault();
//                             onToggleInline(type.style);
//                         }}
//                     >
//                         {type.icon ?? type.label}
//                     </li>
//                 )}
//                 {/* <li
//                     key="add-link-button"
//                     className="toolbar-item"
//                     onMouseDown={setLink}
//                 >
//                     Link
//             </li> */}
//                 {BLOCK_TYPES.map(type =>
//                     <li
//                         key={type.label}
//                         className={`toolbar-item ${type.style.toLowerCase()} ${type.style === blockType ? 'active' : ''}`}
//                         onMouseDown={(e) => {
//                             e.preventDefault();
//                             onToggleBlock(type.style);
//                         }}
//                     >
//                         {type.icon ?? type.label}
//                     </li>
//                 )}
//             </ul>
//         </div>
//     );
// }

// export default InlineToolbar;

const InlineToolbar = ({ editorState, onToggleInline, onToggleBlock, position, setLink }) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div
            className="toolbar RichEditor-controls"
            style={position}
        >
            <span className="toolbar-items">
                {INLINE_STYLES.map(type =>
                    <span
                        key={type.label}
                        className={`toolbar-item RichEditor-styleButton ${type.style.toLowerCase()} ${currentStyle.has(type.style) ? 'active RichEditor-activeButton' : ''}`}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onToggleInline(type.style);
                        }}
                    >
                        {type.icon ?? type.label}
                    </span>
                )}
                {/* <li
                    key="add-link-button"
                    className="toolbar-item"
                    onMouseDown={setLink}
                >
                    Link
            </li> */}
                {BLOCK_TYPES.map(type =>
                    <span
                        key={type.label}
                        className={`toolbar-item RichEditor-styleButton ${type.style.toLowerCase()} ${type.style === blockType ? 'active  RichEditor-activeButton' : ''}`}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onToggleBlock(type.style);
                        }}
                    >
                        {type.icon ?? type.label}
                    </span>
                )}
                <span key='add-link-button' onMouseDown={setLink} className='toolbar-item RichEditor-styleButton'>
                    <LinkOutlined />
                </span>
            </span>
        </div>
    );
}

export default InlineToolbar;