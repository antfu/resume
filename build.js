const fs = require('fs-extra')
const axios = require('axios')

;(async()=>{
  await fs.remove('./dist')
  await fs.ensureDir('./dist')

  const gist = 'antfu/ceb04ede6daf195eaf51e32b6aef5d4e'
  console.log(`Downloading resume... [${gist}]`)
  const { data: resume } = await axios.get(`https://gist.githubusercontent.com/${gist}/raw/resume.json`)
  console.log('Rendering...')
  const html = await require("./index.js").render(resume)
  console.log('Copy files...')
  fs.writeFileSync('./dist/index.html', html, 'utf-8')
  fs.copy('./static', './dist', {recursive: true})
  console.log('Done')
})()
.catch(e=>{throw e})
