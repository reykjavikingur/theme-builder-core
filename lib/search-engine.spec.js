const should = require('should');
const SearchEngine = require('./search-engine');

const STRUCTURES = [
    {
        title: 'Buttons',
        items: [
            {
                name: 'Button',
                html: `<button>Click</button>`,
            },
            {
                name: 'Special Button',
                html: `<button class="special">Click</button>`,
            },
            {
                name: 'Input Button',
                html: `<input type="button" value="Click"/>`,
            },
        ]
    },
    {
        title: 'Text',
        items: [
            {
                name: 'Heading 1',
                html: `<h1>Heading 1</h1>`,
            },
            {
                name: 'Paragraph',
                html: `<p>Paragraph</p>`,
            },
            {
                name: 'Special',
                html: `<span class="special">Special</span>`,
            }
        ]
    }
];

describe('SearchEngine', () => {

    it('should be defined', () => {
        should(SearchEngine).be.ok();
    });

    describe('with structures', () => {

        let searchEngine;

        beforeEach(() => {
            searchEngine = new SearchEngine(STRUCTURES);
        });

        describe('no filter', () => {
            var structures;
            beforeEach(() => {
                structures = searchEngine.filter('');
            });

            it('should be ok', () => {
                should(structures).be.ok();
            });

            it('should be equivalent to original structures', () => {
                should(structures).eql(STRUCTURES);
            });
        });

        describe('filter h1', () => {
            var structures;
            beforeEach(() => {
                structures = searchEngine.filter('h1');
            });
            it('should have one group', () => {
                should(structures.length).eql(1);
            });
            it('should have correct group title', () => {
                should(structures[0].title).eql('Text');
            });
            it('should have one item in group', () => {
                should(structures[0].items.length).eql(1);
            });
            it('should have correct item', () => {
                should(structures[0].items[0]).eql({
                    name: 'Heading 1',
                    html: `<h1>Heading 1</h1>`,
                })
            });
        });

        describe('filter button', () => {
            var structures;
            beforeEach(() => {
                structures = searchEngine.filter('button');
            });
            it('should have one group', () => {
                should(structures.length).eql(1);
            });
            it('should have correct group title', () => {
                should(structures[0].title).eql('Buttons');
            });
            it('should have two items in group', () => {
                should(structures[0].items.length).eql(2);
            });
            it('should have correct items in group', () => {
                should(structures[0].items).eql([
                    {
                        name: 'Button',
                        html: `<button>Click</button>`,
                    },
                    {
                        name: 'Special Button',
                        html: `<button class="special">Click</button>`,
                    },
                ])
            });
        });

        describe('filter .special', () => {
            var structures;
            beforeEach(() => {
                structures = searchEngine.filter('.special');
            });
            it('should have two groups', () => {
                should(structures.length).eql(2);
            });
            it('should have correct titles for first group', () => {
                should(structures[0].title).eql('Buttons');
            });
            it('should have correct title for second group', () => {
                should(structures[1].title).eql('Text');
            });
            it('should have correct number of items for first group', () => {
                should(structures[0].items.length).eql(1);
            });
            it('should have correct number of items for second group', () => {
                should(structures[1].items.length).eql(1);
            });
            it('should have correct item in first group', () => {
                should(structures[0].items[0]).eql({
                    name: 'Special Button',
                    html: `<button class="special">Click</button>`,
                });
            });
            it('should have correct item in second group', () => {
                should(structures[1].items[0]).eql({
                    name: 'Special',
                    html: `<span class="special">Special</span>`,
                });
            });
        });
    });

});
