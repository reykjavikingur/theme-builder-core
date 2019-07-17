(() => {
    enableCopyButtons();
})();

function enableCopyButtons() {
    Array.from(document.querySelectorAll('.copy-to-clipboard')).forEach(copyButton => {
        copyButton.addEventListener('click', event => {
            navigator.clipboard.writeText(copyButton.dataset.content)
                .then(r => {
                    console.log('copied');
                }, e => {
                    console.error('failed to copy', e);
                })
            ;
        });
    });
}
