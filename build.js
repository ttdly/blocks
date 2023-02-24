const fs = require("fs-extra"),
      shiki = require("shiki");
const {output, baseDir, languages} = require("./config");

fs.removeSync(output);
shiki.getHighlighter({
  theme: 'github-light',
  langs: languages
}).then((highlighter) => {
  for (const i of languages) {
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
    if (!fs.existsSync(`${output}/`)) {
      fs.mkdirSync(`${output}/`)
    };
    if (!fs.existsSync(`${output}/${cate}/`)) {
      fs.mkdirSync(`${output}/${cate}/`)
    };
    out = `<link rel="stylesheet" href="../assets/css/code.css">\r\n ${out}`
    fileName = fileName.replace(`.${cate}`,'.html');
    fs.writeFileSync(`${output}/${cate}/${fileName}`,out, {
      encoding:"utf-8"
    });
    copyConfig();
  })
}
// 复制静态资源
function copyConfig() {
  fs.copyFileSync("./index.html", "./dist/index.html");
  fs.copySync("./assets","./dist/assets")
}