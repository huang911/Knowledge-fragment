Vue.set(target, propertyName/index, value)

向响应式对象中添加一个property, 并确保这个新property同样是响应式，且触发视图更新。它必须用于向响应式对象上添加新property, 因为Vue无法探测普通的property新增property

target不能是Vue实例，或者Vue实例的根数据对象

```
vm.$set(target, propertyName/index, value)
```

- {Object | Array} target
- {string | number} propertyName/index
- {any}value

返回值： 设置的值

全局的Vue.set的别名

```
const http = require('http')
const fs = require('fs')
const cheerio = require('cheerio')
const xlsx = require('node-xlsx')
const request = require('superagent')
const url = 'http://quotes.money.163.com/f10/zycwzb_600519.html#01c01'

let list = []
let start = () => {
  request.get(url)
    .end((err, res) => {
      if (!err) {
        let html = res.text; // 获取到数据
        let $ = cheerio.load(html, { decodeEntities: false}) // 加载获取到的 html 数据
        $item = $('.col_r').find('.table_bg001')
        if ($item.length > 0) {
          $item.each((i, e) => {
            let data = []; // 用来存储抓取的数据
            const $e = $(e) // 缓存
            // data.push($e.find('th'))
            data.push($e.find('tbody tr:eq(11) td'))
            console.log('=========', $e.find('tbody tr:eq(11) td').text())
            list.push(data)
          })
        }
        // 通过 xlsx 模块将数据转化成 buffer 对象
        let buf = xlsx.build([{name: '净利润(扣除非经常性损益后)(万元)'}, { data: list}])
        // 将 buffer 写入到 净利润(扣除非经常性损益后)(万元).xlsx 中（导出)
        fs.writeFile('净利润(扣除非经常性损益后)(万元).xlsx', buf, (err) => {
          if (err) throw err;
          console.log('File is saved!')
        })
      } else {
        console.log('get Data error')
      }
    })
}
start()
```

