class Noret {

    loadCss(filePath) {
        return fetch(filePath, {mode: 'no-cors'})
            .then(response => response.text())
            .then(str => {
                var parser = new window.DOMParser();
                var html = parser.parseFromString(str, "text/html");
                document.head.innerHTML += '<style>'+html.body.innerHTML+'</style>';
            }
        );
    }

    loadHtml(filePath, where = document.body, callback) {
        fetch(filePath, {mode: 'no-cors'})
            .then(response => response.text())
            .then(str => {
                var parser = new window.DOMParser();
                var html = parser.parseFromString(str, "text/html");
                where.innerHTML += html.body.innerHTML;
            })
            .then(() => {             
                if (typeof callback === 'function') callback();
            });
    }

    loadTemplate(fileName, where = document.body, callback) {
        this.loadCss(fileName+'.css')
        this.loadHtml(fileName+'.html', where, callback)
    }

}

