import React from 'react';
import { CompositeDecorator } from 'draft-js';

export const getSelectionRange = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    return selection.getRangeAt(0);
};

export const getSelectionCoords = (selectionRange) => {
    const editorBounds = document.getElementById('editor-container').getBoundingClientRect();
    const rangeBounds = selectionRange.getBoundingClientRect();
    const rangeWidth = rangeBounds.right - rangeBounds.left;

    // 107px is width of inline toolbar
    // 401px is width of inline toolbar
    const offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2) - ((95 + 401 - 50) / 2);

    // 42px is height of inline toolbar
    const offsetTop = rangeBounds.top - editorBounds.top + 7;

    return { offsetLeft, offsetTop };
};

export const Link = (props) => {
    const { contentState, entityKey } = props;
    const { url } = contentState.getEntity(entityKey).getData();
    return (
        <a
            href={url}
            title={url}
            target="_blank" rel="noopener noreferrer"
            aria-label={url}
        >{props.children}</a>
    );
};

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

function findMediaEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'image'
            );
        },
        callback
    );
}

const Image = props => {
    if (!!props.src) {
        return <img src={props.src} alt='' className='rich-text-image' />;
    }
    return null;
};
export const Media = props => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;

    if (type === "image") {
        media = <Image src={src} />;
    }

    return media;
};

export const decorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link,
    },
    {
        strategy: findMediaEntities,
        component: Media,
    },
]);


export const mediaBlockRenderer = block => {
    if (block.getType() === "atomic") {
        return {
            component: Media,
            editable: false
        };
    }
    return null;
};