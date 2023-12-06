import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = path.resolve(fileURLToPath(import.meta.url))
const __dirname = path.resolve(path.dirname(__filename))
const dist = path.resolve(__dirname + '/dist') // папка "D:\domains\portfolio.ai\.projects\vue3-table\dist" без слеша на конце

const arrPaths = __dirname.split('\\')
const curDirName = arrPaths[arrPaths.length - 1] // "vue3-table"
const preCurDirName = arrPaths[arrPaths.length - 2] // ".projects"
// const curDirName = path.basename(path.resolve()) // "vue3-table"

const indexOrig = path.resolve(dist + '/index.html')

let data = fs.readFileSync(indexOrig, 'utf8')
const pathOldJs = data.match(/src="(.*?)"/)[1] // "/assets/index-2ceb335d.js"
const pathOldCss = data.match(/href="(.*?)"/)[1] // "/assets/index-1da8cd0c.css"

data = data.replace(pathOldJs, `/${preCurDirName}/${curDirName}/dist` + pathOldJs)
data = data.replace(pathOldCss, `/${preCurDirName}/${curDirName}/dist` + pathOldCss)

console.log('data', data)
// fs.writeFileSync(indexOrig, data) // Перезаписываем данные в файле
// fs.rename(indexOrig, indexTpl, () => {}) // изменяем формат файла

console.log('Готово!')
