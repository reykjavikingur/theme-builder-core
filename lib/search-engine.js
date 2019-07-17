const cheerio = require('cheerio');

/**
 * A search engine is instantiated with structures
 * and can return equivalent data filtered by which structures
 * match given CSS selectors.
 */
class SearchEngine {

    constructor(structures) {
        this.structures = structures;
        this.bodies = structures.map((group) => {
            return group.items.map((item) => {
                const $ = cheerio.load(item.html);
                const body = $('body');
                return body;
            })
        });
    }

    filter(selector) {
        if (selector) {
            let structures = this.structures
                .map((group, i) => {
                    return {
                        ...group,
                        items: group.items.filter((item, j) => {
                            const body = this.bodies[i][j];
                            const count = body.find(selector).length;
                            return count > 0;
                        }),
                    };
                })
                .filter(group => {
                    return group.items.length > 0;
                })
            ;

            return structures;
        }
        else {
            return this.structures;
        }
    }
}

module.exports = SearchEngine;
