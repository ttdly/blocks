const fs = require("fs"),
      shiki = require("shiki"),
      inputDir = ["html", "js", "java"];
const Output = "./dist"
const baseDir = `./code`;
shiki.getHighlighter({
  theme: 'github-light',
  langs: ['js', 'java', 'html', "rust"]
}).then((highlighter) => {
  for (const i of inputDir) {
    for (const fileName of [...fs.readdirSync(`${baseDir}/${i}/`)]) {
      if (fileName === "README.md") continue;
      code2html(fileName, highlighter, i);
    }
  }
});
function code2html (fileName, highlighter, cate) {
  fs.readFile(`${baseDir}/${cate}/${fileName}`, "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      return false;
    }
    let out = highlighter.codeToHtml(data, {lang: cate, theme: 'github-light'});
    if (!fs.existsSync(`${Output}/`)) {
      fs.mkdirSync(`${Output}/`)
    };
    if (!fs.existsSync(`${Output}/${cate}/`)) {
      fs.mkdirSync(`${Output}/${cate}/`)
    };
    out = `<link rel="stylesheet" href="../../assets/css/code.css">\r\n ${out}`
    fileName = fileName.replace(`.${cate}`,'.html');
    fs.writeFileSync(`${Output}/${cate}/${fileName}`,out, {
      encoding:"utf-8"
    });
  })
}
