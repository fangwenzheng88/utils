import { execSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'

execSync('git fetch --tags')
const tagArr = execSync('git tag', {
  encoding: 'utf-8',
})
  .split('\n')
  .filter((tag) => /^v/.test(tag))

let selectContent = fs.readFileSync('./scripts/select.js', {
  encoding: 'utf8',
})

selectContent = selectContent.replace('VERSIONS', JSON.stringify(['dev', ...tagArr]))

fs.writeFileSync('./docs/select.js', selectContent, {
  encoding: 'utf8',
})

for (const tag of tagArr) {
  if (fs.existsSync(`docs/${tag}/`)) {
    console.log('已存在历史版本文档：', tag)
    // eslint-disable-next-line no-continue
    continue
  }
  console.log('生成历史版本文档：', tag)
  execSync('git reset --hard')
  execSync('git clean -f')
  execSync(`git checkout ${tag}`, {
    encoding: 'utf-8',
  })
  execSync('pnpm i')
  execSync(`pnpm run docs --out docs/${tag}`)
}

function getAllFilesInDirectory(directory) {
  let files = []
  const items = fs.readdirSync(directory)

  items.forEach((item) => {
    const itemPath = path.join(directory, item)
    const stats = fs.statSync(itemPath)

    if (stats.isDirectory()) {
      // 递归读取文件夹
      files = files.concat(getAllFilesInDirectory(itemPath))
    } else {
      // 文件
      files.push(itemPath)
    }
  })

  return files
}
const files = getAllFilesInDirectory('docs').filter((item) => /\.html$/.test(item))

for (const filePath of files) {
  let content = fs.readFileSync(filePath, {
    encoding: 'utf8',
  })
  const appendJs = `\n<script src="${path.join(path.relative(path.dirname(filePath), 'docs'), 'select.js')}"></script>`

  if (content.indexOf(appendJs) === -1) {
    content += appendJs
  }
  fs.writeFileSync(filePath, content, {
    encoding: 'utf8',
  })
}
