'use strict'



module.exports.unique = function(arr, exclude) {
    return [...new Set( arr.filter( item => item!==exclude)) ];
}

module.exports.isValid = function(article) {
    return !!article && !!article.title && !!parseInt(article.date);
}