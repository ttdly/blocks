const fs = require("fs"),
      shiki = require("shiki");
const highlighter = shiki.getHighlighter({
  theme: 'nord',
  langs: ['javascript', 'java', 'html', "rust"]
}).then((highlighter) => {
  fs.readFile("./html/bfc.html", "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      return false;
    }
    const out = highlighter.codeToHtml(data, {lang: 'html', theme: 'nord'});
    // fs.mkdirSync('./convert/html/bfc.html')
    fs.writeFileSync('./convert/html/bfc.html',out, {
      encoding:"utf-8"
    });
  })
})
