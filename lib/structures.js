const path = require('path');
const n = require('nunjucks');
const sanitizeHtml = require('sanitize-html');

const env = new n.Environment(new n.FileSystemLoader(path.join(__dirname, 'items')))

    .addGlobal('random', {
        ElementId() {
            return Math.floor(Math.random() * 1e16).toString(16);
        },
    })
;

/**
 * Array of groups of items, that is, categorized HTML structures
 * @type {*[]}
 */
const structures = [

    {
        name: 'Colors',
        items: [
            ...['Primary', 'Secondary', 'Info', 'Success', 'Warning', 'Danger', 'White', 'Light', 'Dark',].map(t => {
                return {
                    name: `${t} background`,
                    html: `<div class="bg-${t.toLowerCase()}">&nbsp;</div>`,
                };
            }),
            ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
                return {
                    name: `Gray ${n}00`, reviewOnly: true,
                    html: `<div class="swatch-${n}00">&nbsp;</div>`,
                }
            }),
        ]
    },

    {
        name: 'Fonts',
        items: [
            {
                name: 'Base Font',
                html: `<div>Sans-Serif: The quick brown fox jumps over the lazy dog.</div>`,
            },
            {
                name: 'Monospace',
                html: `<pre>Monospace: The quick brown fox jumps over the lazy dog.</pre>`,
            },
            ...['Light', 'Normal', 'Bold'].map(weight => {
                return {
                    name: `${weight} Weight`,
                    html: `<span class="font-weight-${weight.toLowerCase()}">${weight} Weight</span>`,
                };
            }),
            ...['Light', 'Normal', 'Bold'].map(weight => {
                return {
                    name: `${weight} Weight Italic`,
                    html: `<span class="font-weight-${weight.toLowerCase()} font-italic">${weight} Weight</span>`,
                };
            }),

        ],
    },

    {
        name: 'Text',
        items: [

            ...[1, 2, 3, 4].map(n => {
                return {
                    name: `Display ${n}`,
                    html: `<h1 class="display-${n}">Display ${n}</h1>`,
                };
            }),

            ...[1, 2, 3, 4, 5, 6].map(n => {
                return {
                    name: `Heading ${n}`,
                    html: `<h${n}>Heading ${n}</h${n}>`,
                }
            }),

            {
                name: 'Paragraphs',
                html: `<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>`
            },
            {
                name: 'Link',
                html: `<a href="#">Link</a>`
            },
            {
                name: 'Muted',
                html: `<span class="text-muted">Muted</span>`,
            },
            {
                name: 'Strong',
                html: `<strong>Strong</strong>`,
            },
            {
                name: 'Emphatic',
                html: `<em>Emphatic</em>`,
            },
            {
                name: 'Small',
                html: `<small>Small</small>`,
            },
            {
                name: 'Mark',
                html: `<mark>Mark</mark>`,
            },
            {
                name: 'Deleted',
                html: `<del>Deleted</del>`
            },
            {
                name: 'Inserted',
                html: `<ins>Inserted</ins>`,
            },
            {
                name: 'Code',
                html: `<code>Code</code>`,
            },
            {
                name: 'Keyboard Input',
                html: `<kbd>Keyboard Input</kbd>`,
            },
            {
                name: 'Lead',
                html: `<p class="lead">Lead</p>`,
            },
            {
                name: 'Abbreviation',
                html: `<abbr title="Abbreviation">Abbr.</abbr>`,
            },
            {
                name: 'Blockquote', block: true,
                html: `<blockquote class="blockquote">Blockquote</blockquote>`,
            },
            {
                name: 'Blockquote Citation', block: true,
                html: `
                <figure>
                  <blockquote class="blockquote">
                    <p>A well-known quote, contained in a blockquote element.</p>
                  </blockquote>
                  <figcaption class="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
                `,
            },
            {
                name: 'Justified Text',
                html: `<p class="text-justify">Justified Text: Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>`,
            },
            {
                name: 'Left-Aligned Text',
                html: `<p class="text-left">Left aligned text on all viewport sizes.</p>`,
            },
            {
                name: 'Center-Aligned Text',
                html: `<p class="text-center">Center aligned text on all viewport sizes.</p>`,
            },
            {
                name: 'Right-Aligned Text',
                html: `<p class="text-right">Right aligned text on all viewport sizes.</p>`,
            },

        ],
    },

    {
        name: 'Alerts',
        items: [
            ...['Success', 'Info', 'Warning', 'Danger', 'Light', 'Dark'].map(type => {
                return {
                    name: `${type} Alert`,
                    html: `<div class="alert alert-${type.toLowerCase()}" role="alert">${type} alert</div>`,
                };
            }),
            {
                name: 'Dismissable Alert',
                html: `
                  <div class="alert alert-success alert-dismissible" role="alert">
                    <strong>Congratulations!</strong> You can now dismiss this alert.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                `,
            },
            {
                name: 'Dismissable Fading Alert',
                html: `
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Congratulations!</strong> You can now dismiss this fading alert.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                `,
            },
            {
                name: 'Alert with Link',
                html: `
                <div class="alert alert-primary" role="alert">
                    This is a primary alert with
                    <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
                </div>
                `,
            },
        ]
    },

    {
        name: 'Badges',
        items: [
            ...[1, 2, 3, 4, 5, 6].map(n => {
                return {
                    name: `Heading ${n} with Badge`,
                    html: `<h${n}>Example heading <span class="badge bg-secondary">New</span></h${n}>`,
                };
            }),
            {
                name: 'Button with Badge',
                html: `<button type="button" class="btn btn-primary">Notifications <span class="badge bg-secondary">4</span></button>`,
            },
            {
                name: 'Button with Badge and Screenreader-only Content',
                html: `
                <button type="button" class="btn btn-primary position-relative">
                  Inbox
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span class="visually-hidden">unread messages</span>
                  </span>
              </button>`
              ,
            },
            ...['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger', 'Light', 'Dark'].map(type => {
                return [
                    {
                        name: `${type} Badge`,
                        html: `<span class="badge bg-${type.toLowerCase()}">${type} Badge</span>`,
                    },
                    {
                        name: `${type} Pill Badge`,
                        html: `<span class="badge rounded-pill bg-${type.toLowerCase()}">${type} Pill Badge</span>`,
                    },
                ];
            }).reduce((a, b) => a.concat(b)),
        ]
    },

    {
        name: 'Buttons',
        items: [

            ...['Primary', 'Secondary', 'Info', 'Success', 'Warning', 'Danger', "Light", "Dark"]
                .map(theme => {
                    return [
                        {
                            name: `${theme} Button`,
                            html: `<button class="btn btn-${theme.toLowerCase()}">${theme} Button</button>`
                        },
                        {
                            name: `Disabled ${theme} Button`,
                            html: `<button disabled class="btn btn-${theme.toLowerCase()}">Disabled ${theme} Button</button>`
                        },
                        {
                            name: `${theme} Outline Button`,
                            html: `<button class="btn btn-outline-${theme.toLowerCase()}">${theme} Outline Button</button>`
                        },
                        {
                            name: `Disabled ${theme} Outline Button`,
                            html: `<button disabled class="btn btn-outline-${theme.toLowerCase()}">Disabled ${theme} Outline Button</button>`
                        },
                    ];
                })
                .reduce((a, b) => a.concat(b))
            ,

            {
                name: 'Link Button',
                html: `<button class="btn btn-link">Link Button</button>`,
            },

            {
                name: 'Button Link',
                html: `<a class="btn btn-primary" href="#" role="button">Button Link</a>`,
            },

            {
                name: 'Input Button',
                html: `<input class="btn btn-primary" type="button" value="Input Button">`,
            },

            {
                name: 'Submit Button',
                html: `<button class="btn btn-primary" type="submit">Submit Button</button>`,
            },

            {
                name: 'Submit Input',
                html: `<input class="btn btn-primary" type="submit" value="Submit Input">`,
            },

            {
                name: 'Reset Input',
                html: `<input class="btn btn-primary" type="reset" value="Reset Input">`,
            },

            {
                name: 'Small Button',
                html: `<button class="btn btn-sm btn-primary">Small Button</button>`,
            },

            {
                name: 'Large Button',
                html: `<button class="btn btn-lg btn-primary">Large Button</button>`,
            },

            {
                name: 'Block Button', block: true,
                html: `<button class="btn btn-block btn-primary">Block Button</button>`,
            },

            {
                name: 'Toggle Button Off',
                html: `<button type="button" class="btn btn-secondary" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Toggle Off</button>`,
            },
            {
                name: 'Toggle Button On',
                html: `<button type="button" class="btn btn-secondary active" data-bs-toggle="button" aria-pressed="true" autocomplete="off">Toggle On</button>`,
            },

            {
                name: 'Checkbox Button Checked',
                html: `
                <div class="btn-group-toggle" data-bs-toggle="buttons">
                  <label class="btn btn-secondary active">
                    <input type="checkbox" checked autocomplete="off"> Checked
                  </label>
                </div>
                `,
            },

            {
                name: 'Checkbox Button Unchecked',
                html: `
                <div class="btn-group-toggle" data-bs-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input type="checkbox" autocomplete="off"> Unchecked
                  </label>
                </div>
                `,
            },

            {
                name: 'Styled Radio Buttons',
                html: `
                <div class="btn-group btn-group-toggle" data-bs-toggle="buttons">
                  <label class="btn btn-secondary active">
                    <input type="radio" name="options" id="option1" autocomplete="off" checked> First
                  </label>
                  <label class="btn btn-secondary">
                    <input type="radio" name="options" id="option2" autocomplete="off"> Second
                  </label>
                  <label class="btn btn-secondary">
                    <input type="radio" name="options" id="option3" autocomplete="off"> Third
                  </label>
                </div>
                `,
            },

        ]
    },

    {
        name: 'Button Groups',
        items: [
            {
                name: 'Button Group',
                html: `
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-secondary">Left</button>
                  <button type="button" class="btn btn-secondary">Middle</button>
                  <button type="button" class="btn btn-secondary">Right</button>
                </div>
                `,
            },
            {
                name: 'Small Button Group',
                html: `
                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-secondary">Left</button>
                  <button type="button" class="btn btn-secondary">Middle</button>
                  <button type="button" class="btn btn-secondary">Right</button>
                </div>
                `,
            },
            {
                name: 'Large Button Group',
                html: `
                <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-secondary">Left</button>
                  <button type="button" class="btn btn-secondary">Middle</button>
                  <button type="button" class="btn btn-secondary">Right</button>
                </div>
                `,
            },
            {
                name: 'Button Toolbar',
                html: `
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-secondary">1</button>
                    <button type="button" class="btn btn-secondary">2</button>
                    <button type="button" class="btn btn-secondary">3</button>
                    <button type="button" class="btn btn-secondary">4</button>
                  </div>
                  <div class="btn-group mr-2" role="group" aria-label="Second group">
                    <button type="button" class="btn btn-secondary">5</button>
                    <button type="button" class="btn btn-secondary">6</button>
                    <button type="button" class="btn btn-secondary">7</button>
                  </div>
                  <div class="btn-group" role="group" aria-label="Third group">
                    <button type="button" class="btn btn-secondary">8</button>
                  </div>
                </div>
                `,
            },
            {
                name: 'Nested Button Group',
                html: `
                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                  <button type="button" class="btn btn-secondary">1</button>
                  <button type="button" class="btn btn-secondary">2</button>
                
                  <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Dropdown
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                      <a class="dropdown-item" href="#">Dropdown link</a>
                      <a class="dropdown-item" href="#">Dropdown link</a>
                    </div>
                  </div>
                </div>
                `,
            },
            {
                name: 'Vertical Button Group',
                html: `
                <div class="btn-group-vertical" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-secondary">Top</button>
                  <button type="button" class="btn btn-secondary">Middle</button>
                  <button type="button" class="btn btn-secondary">Bottom</button>
                </div>
                `,
            },
        ]
    },

    {
        name: 'Cards',
        items: [
            {
                name: 'Simple Card',
                html: `
                <section class="ix-demo-xs">
                    <div class="card">
                      <div class="card-body">
                        This is some text within a card body.
                      </div>
                    </div>
                </section>
                `,
            },
            {
                name: 'Typical Card',
                html: `
                <section class="ix-demo-xs">
                    <div class="card">
                      <img class="card-img-top" src="https://via.placeholder.com/576x360" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
                </section>
                `,
            },
            {
                name: 'Horizontal Card',
                html: `
                <section class="ix-demo-sm">
                    <div class="card mb-3">
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img src="https://via.placeholder.com/360x480" class="card-img" alt="Placeholder image">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                </section>
                `,
            },
            {
                name: 'Card with titles and links',
                html: `
                <section class="ix-demo-xs">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                      </div>
                    </div>
                </section>
                `,
            },
            {
                name: 'Card with Top Image',
                html: `
                <section class="ix-demo-xs">
                    <div class="card">
                      <img class="card-img-top" src="https://via.placeholder.com/576x360?text=Image+cap" alt="Card image cap">
                      <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </div>
                    </div>
                </section>
                `,
            },
            {
                name: 'Card with Bottom Image',
                html: `
                <section class="ix-demo-xs">
                    <div class="card">
                      <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </div>
                      <img class="card-img-bottom" src="https://via.placeholder.com/576x360?text=Image+cap" alt="Card image cap">
                    </div>
                </section>
                `,
            },
            {
                name: 'List Group Card',
                html: `
                <section class="ix-demo-xs">
                    <div class="card">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                      </ul>
                    </div>
                </section>
                `,
            },
            {
                name: 'List Group Card with Header',
                html: `
                <section class="ix-demo-xs">
                    <div class="card">
                      <div class="card-header">
                        Featured
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                      </ul>
                    </div>
                </section>
                `,
            },
            {
                name: 'Card with header and footer',
                html: `
                <section class="ix-demo-xs">
                    <div class="card text-center">
                      <div class="card-header">
                        Card Header
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                      <div class="card-footer text-muted">
                        Card Footer
                      </div>
                    </div>
                </section>
                `
            },
            {
                name: 'Card with everything (kitchen sink)',
                html: `
                <section class="ix-demo-xs">
                <div class="card" style="width: 18rem;">
                    <img src="https://via.placeholder.com/576x360" class="card-img-top" alt="Placeholder image">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                      </ul>
                      <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                      </div>
                    </div>
                </section>
                `,
            },
            {
                name: 'Card with Nav Header',
                html: `
                <div class="card text-center">
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active" href="#">Active</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
                `,
            },
            {
                name: 'Card with Pill Nav Header',
                html: `
                <div class="card text-center">
                  <div class="card-header">
                    <ul class="nav nav-pills card-header-pills">
                      <li class="nav-item">
                        <a class="nav-link active" href="#">Active</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
                `,
            },
            {
                name: 'Card with Image Overlay',
                html: `
                <div class="card bg-dark text-white">
                  <img class="card-img" src="https://via.placeholder.com/1080x200/55595c/373a3c?text=Image+Overlay" alt="Card image">
                  <div class="card-img-overlay">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text">Last updated 3 mins ago</p>
                  </div>
                </div>
                `,
            },
            ...[{token: 'Primary', text: "white"}, {token: 'Secondary', text: "white"}, {token: 'Success', text: "white"},
                {token: 'Info', text: "dark"}, {token: 'Warning', text: "dark"},
                {token: 'Danger', text: "white"}, {token: 'Light', text: "dark"}, {token: 'Dark', text: "white"}]
                .map(({token,text}) => {
                    return [
                        {
                            name: `${token} Card`,
                            html: `
                            <section class="ix-demo-xs">
                              <div class="card text-${text.toLowerCase()} bg-${token.toLowerCase()} mb-3" style="max-width: 18rem;">
                                <div class="card-header">Header</div>
                                <div class="card-body">
                                  <h5 class="card-title">${token.toLowerCase()} card title</h5>
                                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                              </div>
                             </section> 
                            `
                        },
                        {
                          name: `${token} Border Card`,
                          html: `
                          <section class="ix-demo-xs">
                            <div class="card border-${token.toLowerCase()} mb-3" style="max-width: 18rem;">
                              <div class="card-header">Header</div>
                              <div class="card-body text-${token.toLowerCase()}">
                                <h5 class="card-title">${token.toLowerCase()} card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              </div>
                            </div>
                           </section> 
                          `
                        }
                    ];
                })
                .reduce((a, b) => a.concat(b))
            ,
            {
                name: 'Cards in Grid Layout',
                html: `
                <div class="row">
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
                  </div>
                </div>
                `,
            },
            {
                name: 'Card Group',
                html: `
                <div class="card-group">
                  <div class="card">
                    <img class="card-img-top" src="https://via.placeholder.com/576x360" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                  <div class="card">
                    <img class="card-img-top" src="https://via.placeholder.com/576x360" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                  <div class="card">
                    <img class="card-img-top" src="https://via.placeholder.com/576x360" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
                `,
            },
            {
                name: 'Card Group with footers',
                html: `
                <div class="card-group">
                  <div class="card">
                    <img src="https://via.placeholder.com/576x360" class="card-img-top" alt="Card image 1">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                  </div>
                  <div class="card">
                    <img src="https://via.placeholder.com/576x360" class="card-img-top" alt="Card image 2">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div class="card-footer">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                  </div>
                  <div class="card">
                    <img src="https://via.placeholder.com/576x360" class="card-img-top" alt="Card image 3">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>
                    <div class="card-footer">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                  </div>
                </div>
                `,
            },
        ]
    },

    {
        name: 'Collapse',
        items: [

            {
                name: 'Details Closed',
                html: `
                <details>
                    <summary>Summary</summary>
                    <p>Hidden Details</p>
                </details>
                `,
            },

            {
                name: 'Details Open',
                html: `
                <details open>
                    <summary>Summary</summary>
                    <p>Visible Details</p>
                </details>
                `,
            },

            {
                name: 'Collapse', block: true,
                html: `
                    <p>
                      <button class="btn btn-primary" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#collapseExample1" 
                        aria-expanded="false" aria-controls="collapseExample1">
                        Toggle
                      </button>
                    </p>
                    <div class="collapse" id="collapseExample1">
                      <div class="card card-body">
                        Collapsible content.
                      </div>
                    </div>
                `,
            },

            {
                name: 'Accordion',
                html: `
                <div class="accordion" id="accordionExample">
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" 
                        aria-expanded="true" aria-controls="collapseOne">
                          Collapsible Group Item #1
                        </button>
                      </h5>
                    </div>
                
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="card-body">
                        Collapsible area #1.
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingTwo">
                      <h5 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" 
                        aria-expanded="false" aria-controls="collapseTwo">
                          Collapsible Group Item #2
                        </button>
                      </h5>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div class="card-body">
                        Collapsible area #2.
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h5 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" 
                        aria-expanded="false" aria-controls="collapseThree">
                          Collapsible Group Item #3
                        </button>
                      </h5>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div class="card-body">
                        Collapsible area #3.
                      </div>
                    </div>
                  </div>
                </div>
                `,
            },

        ],
    },

    {
        name: 'Dropdowns',
        items: [
            {
                name: 'Default Dropdown',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropdown',
                    buttonClass: '',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Primary Outline Dropdown',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropdown',
                    buttonClass: 'btn-outline-primary',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Secondary Outline Dropdown',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropdown',
                    buttonClass: 'btn-outline-secondary',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Small Dropdown',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropdown',
                    buttonClass: 'btn-outline-secondary btn-sm',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Large Dropdown',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropdown',
                    buttonClass: 'btn-outline-secondary btn-lg',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Secondary Dropdown',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropdown',
                    buttonClass: 'btn-secondary',
                    direction: 'down',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Secondary Dropup',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropup',
                    buttonClass: 'btn-secondary',
                    direction: 'up',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Secondary Dropleft',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropleft',
                    buttonClass: 'btn-secondary',
                    direction: 'left',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Secondary Dropright',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropright',
                    buttonClass: 'btn-secondary',
                    direction: 'right',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Right-Aligned Dropdown',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Dropdown',
                    buttonClass: 'btn-secondary',
                    dropdownMenuClass: 'dropdown-menu-right',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Split-Button Dropdown',
                html: env.render('dropdowns/dropdown-split.html', {
                    buttonLabel: 'Split Dropdown',
                    buttonClass: 'btn-primary',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Split-Button Dropup',
                html: env.render('dropdowns/dropdown-split.html', {
                    buttonLabel: 'Split Dropup',
                    buttonClass: 'btn-primary',
                    direction: 'up',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Split-Button Dropright',
                html: env.render('dropdowns/dropdown-split.html', {
                    buttonLabel: 'Split Dropright',
                    buttonClass: 'btn-primary',
                    direction: 'right',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Split-Button Dropleft',
                html: env.render('dropdowns/dropdown-split-reverse.html', {
                    buttonLabel: 'Split Dropleft',
                    buttonClass: 'btn-primary',
                    direction: 'left',
                    menuInclude: 'dropdowns/menus/simple.html',
                }),
            },
            {
                name: 'Dropdown with Menu',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Menu',
                    buttonClass: 'btn-secondary',
                    menuInclude: 'dropdowns/menus/grouped-menu.html',
                }),
            },
            {
                name: 'Dropdown with Divider',
                html: env.render('dropdowns/dropdown.html', {
                    buttonLabel: 'Divided Menu',
                    buttonClass: 'btn-secondary',
                    menuInclude: 'dropdowns/menus/divided-menu.html',
                }),
            },
            {
                name: 'Dropdown Menu with Text',
                html: env.render('dropdowns/dropdown-menu.html', {
                    menuInclude: 'dropdowns/menus/text.html',
                }),
            },
            {
                name: 'Dropdown Menu with Active Item',
                html: env.render('dropdowns/dropdown-menu.html', {
                    menuInclude: 'dropdowns/menus/active.html',
                }),
            },
            {
                name: 'Dropdown Menu with Disabled Item',
                html: env.render('dropdowns/dropdown-menu.html', {
                    menuInclude: 'dropdowns/menus/disabled.html',
                }),
            },
            {
                name: 'Dropdown Menu with Header',
                html: env.render('dropdowns/dropdown-menu.html', {
                    menuInclude: 'dropdowns/menus/header.html',
                }),
            },
            {
                name: 'Dropdown Menu with Divider',
                html: env.render('dropdowns/dropdown-menu.html', {
                    menuInclude: 'dropdowns/menus/divider.html',
                }),
            },
            {
                name: 'Dropdown Menu Form',
                html: env.render('dropdowns/dropdown-menu.html', {
                    menuInclude: 'dropdowns/menus/form.html',
                }),
            },
        ]
    },

    {
        name: 'Figures',
        items: [
            {
                name: 'Figure with Left-Aligned Caption',
                html: env.render('figure.html'),
            },
            {
                name: 'Figure with Right-Aligned Caption',
                html: env.render('figure.html', {captionAlignment: 'right'}),
            },
        ]
    },

    {
        name: 'Form Controls',
        items: [
            {
                name: 'Input',
                html: `<input class="form-control" type="text"/>`,
            },
            {
                name: 'Input with Placeholder',
                html: `<input class="form-control" placeholder="Placeholder" type="text"/>`,
            },
            {
                name: 'Input with Value',
                html: `<input class="form-control" type="text" value="Text"/>`,
            },
            {
                name: 'Input in Label',
                html: `
                <label>Label
                    <input class="form-control" type="text"/>
                </label>
                `,
            },
            {
                name: 'Input beside Label',
                html: id => `
                    <label for="input${id}">Label</label>
                    <input class="form-control" type="text" id="input${id}"/>
                `,
            },
            {
              name: 'Input with Floating Label',
              html: id => `
                <div class="form-floating">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                  <label for="floatingPassword">Password</label>
                </div>
              `,
            },
            {
                name: 'Large Input',
                html: `<input class="form-control form-control-lg" type="text" placeholder="Large Input"/>`,
            },
            {
                name: 'Small Input',
                html: `<input class="form-control form-control-sm" type="text" placeholder="Small Input"/>`,
            },
            {
                name: 'Disabled Input',
                html: `<input class="form-control" type="text" disabled/>`,
            },
            {
                name: 'Disabled Input with Placeholder',
                html: `<input class="form-control" placeholder="Placeholder" type="text" disabled/>`,
            },
            {
                name: 'Disabled Input with Value',
                html: `<input class="form-control" type="text" value="Text" disabled/>`,
            },

            {
                name: 'Read-only Input',
                html: `<input class="form-control" type="text" readonly value="Read-only text"/>`,
            },
            {
                name: 'Read-only Input Plain-text',
                html: `<input class="form-control-plaintext" type="text" readonly value="Read-only text"/>`,
            },

            {
                name: 'Password',
                html: `<input class="form-control" type="password"/>`,
            },
            {
                name: 'Password with Placeholder',
                html: `<input class="form-control" type="password" placeholder="Placeholder"/>`,
            },
            {
                name: 'Password with Value',
                html: `<input class="form-control" type="password" value="One Two Three"/>`,
            },
            {
                name: 'Textarea',
                html: `<textarea class="form-control"></textarea>`,
            },
            {
                name: 'Textarea with Placeholder',
                html: `<textarea class="form-control" placeholder="Placeholder"></textarea>`,
            },
            {
              name: 'Textarea with Floating Label',
              html: `
                <div class="form-floating">
                  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                  <label for="floatingTextarea">Comments</label>
                </div>
              `,
            },
            {
                name: 'Textarea with Value',
                html: `<textarea class="form-control">Text area</textarea>`,
            },
            {
                name: 'Disabled Textarea',
                html: `<textarea class="form-control" disabled></textarea>`,
            },
            {
                name: 'Disabled Textarea with Placeholder',
                html: `<textarea class="form-control" placeholder="Placeholder" disabled></textarea>`,
            },
            {
                name: 'Disabled Textarea with Value',
                html: `<textarea class="form-control" disabled>Text area</textarea>`,
            },

            {
                name: 'Select',
                html: `
                    <select class="form-select" aria-label="Default select example">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                `,
            },
            {
              name: 'Select with Floating Label',
              html: `
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label for="floatingSelect">Works with selects</label>
              </div>
              `,
            },
            {
                name: 'Multi-select',
                html: `
                    <select class="form-control" multiple>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                `,
            },
            {
                name: 'Large Select',
                html: `
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                `,
            },
            {
                name: 'Small Select',
                html: `
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                `,
            },
            {
                name: 'Disabled Select',
                html: `
                    <select class="form-select" aria-label="Disabled select example" disabled>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                `,
            },

            {
                name: 'Stacked Checkboxes',
                html: id => `
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1${id}" checked>
                      <label class="form-check-label" for="defaultCheck1${id}">
                        First checkbox
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck2${id}">
                      <label class="form-check-label" for="defaultCheck2${id}">
                        Other checkbox
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck3${id}" disabled>
                      <label class="form-check-label" for="defaultCheck3${id}">
                        Disabled checkbox
                      </label>
                    </div>
                `,
            },

            {
                name: 'Inline Checkboxes',
                html: `
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked>
                  <label class="form-check-label" for="inlineCheckbox1">1</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                  <label class="form-check-label" for="inlineCheckbox2">2</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
                  <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
                </div>
                `,
            },
            {
                name: 'Custom Checkbox Indeterminate',
                html: id => `
                <div class="form-check">
                  <input type="checkbox" class="custom-control-input example-indeterminate-checkbox" id="customCheck1${id}">
                  <label class="custom-control-label" for="customCheck1${id}">Check this custom checkbox</label>
                </div>
                `,
            },

            {
                name: 'Custom Checkbox Indeterminate JS', reviewOnly: true,
                html: `
                    <div>
                        <code>
                            var checkbox = document.querySelector('.example-indeterminate-checkbox');
                            checkbox.indeterminate = true;
                        </code>
                    </div>
                `,
            },

            {
                name: 'Disabled Custom Checkbox',
                html: id => `
                    <div class="form-check">
                      <input type="checkbox" class="custom-control-input" id="customCheckDisabled${id}" disabled>
                      <label class="custom-control-label" for="customCheckDisabled${id}">Check this custom checkbox</label>
                    </div>
                `,
            },

            {
                name: 'Disabled Custom Checkbox Checked',
                html: id => `
                    <div class="form-check">
                      <input type="checkbox" class="custom-control-input" id="customCheckDisabled${id}" disabled checked>
                      <label class="custom-control-label" for="customCheckDisabled${id}">Check this custom checkbox</label>
                    </div>
                `,
            },

            {
                name: 'Switch Off',
                html: id => `
                <div class="form-check form-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch${id}">
                  <label class="custom-control-label" for="customSwitch${id}">Toggle this switch element</label>
                </div>
                `,
            },

            {
                name: 'Switch On',
                html: id => `
                <div class="form-check form-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch${id}" checked>
                  <label class="custom-control-label" for="customSwitch${id}">Toggle this switch element</label>
                </div>
                `,
            },

            {
                name: 'Switch Disabled Off',
                html: id => `
                <div class="form-check form-switch">
                  <input type="checkbox" class="custom-control-input" disabled id="customSwitch${id}">
                  <label class="custom-control-label" for="customSwitch${id}">Disabled switch element</label>
                </div>
                `,
            },

            {
                name: 'Switch Disabled On',
                html: id => `
                <div class="form-check form-switch">
                  <input type="checkbox" class="custom-control-input" disabled checked id="customSwitch${id}">
                  <label class="custom-control-label" for="customSwitch${id}">Disabled switch element</label>
                </div>
                `,
            },

            {
                name: 'Stacked Radio Buttons',
                html: id => `
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1${id}" value="option1" checked>
                      <label class="form-check-label" for="exampleRadios1${id}">
                        Default radio
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2${id}" value="option2">
                      <label class="form-check-label" for="exampleRadios2${id}">
                        Second default radio
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3${id}" value="option3" disabled>
                      <label class="form-check-label" for="exampleRadios3${id}">
                        Disabled radio
                      </label>
                    </div>
                `,
            },

            {
                name: 'Inline Radio Buttons',
                html: `
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked>
                  <label class="form-check-label" for="inlineRadio1">1</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                  <label class="form-check-label" for="inlineRadio2">2</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
                  <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
                </div>
                `,
            },

            {
                name: 'Custom Radios',
                html: id => `
                    <div class="form-check">
                      <input type="radio" id="customRadio1${id}" name="customRadio" class="custom-control-input" checked>
                      <label class="custom-control-label" for="customRadio1${id}">Toggle this custom radio</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" id="customRadio2${id}" name="customRadio" class="custom-control-input">
                      <label class="custom-control-label" for="customRadio2${id}">Or toggle this other custom radio</label>
                    </div>
                `,
            },

            {
                name: 'Range Input',
                html: `
                      <label for="customRange1" class="form-label">Example range</label>
                      <input type="range" class="form-range" id="customRange1">
                `,
            },

            {
              name: 'Disabled Range',
              html: `
                  <label for="disabledRange" class="form-label">Disabled range</label>
                  <input type="range" class="form-range" id="disabledRange" disabled>
              `,
            },

            {
                name: 'Min Max Range',
                html: id => `
                <label for="customRange${id}" class="form-label">Min Max range</label>
                <input type="range" class="form-range" min="0" max="5" id="customRange${id}">
                `,
            },

            {
              name: 'Steps',
              html: id => `
                  <label for="customRange${id}" class="form-label">Steps range</label>
                  <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange${id}">
              `,
            },

            {
                name: 'File Input',
                html: `
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupFile01">Upload</label>
                    <input type="file" class="form-control" id="inputGroupFile01">
                </div>
                `,
            },

            {
                name: 'Custom File',
                html: id => `
                    <div class="input-group mb-3">
                          <input type="file" class="form-control" id="inputGroupFile${id}">
                          <label class="input-group-text" for="inputGroupFile${id}">Upload</label>
                    </div>
                `,
            },

        ]
    },

    {
        name: 'Forms',
        items: [

            {
                name: 'Form',
                html: id => `
                <form class="row g-3">
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4">
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">Password</label>
                  <input type="password" class="form-control" id="inputPassword4">
                </div>
                <div class="col-12">
                  <label for="inputAddress" class="form-label">Address</label>
                  <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                </div>
                <div class="col-12">
                  <label for="inputAddress2" class="form-label">Address 2</label>
                  <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
                </div>
                <div class="col-md-6">
                  <label for="inputCity" class="form-label">City</label>
                  <input type="text" class="form-control" id="inputCity">
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">State</label>
                  <select id="inputState" class="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label for="inputZip" class="form-label">Zip</label>
                  <input type="text" class="form-control" id="inputZip">
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck">
                    <label class="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
              </form>
                `,
            },

            {
                name: 'Inline Form',
                html: id => `
                <form class="row row-cols-lg-auto g-3 align-items-center">
                <div class="col-12">
                  <label class="visually-hidden" for="inlineFormInputGroupUsername">Username</label>
                  <div class="input-group">
                    <div class="input-group-text">@</div>
                    <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Username">
                  </div>
                </div>
              
                <div class="col-12">
                  <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
                  <select class="form-select" id="inlineFormSelectPref">
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="inlineFormCheck">
                    <label class="form-check-label" for="inlineFormCheck">
                      Remember me
                    </label>
                  </div>
                </div>
              
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
                `,
            },

            {
                name: 'Form Group',
                html: id => `
                <form>
                  <div class="form-group">
                    <label for="first${id}">Example label</label>
                    <input type="text" class="form-control" id="first${id}" placeholder="Example input">
                  </div>
                  <div class="form-group">
                    <label for="second${id}">Another label</label>
                    <input type="text" class="form-control" id="second${id}" placeholder="Another input">
                  </div>
                </form>
                `,
            },

            {
                name: 'Form Grid',
                html: `
                <form>
                  <div class="row">
                    <div class="col">
                      <input type="text" class="form-control" placeholder="First name">
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" placeholder="Last name">
                    </div>
                  </div>
                </form>
                `,
            },

            {
                name: 'Form Row',
                html: `
                <form>
                  <div class="form-row">
                    <div class="col">
                      <input type="text" class="form-control" placeholder="First name">
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" placeholder="Last name">
                    </div>
                  </div>
                </form>
                `,
            },

            {
                name: 'Horizontal Form',
                html: id => `
                <form>
                  <div class="form-group row">
                    <label for="inputEmail${id}" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" id="inputEmail${id}" placeholder="Email">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword${id}" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                      <input type="password" class="form-control" id="inputPassword${id}" placeholder="Password">
                    </div>
                  </div>
                </form>
                `,
            },

            {
                name: 'Horizontal Form Label Sizing',
                html: id => `
                <form>
                  <div class="form-group row">
                    <label for="colFormLabelSm${id}" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control form-control-sm" id="colFormLabelSm${id}" placeholder="col-form-label-sm">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="colFormLabel${id}" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" id="colFormLabel${id}" placeholder="col-form-label">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="colFormLabelLg${id}" class="col-sm-2 col-form-label col-form-label-lg">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control form-control-lg" id="colFormLabelLg${id}" placeholder="col-form-label-lg">
                    </div>
                  </div>
                </form>
                `,
            },

            {
                name: 'Form Help Text',
                html: id => `
                <label for="inputPassword${id}">Password</label>
                <input type="password" id="inputPassword${id}" class="form-control" aria-describedby="passwordHelpBlock">
                <small id="passwordHelpBlock" class="form-text text-muted">
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </small>
                `,
            },

            {
                name: 'Disabled Fieldset',
                html: id => `
                <form>
                  <fieldset disabled>
                    <div class="form-group">
                      <label for="disabledTextInput${id}">Disabled input</label>
                      <input type="text" id="disabledTextInput${id}" class="form-control" placeholder="Disabled input">
                    </div>
                    <div class="form-group">
                      <label for="disabledSelect${id}">Disabled select menu</label>
                      <select id="disabledSelect${id}" class="form-control">
                        <option>Disabled select</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="disabledFieldsetCheck${id}" disabled>
                        <label class="form-check-label" for="disabledFieldsetCheck${id}">
                          Can't check this
                        </label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </fieldset>
                </form>
                `,
            },

            {
                name: 'Valid Input',
                html: id => `
                  <form class="was-validated">
                      <label for="validationCustom${id}">Name</label>
                      <input type="text" class="form-control" id="validationCustom${id}" placeholder="Name" value="Mark" required>
                      <div class="valid-feedback">
                        Looks good!
                      </div>
                  </form>
                `,
            },

            {
                name: 'Valid Input with Tooltip',
                html: id => `
                <form class="was-validated mb-5">
                    <div class="form-row">
                        <div class="col">
                            <label for="validationTooltip${id}">Name</label>
                              <input type="text" class="form-control" id="validationTooltip${id}" placeholder="Name" value="Mark" required>
                              <div class="valid-tooltip">
                                Looks good!
                              </div>
                        </div>
                    </div>
                </form>
                `,
            },

            {
                name: 'Valid Textarea',
                html: id => `
                <form class="was-validated">
                    <label for="validationTextarea${id}">Textarea</label>
                    <textarea class="form-control is-invalid" 
                        id="validationTextarea${id}" 
                        placeholder="Required example textarea" 
                        required>Sample message</textarea>
                    <div class="valid-feedback">
                      Looks good!
                    </div>
                  </form>
                `,
            },

            {
                name: 'Valid Checkbox',
                html: id => `
                <form class="was-validated">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customControlValidation${id}" checked required>
                        <label class="custom-control-label" for="customControlValidation${id}">Check this custom checkbox</label>
                        <div class="valid-feedback">Example valid feedback text</div>
                      </div>
                  </form>
                `,
            },

            {
                name: 'Valid Radio Button',
                html: id => `
                <form class="was-validated">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customControlValidationA${id}" name="radio-stacked" required checked>
                        <label class="custom-control-label" for="customControlValidationA${id}">Toggle this custom radio</label>
                      </div>
                      <div class="custom-control custom-radio mb-3">
                        <input type="radio" class="custom-control-input" id="customControlValidationB${id}" name="radio-stacked" required>
                        <label class="custom-control-label" for="customControlValidationB${id}">Or toggle this other custom radio</label>
                        <div class="valid-feedback">More example valid feedback text</div>
                      </div>
                  </form>
                `,
            },

            {
                name: 'Valid Select',
                html: id => `
                <form class="was-validated">
                    <div class="form-group">
                        <select class="custom-select" required>
                          <option value="">Open this select menu</option>
                          <option value="1" selected>One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <div class="valid-feedback">Example valid custom select feedback</div>
                      </div>
                  </form>
                `,
            },

            {
                name: 'Invalid Input',
                html: id => `
                <form class="was-validated">
                      <label for="validationCustom${id}">Name</label>
                      <input type="text" class="form-control" id="validationCustom${id}" placeholder="Name" required>
                      <div class="invalid-feedback">
                        Please provide a name.
                      </div>
                  </form>
                `,
            },

            {
                name: 'Invalid Input with Tooltip',
                html: id => `
                <form class="was-validated mb-5">
                    <div class="form-row">
                        <div class="col">
                            <label for="validationTooltip${id}">Name</label>
                              <input type="text" class="form-control" id="validationTooltip${id}" placeholder="Name" required>
                              <div class="invalid-tooltip">
                                Please provide name.
                              </div>
                        </div>
                    </div>
                </form>
                `,
            },

            {
                name: 'Invalid Textarea',
                html: id => `
                <form class="was-validated">
                    <label for="validationTextarea${id}">Textarea</label>
                    <textarea class="form-control is-invalid" id="validationTextarea${id}" placeholder="Required example textarea" required></textarea>
                    <div class="invalid-feedback">
                      Please enter a message in the textarea.
                    </div>
                  </form>
                `,
            },

            {
                name: 'Invalid Checkbox',
                html: id => `
                <form class="was-validated">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customControlValidation${id}" required>
                        <label class="custom-control-label" for="customControlValidation${id}">Check this custom checkbox</label>
                        <div class="invalid-feedback">Example invalid feedback text</div>
                      </div>
                  </form>
                `,
            },

            {
                name: 'Invalid Radio Button',
                html: id => `
                <form class="was-validated">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customControlValidationA${id}" name="radio-stacked" required>
                        <label class="custom-control-label" for="customControlValidationA${id}">Toggle this custom radio</label>
                      </div>
                      <div class="custom-control custom-radio mb-3">
                        <input type="radio" class="custom-control-input" id="customControlValidationB${id}" name="radio-stacked" required>
                        <label class="custom-control-label" for="customControlValidationB${id}">Or toggle this other custom radio</label>
                        <div class="invalid-feedback">More example invalid feedback text</div>
                      </div>
                  </form>
                `,
            },

            {
                name: 'Invalid Select',
                html: id => `
                <form class="was-validated">
                    <div class="form-group">
                        <select class="custom-select" required>
                          <option value="">Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <div class="invalid-feedback">Example invalid custom select feedback</div>
                      </div>
                  </form>
                `,
            },

            {
                name: 'Invalid File',
                html: id => `
                <form class="was-validated">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="validatedCustomFile${id}" required>
                        <label class="custom-file-label" for="validatedCustomFile${id}">Choose file...</label>
                        <div class="invalid-feedback">Example invalid custom file feedback</div>
                      </div>
                </form>
                `,
            },

        ]
    },

    {
        name: 'Grids',
        items: [
            {
                name: 'Row',
                html: `
                  <div class="row">
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">1</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">2</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">3</div>
                    </div>
                  </div>
                `,
            },
            {
                name: 'Row inside container',
                html: `
                <div class="container">
                  <div class="row">
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">1</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">2</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">3</div>
                    </div>
                  </div>
                </div>
                `,
            },
            {
                name: 'Row inside fluid container',
                html: `
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">1</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">2</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">3</div>
                    </div>
                  </div>
                </div>
                `,
            },
            {
                name: 'Row with no gutters',
                html: `
                  <div class="row no-gutters">
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">1</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">2</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">3</div>
                    </div>
                  </div>
                `,
            },
            {
                name: 'Row inside container with no gutters',
                html: `
                <div class="container">
                  <div class="row no-gutters">
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">1</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">2</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">3</div>
                    </div>
                  </div>
                </div>
                `,
            },
            {
                name: 'Row inside fluid container with no gutters',
                html: `
                <div class="container-fluid">
                  <div class="row no-gutters">
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">1</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">2</div>
                    </div>
                    <div class="col-sm">
                      <div class="bg-dark text-light text-center">3</div>
                    </div>
                  </div>
                </div>
                `,
            },

        ]
    },

    {
        name: 'Images',
        items: [
            {
                name: 'Responsive Image',
                html: `<img src="https://via.placeholder.com/1600x320?text=Responsive+Image" class="img-fluid" alt="Responsive image">`,
            },
            {
                name: 'Image Thumbnail',
                html: `<img src="https://via.placeholder.com/100x100?text=Thumbnail" class="img-thumbnail" alt="Sample image"/>`,
            },
            {
                name: 'Rounded Image Thumbnail',
                html: `<img src="https://via.placeholder.com/100x100?text=Thumbnail" class="rounded" alt="Sample image"/>`,
            },
            {
                name: 'Rounded Circle Image Thumbnail',
                html: `<img src="https://via.placeholder.com/100x100?text=Thumbnail" class="rounded-circle" alt="Sample image"/>`,
            },
            {
                name: 'Rounded Top Image Thumbnail',
                html: `<img src="https://via.placeholder.com/100x100?text=Thumbnail" class="rounded-top" alt="Sample image"/>`,
            },
            {
                name: 'Left Aligned Image Thumbnail',
                html: `<div><img src="https://via.placeholder.com/100x100?text=Thumbnail" class="img-thumbnail float-left" alt="Sample image"/><div class="clearfix"></div></div>`,
            },
            {
                name: 'Right Aligned Image Thumbnail',
                html: `<div><img src="https://via.placeholder.com/100x100?text=Thumbnail" class="img-thumbnail float-right" alt="Sample image"/><div class="clearfix"></div></div>`,
            },
            {
                name: 'Margin-Centered Image Thumbnail',
                html: `<div><img src="https://via.placeholder.com/100x100?text=Thumbnail" class="img-thumbnail mx-auto d-block" alt="Sample image"/><div class="clearfix"></div></div>`,
            },
            {
                name: 'Text-Centered Image Thumbnail',
                html: `<div class="text-center"><img src="https://via.placeholder.com/100x100?text=Thumbnail" class="img-thumbnail" alt="Sample image"/></div>`,
            },

        ]
    },

    {
        name: 'Input Groups',
        items: [
            {
                name: 'Prepended Input Group',
                html: id => `
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon${id}">@</span>
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon${id}">
                </div>
                `,
            },
            {
                name: 'Appended Input Group',
                html: id => `
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon${id}">
                  <span class="input-group-text" id="basic-addon${id}">@example.com</span>
                </div>
                `
            },
            {
                name: 'Prepended Input Group with Label',
                html: id => `
                  <label for="basic-url" class="form-label">Your vanity URL</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon${id}">https://example.com/users/</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon${id}">
                  </div>
                `,
            },
            {
                name: 'Nested Input Group',
                html: `
                  <div class="input-group mb-3">
                    <span class="input-group-text">$</span>
                    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                    <span class="input-group-text">.00</span>
                  </div>
                `,
            },
            {
                name: 'Prepended Textarea',
                html: `
                  <div class="input-group">
                    <span class="input-group-text">With textarea</span>
                    <textarea class="form-control" aria-label="With textarea"></textarea>
                  </div>
                `,
            },
            {
                name: 'Small Input Group',
                html: id => `
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm${id}">Small</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm${id}">
                </div>
                `,
            },
            {
                name: 'Large Input Group',
                html: id => `
                <div class="input-group input-group-lg">
                  <span class="input-group-text" id="inputGroup-sizing-lg">Large</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                </div>
                `,
            },
            {
                name: 'Input Group with Checkbox',
                html: `
                  <div class="input-group mb-3">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with checkbox">
                </div>
                `,
            },
            {
                name: 'Input Group with Radio Button',
                html: `
                  <div class="input-group">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input">
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with radio button">
                </div>
                `,
            },
            {
                name: 'Input Groups with Multiples',
                html: `
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">First and last name</span>
                  </div>
                  <input type="text" aria-label="First name" class="form-control">
                  <input type="text" aria-label="Last name" class="form-control">
                </div>
                `,
            },
            {
                name: 'Multiple Prepended Input Group',
                html: `
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                    <span class="input-group-text">0.00</span>
                  </div>
                  <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                </div>
                `,
            },
            {
                name: 'Multiple Appended Input Group',
                html: `
                <div class="input-group">
                  <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                  <div class="input-group-append">
                    <span class="input-group-text">$</span>
                    <span class="input-group-text">0.00</span>
                  </div>
                </div>
                `,
            },
            {
                name: 'Prepended Button Input Group',
                html: id => `
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button" 
                    id="button-addon${id}">Button</button>
                  </div>
                  <input type="text" class="form-control" placeholder="" 
                  aria-label="Example text with button addon" 
                  aria-describedby="button-addon${id}">
                </div>
                `,
            },
            {
                name: 'Appended Button Input Group',
                html: id => `
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Recipient's username" 
                  aria-label="Recipient's username" 
                  aria-describedby="button-addon${id}">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" 
                    id="button-addon${id}">Button</button>
                  </div>
                </div>
                `,
            },
            {
                name: 'Multiple Prepended Buttons Input Group',
                html: id => `
                <div class="input-group mb-3">
                  <div class="input-group-prepend" id="button-addon${id}">
                    <button class="btn btn-outline-secondary" type="button">Button</button>
                    <button class="btn btn-outline-secondary" type="button">Button</button>
                  </div>
                  <input type="text" class="form-control" placeholder="" 
                  aria-label="Example text with two button addons" 
                  aria-describedby="button-addon${id}">
                </div>
                `,
            },
            {
                name: 'Multiple Appended Buttons Input Group',
                html: id => `
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Recipient's username" 
                  aria-label="Recipient's username with two button addons" 
                  aria-describedby="button-addon${id}">
                  <div class="input-group-append" id="button-addon${id}">
                    <button class="btn btn-outline-secondary" type="button">Button</button>
                    <button class="btn btn-outline-secondary" type="button">Button</button>
                  </div>
                </div>
                `,
            },
            {
                name: 'Prepended Dropdown Input Group',
                html: `
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false">Dropdown</button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <div role="separator" class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Separated link</a>
                    </div>
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with dropdown button">
                </div>
                `,
            },
            {
                name: 'Appended Dropdown Input Group',
                html: `
                <div class="input-group">
                  <input type="text" class="form-control" aria-label="Text input with dropdown button">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false">Dropdown</button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <div role="separator" class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Separated link</a>
                    </div>
                  </div>
                </div>
                `,
            },
            {
                name: 'Prepended Split Dropdown Input Group',
                html: `
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <button type="button" class="btn btn-outline-secondary">Action</button>
                    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" 
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <div role="separator" class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Separated link</a>
                    </div>
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
                </div>
                `,
            },
            {
                name: 'Appended Split Dropdown Input Group',
                html: `
                <div class="input-group">
                  <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-outline-secondary">Action</button>
                    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" 
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <div role="separator" class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Separated link</a>
                    </div>
                  </div>
                </div>
                `,
            },
            {
                name: 'Select Input Group',
                html: id => `
                  <div class="input-group mb-3">
                  <label class="input-group-text" for="inputGroupSelect01">Options</label>
                  <select class="form-select" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                `,
            },
            {
                name: 'Button Select Input Group',
                html: id => `
                  <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button">Button</button>
                  <select class="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                `,
            },
            {
                name: 'Appended File Input Group',
                html: id => `
                <div class="input-group mb-3">
                  <input type="file" class="form-control" id="inputGroupFile${id}">
                  <label class="input-group-text" for="inputGroupFile${id}">Upload</label>
                </div>
                `,
            },
            {
                name: 'Nested File Button Input Group',
                html: id => `
                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon${id}">Button</button>
                  <input type="file" class="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon${id}" aria-label="Upload">
                </div>
                `,
            },
            {
                name: 'Appended File Button Input Group',
                html: id => `
                <div class="input-group">
                  <input type="file" class="form-control" id="inputGroupFile${id}" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                  <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon${id}">Button</button>
                </div>
                `,
            },

        ],
    },
    {
        name: 'Lists',
        items: [
            {
                name: 'Unordered List',
                html: `
                <ul>
                    <li>Unordered</li>
                    <li>List</li>
                    <li>Items</li>
                    <ul>
                        <li>Level 2
                            <ul>
                                <li>Level 3</li>
                            </ul>
                        </li>
                    </ul>
                </ul>
                `,
            },
            {
                name: 'Ordered List',
                html: `
                <ol>
                    <li>Ordered</li>
                    <li>List</li>
                    <li>Items
                        <ol>
                            <li>Level 2
                                <ol>
                                    <li>Level 3</li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ol>
                `,
            },
            {
                name: 'Unstyled List',
                html: `
                <ul class="list-unstyled">
                  <li>Unstyled</li>
                  <li>List</li>
                  <li>Items
                    <ul>
                      <li>Level 2</li>
                    </ul>
                  </li>
                </ul>
                `
            },
            {
                name: 'Inline List',
                html: `
                <ul class="list-inline">
                  <li class="list-inline-item">Inline</li>
                  <li class="list-inline-item">List</li>
                  <li class="list-inline-item">Items</li>
                </ul>
                `,
            },
            {
                name: 'Description List',
                html: `
                <dl class="row">
                  <dt class="col-sm-3">Description lists</dt>
                  <dd class="col-sm-9">A description list is perfect for defining terms.</dd>
                
                  <dt class="col-sm-3">Euismod</dt>
                  <dd class="col-sm-9">
                    <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
                    <p>Donec id elit non mi porta gravida at eget metus.</p>
                  </dd>
                
                  <dt class="col-sm-3">Malesuada porta</dt>
                  <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>
                
                  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
                  <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>
                
                  <dt class="col-sm-3">Nesting</dt>
                  <dd class="col-sm-9">
                    <dl class="row">
                      <dt class="col-sm-4">Nested definition list</dt>
                      <dd class="col-sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
                    </dl>
                  </dd>
                </dl>
                `,
            },
        ]
    },

    {
        name: 'List Groups',
        items: [

            {
                name: 'List Group',
                html: `
                <ul class="list-group">
                  <li class="list-group-item">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                  <li class="list-group-item">Porta ac consectetur ac</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                `,
            },

            {
                name: 'List Group with Active Item',
                html: `
                <ul class="list-group">
                  <li class="list-group-item active">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                  <li class="list-group-item">Porta ac consectetur ac</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                `,
            },

            {
                name: 'List Group with Disabled Item',
                html: `
                <ul class="list-group">
                  <li class="list-group-item disabled" aria-disabled="true">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                  <li class="list-group-item">Porta ac consectetur ac</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                `,
            },

            {
                name: 'List Group with Links',
                html: `
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action active">
                    Cras justo odio
                  </a>
                  <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                  <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
                  <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                  <a href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">Vestibulum at eros</a>
                </div>
                `,
            },

            {
                name: 'List Group with Buttons',
                html: `
                <div class="list-group">
                  <button type="button" class="list-group-item list-group-item-action active">
                    Cras justo odio
                  </button>
                  <button type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
                  <button type="button" class="list-group-item list-group-item-action">Morbi leo risus</button>
                  <button type="button" class="list-group-item list-group-item-action">Porta ac consectetur ac</button>
                  <button type="button" class="list-group-item list-group-item-action" disabled>Vestibulum at eros</button>
                </div>
                `,
            },

            {
                name: 'Flush List Group',
                html: `
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                  <li class="list-group-item">Porta ac consectetur ac</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                `,
            },

            {
                name: 'Horizontal List Group',
                html: `
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                </ul>
                `,
            },

            ...['sm', 'md', 'lg', 'xl'].map(b => {
                return {
                    name: `Horizontal List Group Breaking at "${b}"`,
                    html: `
                    <ul class="list-group list-group-horizontal-${b}">
                      <li class="list-group-item">Cras justo odio</li>
                      <li class="list-group-item">Dapibus ac facilisis in</li>
                      <li class="list-group-item">Morbi leo risus</li>
                    </ul>
                    `,
                };
            }),

            {
                name: 'List Group with Contextual Classes',
                html: `
                <ul class="list-group">
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item list-group-item-primary">A simple primary list group item</li>
                  <li class="list-group-item list-group-item-secondary">A simple secondary list group item</li>
                  <li class="list-group-item list-group-item-success">A simple success list group item</li>
                  <li class="list-group-item list-group-item-danger">A simple danger list group item</li>
                  <li class="list-group-item list-group-item-warning">A simple warning list group item</li>
                  <li class="list-group-item list-group-item-info">A simple info list group item</li>
                  <li class="list-group-item list-group-item-light">A simple light list group item</li>
                  <li class="list-group-item list-group-item-dark">A simple dark list group item</li>
                </ul>
                `,
            },

            {
                name: 'List Group with Actionable Items in Contextual Classes',
                html: `
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                  <a href="#" class="list-group-item list-group-item-action list-group-item-primary">A simple primary list group item</a>
                  <a href="#" class="list-group-item list-group-item-action list-group-item-secondary">A simple secondary list group item</a>
                  <a href="#" class="list-group-item list-group-item-action list-group-item-success">A simple success list group item</a>
                  <a href="#" class="list-group-item list-group-item-action list-group-item-danger">A simple danger list group item</a>
                  <a href="#" class="list-group-item list-group-item-action list-group-item-warning">A simple warning list group item</a>
                  <a href="#" class="list-group-item list-group-item-action list-group-item-info">A simple info list group item</a>
                  <a href="#" class="list-group-item list-group-item-action list-group-item-light">A simple light list group item</a>
                  <a href="#" class="list-group-item list-group-item-action list-group-item-dark">A simple dark list group item</a>
                </div>
                `,
            },

            {
                name: 'List Group with Badges',
                html: `
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Cras justo odio
                    <span class="badge badge-primary badge-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Dapibus ac facilisis in
                    <span class="badge badge-primary badge-pill">2</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Morbi leo risus
                    <span class="badge badge-primary badge-pill">1</span>
                  </li>
                </ul>
                `,
            },

            {
                name: 'List Group with Custom Content',
                html: `
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action active">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">List group item heading</h5>
                      <small>3 days ago</small>
                    </div>
                    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small>Donec id elit non mi porta.</small>
                  </a>
                  <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">List group item heading</h5>
                      <small class="text-muted">3 days ago</small>
                    </div>
                    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small class="text-muted">Donec id elit non mi porta.</small>
                  </a>
                  <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">List group item heading</h5>
                      <small class="text-muted">3 days ago</small>
                    </div>
                    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small class="text-muted">Donec id elit non mi porta.</small>
                  </a>
                </div>
                `,
            },
            {
              name: 'List Group Numbered',
              html: `
                <ol class="list-group list-group-numbered">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Subheading</div>
                    Content for list item
                  </div>
                  <span class="badge bg-primary rounded-pill">14</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Subheading</div>
                    Content for list item
                  </div>
                  <span class="badge bg-primary rounded-pill">14</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Subheading</div>
                    Content for list item
                  </div>
                  <span class="badge bg-primary rounded-pill">14</span>
                </li>
              </ol> `
            },
        ]
    },

    {
        name: 'Modals',
        items: [
            {
                name: 'Modal',
                html: env.render('modals/modal.html', {
                    buttonLabel: 'Open Modal',
                    bodyInclude: 'modals/body-short.html',
                    modalDialogClass: '',
                }),
            },
            {
                name: 'Long Modal',
                html: env.render('modals/modal.html', {
                    buttonLabel: 'Open Long Modal',
                    bodyInclude: 'modals/body-long.html',
                    modalDialogClass: '',
                }),
            },
            {
                name: 'Long Scrollable Modal',
                html: env.render('modals/modal.html', {
                    buttonLabel: 'Open Long Scrollable Modal',
                    bodyInclude: 'modals/body-long.html',
                    modalDialogClass: 'modal-dialog-scrollable',
                }),
            },
            {
                name: 'Wide Modal',
                html: env.render('modals/modal.html', {
                    buttonLabel: 'Open Wide Modal',
                    bodyInclude: 'modals/body-short.html',
                    modalDialogClass: 'modal-lg',
                }),
            },
            {
                name: 'Narrow Modal',
                html: env.render('modals/modal.html', {
                    buttonLabel: 'Open Narrow Modal',
                    bodyInclude: 'modals/body-short.html',
                    modalDialogClass: 'modal-sm',
                }),
            },
            {
                name: 'Vertically Centered Modal',
                html: env.render('modals/modal.html', {
                    buttonLabel: 'Open Vertically Centered Modal',
                    bodyInclude: 'modals/body-short.html',
                    modalDialogClass: 'modal-dialog-centered',
                }),
            },
            {
                name: 'Long Vertically Centered Modal',
                html: env.render('modals/modal.html', {
                    buttonLabel: 'Open Long Vertically Centered Modal',
                    bodyInclude: 'modals/body-long.html',
                    modalDialogClass: 'modal-dialog-centered',
                }),
            },
        ]
    },

    {
        name: 'Navs',
        items: [
            // TODO port bootstrap site examples for navs
            {
                name: 'Breadcrumbs',
                html: `
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">Fruit</a>
                    </li>
                    <li class="breadcrumb-item active">Pears</li>
                  </ul>
                `,
            },
            {
                name: 'Nav',
                html: `
                  <ul class="nav">
                    <li class="nav-item">
                      <a class="nav-link active" href="#">HTML</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">CSS</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">JavaScript</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Preview</a>
                    </li>
                  </ul>
                `,
            },
            {
                name: 'Vertical Nav Menu',
                html: `
                  <nav class="nav flex-column">
                    <a class="nav-link active" href="#">HTML</a>
                    <a class="nav-link" href="#">CSS</a>
                    <a class="nav-link" href="#">JavaScript</a>
                    <a class="nav-link" href="#">Preview</a>
                  </nav>
                `,
            },
            {
                name: 'Nav with Tabs',
                html: `
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a class="nav-link active" href="#">HTML</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">CSS</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">JavaScript</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Preview</a>
                    </li>
                  </ul>
                `,
            },
            {
                name: 'Nav with Pills',
                html: `
                  <ul class="nav nav-pills">
                    <li class="nav-item">
                      <a class="nav-link active" href="#">HTML</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">CSS</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">JavaScript</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Preview</a>
                    </li>
                  </ul>
                `,
            },
            {
              name: 'Nav Fill and Justify',
              html: `
              <nav class="nav nav-pills nav-fill">
                <a class="nav-link active" aria-current="page" href="#">Active</a>
                <a class="nav-link" href="#">Much longer nav link</a>
                <a class="nav-link" href="#">Link</a>
                <a class="nav-link disabled">Disabled</a>
              </nav>
              `
            },
            {
                name: 'Vertical Nav with Pills',
                html: `
                  <ul class="nav nav-pills flex-column">
                    <li class="nav-item">
                      <a class="nav-link active" href="#">HTML</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">CSS</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">JavaScript</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Preview</a>
                    </li>
                  </ul>
                `,
            },

            {
                name: 'Nav Panel', block: true,
                html: id => `
                <ul class="nav nav-tabs" id="myTab${id}" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab${id}" data-bs-toggle="tab" href="#home${id}" role="tab" 
                    aria-controls="home${id}" aria-selected="true">First Tab</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="profile-tab${id}" data-bs-toggle="tab" href="#profile${id}" role="tab" 
                    aria-controls="profile${id}" aria-selected="false">Middle Tab</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="contact-tab${id}" data-bs-toggle="tab" href="#contact${id}" role="tab" 
                    aria-controls="contact${id}" aria-selected="false">Last Tab</a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent${id}">
                  <div class="tab-pane fade show active" id="home${id}" role="tabpanel" aria-labelledby="home-tab${id}">Initial</div>
                  <div class="tab-pane fade" id="profile${id}" role="tabpanel" aria-labelledby="profile-tab${id}">Intermediate</div>
                  <div class="tab-pane fade" id="contact${id}" role="tabpanel" aria-labelledby="contact-tab${id}">Final</div>
                </div>
                `,
            },

            {
                name: 'Nav with Tabs and Dropdown',
                html: id => `
                  <ul id="clothing-nav${id}" class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" href="#home${id}" id="home-tab${id}" role="tab" data-bs-toggle="tab" aria-controls="home${id}" aria-expanded="true">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#hats${id}" role="tab" id="hats-tab${id}" data-bs-toggle="tab" aria-controls="hats${id}">Hats</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                        aria-expanded="false">
                        Footwear
                      </a>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#dropdown-shoes${id}" role="tab" id="dropdown-shoes-tab${id}" data-bs-toggle="tab" aria-controls="dropdown-shoes${id}">Shoes</a>
                        <a class="dropdown-item" href="#dropdown-boots${id}" role="tab" id="dropdown-boots-tab${id}" data-bs-toggle="tab" aria-controls="dropdown-boots${id}">Boots</a>
                      </div>
                    </li>
                  </ul>
                  <div id="clothing-nav-content${id}" class="tab-content">
                    <div role="tabpanel" class="tab-pane fade show active" id="home${id}" aria-labelledby="home-tab${id}">
                      <p>Welcome home! Click on the tabs to see the content change.</p>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="hats${id}" aria-labelledby="hats-tab${id}">
                      <p>A hat is a head covering. It can be worn for protection against the elements, ceremonial reasons, religious reasons,
                        safety, or as a fashion accessory.</p>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="dropdown-shoes${id}" aria-labelledby="dropdown-shoes-tab${id}">
                      <p>A shoe is an item of footwear intended to protect and comfort the human foot while doing various activities. Shoes
                        are also used as an item of decoration.</p>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="dropdown-boots${id}" aria-labelledby="dropdown-boots-tab${id}">
                      <p>A boot is a type of footwear and a specific type of shoe. Most boots mainly cover the foot and the ankle, while
                        some also cover some part of the lower calf. Some boots extend up the leg, sometimes as far as the knee or even
                        the hip.
                      </p>
                    </div>
                  </div>
                `,
            },

        ]
    },

    {
        name: 'Navbars',
        items: [
            // TODO port bootstrap site examples for navbars
            {
                name: 'Navbar',
                html: env.render('navbars/navbar.html', {
                    navbarClass: 'navbar-expand-sm',
                }),
            },
            {
                name: 'Navbar Light',
                html: env.render('navbars/navbar.html', {
                    navbarClass: 'navbar-expand-sm navbar navbar-light',
                }),
            },
            {
                name: 'Navbar Dark',
                html: env.render('navbars/navbar.html', {
                    navbarClass: 'navbar-expand-sm navbar-dark bg-primary',
                }),
            },
        ]
    },

    {
        name: 'Paginations',
        items: [
            {
                name: 'Pagination',
                html: `
                  <nav>
                    <ul class="pagination">
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">1</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">2</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">3</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">4</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">5</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">6</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">7</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                `,
            },
            {
                name: 'Pagination 2',
                html: `
                  <nav>
                    <ul class="pagination">
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">1</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">2</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">3</a>
                      </li>
                      <li class="page-item active">
                        <a href="#" class="page-link">4</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">5</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">6</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">7</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                `,
            },
            {
                name: 'Pagination 3',
                html: `
                  <nav>
                    <ul class="pagination pagination-lg">
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">1</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">2</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">3</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">4</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">5</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">6</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">7</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                `,
            },
            {
                name: 'Navigation 4',
                html: `
                  <nav>
                    <ul class="pagination">
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">1</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">2</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">3</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">4</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">5</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">6</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">7</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                `,
            },
            {
                name: 'Pagination 5',
                html: `
                  <nav>
                    <ul class="pagination pagination-sm">
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">1</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">2</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">3</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">4</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">5</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">6</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">7</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                `,
            },
        ]
    },

    {
        name: 'Popovers',
        items: [
            {
                name: 'Popover JS', reviewOnly: true,
                html: `
                <div>
                    <code>
                        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
                        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
                          return new bootstrap.Popover(popoverTriggerEl)
                        });
                    </code>
                </div>
                `,
            },
            {
                name: 'Popover',
                html: `<button type="button" class="btn btn-primary" data-bs-toggle="popover" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>`,
            },
            {
                name: 'Dismissible Popover',
                html: `<a tabindex="0" class="btn btn-primary" role="button" data-bs-toggle="popover" data-trigger="focus" title="Dismissible popover" data-bs-content="And here's some amazing content. It's very engaging. Right?">Dismissible popover</a>`,
            },
            {
                name: 'Top Popover',
                html: `<button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Popover on top</button>`,
            },
            {
                name: 'Right Popover',
                html: `<button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Popover on right</button>`,
            },
            {
                name: 'Bottom Popover',
                html: `<button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Popover on bottom</button>`,
            },
            {
                name: 'Left Popover',
                html: `<button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Popover on left</button>`,
            },
            {
                name: 'Disable Element Popover',
                html: `
                    <span class="d-inline-block" data-bs-toggle="popover" data-bs-content="Disabled popover">
                      <button class="btn btn-primary" style="pointer-events: none;" type="button" disabled>Disabled button</button>
                    </span>
                `,
            },

        ]
    },

    {
        name: 'Progress',
        items: [

            ...['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger', 'Light', 'Dark'].map(type => {
                return [
                    {
                        name: `${type} Progress Bar`,
                        html: `
                            <div class="progress">
                              <div class="progress-bar bg-${type.toLowerCase()}" role="progressbar" style="width: 42%" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100">42%</div>
                            </div>
                        `,
                    },
                    {
                        name: `${type} Striped Progress Bar`,
                        html: `
                          <div class="progress">
                            <div class="progress-bar progress-bar-striped bg-${type.toLowerCase()}" role="progressbar" style="width: 42%" aria-valuenow="42" aria-valuemin="0"
                              aria-valuemax="100"></div>
                          </div>
                        `,
                    },
                    {
                        name: `${type} Striped Animated Progress Bar`,
                        html: `
                          <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-${type.toLowerCase()}" role="progressbar" aria-valuenow="42" aria-valuemin="0"
                              aria-valuemax="100" style="width: 42%"></div>
                          </div>
                        `,
                    },
                ];
            }).reduce((a, b) => a.concat(b)),

            {
                name: 'Thin Progress Bar',
                html: `
                <div class="progress my-3" style="height: 1px;">
                  <div class="progress-bar" role="progressbar" style="width: 42%;" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `,
            },

            {
                name: 'Multi-Status Progress Bar',
                html: `
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                  <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                  <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `,
            },
        ]
    },

    {
        name: 'Tables',
        items: [
            {
                name: 'Table', block: true,
                html: `
                <table class="table">
                  <thead>
                    <tr>
                      <th>Table</th>
                      <th>Default</th>
                      <th>Style</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Footer 1</th>
                      <th>Footer 2</th>
                      <th>Footer 3</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                  </tbody>
                </table>
                `,
            },
            {
                name: 'Small Table', block: true,
                html: `
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Table</th>
                      <th>Default</th>
                      <th>Small</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Footer 1</th>
                      <th>Footer 2</th>
                      <th>Footer 3</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                  </tbody>
                </table>
                `,
            },
            {
                name: 'Table with Dark Header', block: true,
                html: `
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th>Table</th>
                      <th>Dark</th>
                      <th>Header</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Footer 1</th>
                      <th>Footer 2</th>
                      <th>Footer 3</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                  </tbody>
                </table>
                `,
            },
            {
                name: 'Table with Light Header', block: true,
                html: `
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th>Table</th>
                      <th>Dark</th>
                      <th>Header</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Footer 1</th>
                      <th>Footer 2</th>
                      <th>Footer 3</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                  </tbody>
                </table>
                `,
            },
            {
                name: 'Table Dark',
                html: `
                  <table class="table table-dark">
                    <thead>
                      <tr>
                        <th>Table</th>
                        <th>Dark</th>
                        <th>Full</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Footer 1</th>
                        <th>Footer 2</th>
                        <th>Footer 3</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                    </tbody>
                  </table>
                `,
            },
            {
                name: 'Table Striped',
                html: `
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Table</th>
                        <th>Striped</th>
                        <th>Style</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Footer 1</th>
                        <th>Footer 2</th>
                        <th>Footer 3</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                    </tbody>
                  </table>
                `,
            },
            {
                name: 'Table Striped Dark',
                html: `
                  <table class="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th>Table</th>
                        <th>Striped</th>
                        <th>Dark</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Footer 1</th>
                        <th>Footer 2</th>
                        <th>Footer 3</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                    </tbody>
                  </table>
                `,
            },
            {
                name: 'Table with Border',
                html: `
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Table</th>
                        <th>Default</th>
                        <th>Borders</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Footer 1</th>
                        <th>Footer 2</th>
                        <th>Footer 3</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                    </tbody>
                  </table>
                `,
            },
            {
                name: 'Dark Table with Border',
                html: `
                  <table class="table table-bordered table-dark">
                    <thead>
                      <tr>
                        <th>Table</th>
                        <th>Dark</th>
                        <th>Borders</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Footer 1</th>
                        <th>Footer 2</th>
                        <th>Footer 3</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                    </tbody>
                  </table>
                `,
            },
            {
                name: 'Borderless Table', block: true,
                html: `
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th>Table</th>
                      <th>Borderless</th>
                      <th>Style</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Footer 1</th>
                      <th>Footer 2</th>
                      <th>Footer 3</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                  </tbody>
                </table>
                `,
            },
            {
                name: 'Dark Borderless Table', block: true,
                html: `
                <table class="table table-borderless table-dark">
                  <thead>
                    <tr>
                      <th>Table</th>
                      <th>Borderless</th>
                      <th>Dark</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Footer 1</th>
                      <th>Footer 2</th>
                      <th>Footer 3</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                  </tbody>
                </table>
                `,
            },
            {
                name: 'Table with Hover',
                html: `
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Table</th>
                        <th>Hoverable</th>
                        <th>Rows</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Footer 1</th>
                        <th>Footer 2</th>
                        <th>Footer 3</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                    </tbody>
                  </table>
                `,
            },
            {
                name: 'Dark Table with Hover',
                html: `
                  <table class="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th>Table</th>
                        <th>Hoverable</th>
                        <th>Dark</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Footer 1</th>
                        <th>Footer 2</th>
                        <th>Footer 3</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                    </tbody>
                  </table>
                `,
            },
            {
                name: 'Table with Contextual Rows',
                html: `
                <table class="table">
                    <thead>
                        <tr>
                        <th>Contextual</th>
                        <th>Rows</th>
                        <th>Default</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-active"><th scope="row">Active</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-default"><th scope="row">Default</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-primary"><th scope="row">Primary</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-secondary"><th scope="row">Secondary</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-success"><th scope="row">Success</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-info"><th scope="row">Info</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-warning"><th scope="row">Warning</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-danger"><th scope="row">Danger</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-light"><th scope="row">Light</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-dark"><th scope="row">Dark</th><td>Cell</td><td>Cell</td></tr>
                        
                    </tbody>
                </table>
                `,
            },
            {
                name: 'Dark Table with Contextual Rows',
                html: `
                <table class="table table-dark">
                    <thead>
                        <tr>
                        <th>Contextual</th>
                        <th>Rows</th>
                        <th>Dark</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-active"><th scope="row">Active</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="table-default"><th scope="row">Default</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="bg-primary"><th scope="row">Primary</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="bg-secondary"><th scope="row">Secondary</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="bg-success"><th scope="row">Success</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="bg-info"><th scope="row">Info</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="bg-warning"><th scope="row">Warning</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="bg-danger"><th scope="row">Danger</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="bg-light text-dark"><th scope="row">Light</th><td>Cell</td><td>Cell</td></tr>
                        <tr class="bg-dark"><th scope="row">Dark</th><td>Cell</td><td>Cell</td></tr>
                        
                    </tbody>
                </table>
                `,
            },

        ]
    },

    {
        name: 'Tooltips',
        items: [
            {
                name: 'Tooltip JS', reviewOnly: true,
                html: `
                <code>
                    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                      return new bootstrap.Tooltip(tooltipTriggerEl)
                    });
                </code>
                `,
            },
            {
                name: 'Inline Tooltip',
                html: `
                <a target="_blank" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Helpful Text">Tooltip Link</a>
                `,
            },
            {
                name: 'Top Tooltip',
                html: `<button type="button" class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top shoes" >Top Tooltip Button</button>`,
            },
            {
                name: 'Right Tooltip',
                html: `<button type="button" class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" title="Right shoes" >Right Tooltip Button</button>`,
            },
            {
                name: 'Bottom Tooltip',
                html: `<button type="button" class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Bottom shoes" >Bottom Tooltip Button</button>`,
            },
            {
                name: 'Left Tooltip',
                html: `<button type="button" class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="left" title="Left shoes" >Left Tooltip Button</button>`,
            },
            {
                name: 'Disabled Element Tooltip',
                html: `
                <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Disabled tooltip">
                  <button class="btn btn-primary" style="pointer-events: none;" type="button" disabled>Disabled button</button>
                </span>
                `,
            },

        ]
    },

];

structures.forEach((group, i) => {
    group.items.forEach((structure, j) => {
        if (typeof structure.html === 'function') {
            structure.html = structure.html.call(structure, `${i}-${j}`);
        }
        structure.html = sanitizeHtml(structure.html, {allowedTags: false, allowedAttributes: false});
    });
});

module.exports = structures;
