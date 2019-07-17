const should = require('should');
const cheerio = require('cheerio');
const structures = require('./structures');

describe('structures', () => {

    it('should be an Array', () => {
        should(structures).be.instanceOf(Array);
    });

    describe('each', () => {
        structures.forEach((structure, i) => {
            describe(`group #${i} "${structure.name}"`, () => {
                it('should be truthy', () => {
                    should(structure).be.ok();
                });
                it('should have items Array', () => {
                    should(structure.items).be.instanceOf(Array);
                });
                it('should have non-empty items', () => {
                    should(structure.items.length).be.greaterThan(0);
                });
                it('should have name String', () => {
                    should(structure.name).be.instanceOf(String);
                });
                it('should have non-empty name', () => {
                    should(structure.name).be.ok();
                });
                structure.items.forEach((item, j) => {
                    describe(`item #${j} "${item.name}"`, () => {
                        it('should have name String', () => {
                            should(item.name).be.instanceOf(String);
                        });
                        it('should have non-empty name', () => {
                            should(item.name).be.ok();
                        });
                        it('should have html String', () => {
                            should(item.html).be.instanceOf(String);
                        });
                        it('should have non-empty html', () => {
                            should(item.html).not.eql('');
                        });

                        it('should have valid label "for" attributes', () => {
                            const $ = cheerio.load(item.html);
                            const body = $('body');
                            body.find('label[for]').each((i, el) => {
                                let id = $(el).attr('for');
                                should(body.find(`#${id}`).length).eql(1);
                            });
                        });

                        it('should have valid aria-labelledby', () => {
                            const $ = cheerio.load(item.html);
                            const body = $('body');
                            body.find('[aria-labelledby]').each((i, el) => {
                                let id = $(el).attr('aria-labelledby');
                                should(body.find(`#${id}`).length).eql(1);
                            });
                        });

                        it('should have valid aria-describedby', () => {
                            const $ = cheerio.load(item.html);
                            const body = $('body');
                            body.find('[aria-describedby]').each((i, el) => {
                                let id = $(el).attr('aria-describedby');
                                should(body.find(`#${id}`).length).eql(1);
                            });
                        });

                        it('should have valid aria-controls', () => {
                            const $ = cheerio.load(item.html);
                            const body = $('body');
                            body.find('[aria-controls]').each((i, el) => {
                                let id = $(el).attr('aria-controls');
                                should(body.find(`#${id}`).length).eql(1);
                            });
                        });

                    });
                });
                it('should have distinct names', () => {
                    should(findDuplicates(structure.items.map(obj => obj.name))).eql([]);
                });
            });
        });
    });

    it('should have distinct names', () => {
        should(findDuplicates(structures.map(s => s.name))).eql([]);
    });

    it('should have globally unique id attributes on DOM elements', () => {
        let allIds = [];
        for (let s of structures) {
            for (let item of s.items) {
                let ids = findIds(item.html);
                allIds = allIds.concat(ids);
            }
        }
        should(findDuplicates(allIds)).eql([]);
    });

});

describe('sanity', () => {
    describe('findDuplicates', () => {
        it('should return empty list when given empty list', () => {
            should(findDuplicates([])).eql([]);
        });
        it('should return empty list when given list with one item', () => {
            should(findDuplicates(['a'])).eql([]);
        });
        it('should return empty list when given list with two distinct items', () => {
            should(findDuplicates(['a', 'b'])).eql([]);
        });
        it('should find duplicate in doubled list', () => {
            should(findDuplicates(['a', 'a'])).eql(['a']);
        });
        it('should find duplicate among distinct', () => {
            should(findDuplicates(['a', 'b', 'a'])).eql(['a']);
        });
        it('should find multiple duplicates', () => {
            should(findDuplicates(['a', 'b', 'c', 'b', 'c'])).eql(['b', 'c']);
        });
    });
    describe('findIds', () => {
        it('should return empty list given empty string', () => {
            should(findIds('')).eql([]);
        });
        it('should return empty list given html with no elements having id', () => {
            should(findIds('<p>foo <span>bar</span> baz.</p>')).eql([]);
        });
        it('should find lone id on root element', () => {
            should(findIds(`<p id="x">para</p>`)).eql(['x']);
        });
        it('should find multiple ids', () => {
            should(findIds(`<p id="x"><div>hello</div> <span id="y">there</span></p>`)).eql(['x', 'y']);
        });
    });
});

function findDuplicates(list) {
    let items = {};
    let duplicates = {};
    for (let item of list) {
        if (items.hasOwnProperty(item)) {
            duplicates[item] = true;
        }
        items[item] = true;
    }
    return Object.keys(duplicates);
}

function findIds(html) {
    let ids = [];
    const $ = cheerio.load(html);
    $('body').find('[id]').each((i, el) => ids.push($(el).attr('id')));
    return ids;
}
