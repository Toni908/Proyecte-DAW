import React from "react";

class slugfy {
    static convertToSlug(text) {
        return convertToSlug(text);
    }
    static reconvertToSlug(text) {
        return reconvertToSlug(text);
    }
}

function convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
}

function reconvertToSlug(text) {
    return text
        .replace("-"," ")
        .capitalize();
}

export default slugfy