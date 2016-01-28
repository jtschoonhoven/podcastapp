"use strict";

/**
 * Return click location as ratio between two edges of clicked element.
 * @param e event - click event passed as default arg to onClick function
 * @param window windowObj
 * @param elementId str - id attribute of target element
 * @param [axis] string - "x" or "y"
 * @return float - between 0 and 1
 */
const clickCoordinatesAsRatio = function(e, window, elementId, axis) {
    e = e || window.event;
    axis = axis || 'x';
    const document = window.document;
    let xy = 0;
    const el = document.getElementById(elementId).getBoundingClientRect();

    if (axis === 'x') {
        xy = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        const width = el.right - el.left;
        const offset = xy - el.left;
        return offset / width;
    }

    else if (axis === 'y') {
        xy = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        const height = el.top - el.bottom;
        const offset = xy - el.top;
        return offset / height;
    }
}

module.exports = clickCoordinatesAsRatio;
