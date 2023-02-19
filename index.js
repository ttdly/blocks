const fs = require("fs"),
      shiki = require("shiki"),
      inputDir = ["html", "javascript", "java"];
shiki.getHighlighter({
  theme: 'nord',
  langs: ['javascript', 'java', 'html', "rust"]
}).then((highlighter) => {
  for (const i of inputDir) {
    const baseDir = `./code/${i}/`;
    for (const fileName of [...fs.readdirSync(baseDir)]) {
      if (fileName === "README.md") continue;
      console.log(baseDir + fileName);
    }
  }
});
function code2html (fileName) {
  fs.readFile("fileName", "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      return false;
    }
    const out = highlighter.codeToHtml(data, {lang: 'html', theme: 'nord'});
    // fs.mkdirSync('./convert/html/')
    fs.writeFileSync('./convert/html/bfc.html',out, {
      encoding:"utf-8"
    });
  })
}
