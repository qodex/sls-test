'use strict'
let unique = require('../utils/article-utils').unique;
let isValid = require('../utils/article-utils').isValid;

it('returns unique', () => {
    return expect(unique(['a','b','b','c','d'],'d')).toEqual(['a','b','c']);
});

it('returns false if article is invalid', () => {
    expect(isValid({})).toEqual(false);
})

it('returns true if article is invalid', () => {
    expect(isValid({title:"abc", date: "20191212"})).toEqual(true);
})