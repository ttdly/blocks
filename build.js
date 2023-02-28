const fs = require("fs-extra"),
      shiki = require("shiki");
const {output, baseDir, languages, head, foot} = require("./config");
const uris = {};
fs.removeSync(output);
shiki.getHighlighter({
  theme: 'github-light',
  langs: languages
}).then((highlighter) => {
  for (const i of languages) {
    let dir = new Array();
    for (const fileName of [...fs.readdirSync(`${baseDir}/${i}/`)]) {
      if (fileName === "README.md") continue;
      code2html(fileName, highlighter, i);
      dir.push(fileName);
    }
    uris[i] = dir;
    if (!fs.existsSync(`${output}/`)) {
      fs.mkdirSync(`${output}/`)
    };
    create_uris(uris);
  }
});
// 将代码转为HTML文件
function code2html (fileName, highlighter, cate) {
  fs.readFile(`${baseDir}/${cate}/${fileName}`, "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      return false;
    }
    let out = highlighter.codeToHtml(data, {lang: cate, theme: 'github-light'});
    if (!fs.existsSync(`${output}/${cate}/`)) {
      fs.mkdirSync(`${output}/${cate}/`)
    };
    out = `${head}${out}${foot}`
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
// 生成目录文件
function create_uris(uris) {
  fs.writeFileSync("./dist/uris.js", `const uri = ${JSON.stringify(uris)};`)
}