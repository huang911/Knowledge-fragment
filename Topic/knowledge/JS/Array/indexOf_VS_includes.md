

### 1.indexOf（）

`**indexOf()**`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

语法：

```
arr.indexOf(searchElement[, fromIndex])
```

```
searchElement
```

要查找的元素

`fromIndex` 可选

开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

### 2.includes（）

`**includes()**` 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

语法

```
arr.includes(valueToFind[, fromIndex])
```

```
valueToFind
```

需要查找的元素值。

**Note:**  使用 `includes()`比较字符串和字符时是区分大小写。

`fromIndex` 可选

从`fromIndex` 索引处开始查找 `valueToFind`。如果为负值，**则按升序从 `array.length + fromIndex` 的索引开始搜** （即使从末尾开始往前跳 `fromIndex` 的绝对值个索引，然后往后搜寻）。默认为 0。

##### 返回值

返回一个布尔值 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) ，如果在数组中找到了（如果传入了 `fromIndex` ，表示在 `fromIndex` 指定的索引范围中找到了）则返回 `true` 。

#### 特殊：

```js
[1, 2, NaN].includes(NaN); // true
[1, 2, NaN].indexOf(NaN) === -1; //true

[,,NaN].indexOf(undefined) === -1 //true
[,,NaN].includes(undefined)//true
```

