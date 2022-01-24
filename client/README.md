```js
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// const ts = Math.floor(1643012098752 / 1000)
// const createdAt = dayjs.unix(ts)
const ts = 1643012098752
const createdAt = dayjs(ts)

const now = dayjs()

const timeFromTs = now.to(createdAt)

console.log(timeFromTs)
console.log('D/MM/YYYY >>', createdAt.format('D MMM YYYY h:m:s A'))

// console.log(timeFromTs.format('L LT'))
```
