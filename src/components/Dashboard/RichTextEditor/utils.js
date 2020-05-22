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

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();

    return (
        <a href={url} title={url}>{props.children}</a>
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

export const decorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link,
    },
]);