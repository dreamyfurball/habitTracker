const express = require('express')
const path = require('path')

const app = express()
const port = 3000

// set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// serve static files (css, images, etc.)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')   // looks for views/index.ejs
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
