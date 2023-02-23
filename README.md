# Blocks
将代码片段并转成html并以此生成网站以供浏览代码片段
# 使用
进入项目目录后
1. 运行`pnpm install`
2. 运行`node ./build.js`
3. 使用LiveServer或者其他类似功能插件访问./dist/index.html
# 目录
assets 存放CSS、图片  
code 代码片段主目录  
dist 静态文件输出目录  
config.js  配置文件  
build.js  静态文件生成脚本

# 注意
代码高亮用的是shiki，所以语言种类应该以shiki的为准，不然高亮不了

# 链接
[shiki languages](https://github.com/shikijs/shiki/blob/main/docs/languages.md)  
[shiki themes](https://github.com/shikijs/shiki/blob/main/docs/themes.md)