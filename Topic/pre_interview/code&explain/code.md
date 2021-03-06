

##### 1.扁平化处理

```js
 var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
	let a = [];
	function fn(arr) {
		arr.forEach(item => {
			if (Array.isArray(item)) {
				fn(item);
			} else {
				a.push(item);
			}
		});
		return Array.from(new Set(a)).sort((a,b)=> a-b);
	}

	console.log(fn(arr));
```

##### 2.对象转换成对应数组

```js
/*
   Object = {1:222, 2:456, 5:777}
   转换为： 对应年月的收益 [222, 456, null, null, 777, null, null, null, null, null, null, null, null]
 */
// 最原始的for循环
function objectTransfrom(object) {
    let arr = new Array(13).fill(null);
    for (let key in object) {
        for (let i = 0; i < arr.length; i++) {
            if (+key === i) {
                arr[i] = object[key];
            }
        }
    }
    return arr.slice(1);
}
let a = objectTransfrom({1:222, 2:456, 5:777});
console.log(a);

//forEach(会遍历数组, 循环体内没有返回值,forEach()循环可以改变原来数组的内容, forEach()有三个参数, 第一个参数是当前元素, 第二个参数是当前元素的索引, 第三个参数是当前元素所属的数组.)

//map(map()的主要作用, 其实是创建一个新的数组, map()的参数和forEach()是一样的)
//什么都没有的数组元素叫做槽(slot)稀疏数组，一般方法都会忽略，可以用 Array.prototype.fill、Array.from 或者 [...arr] 的方式转换。
function objectTransfrom2(object) {
    let arr = new Array(13).fill(null)
    let temp = arr.map((item, index) => object[index] ? object[index] :  null).slice(1);
        return temp;
    }
let a2 = objectTransfrom2({1:222, 2:456, 5:777});
console.log(a2);

//filter()参数和forEach()也是一样的, filter()主要是过滤的, 用来过滤数组中不满足条件的元素, 把满足条件的元素放到新的数组里, 并且不会改变原数组.

//它会遍历数组, 在循环体内写条件, 如果每一项都是true, 就会返回true, 只要有一个是false, 就会返回false, 

//历数组的每一项, 然后根据循环体内的条件去判断, 只要有一个是true, 就会停止循环.
```

##### 3.实现一个sleep函数

```js
// Promise
const sleep = time => {
	return new Promise(reslove => setTimeout(reslove, time))
}
sleep(1000).the(() => {
	console.log(1);
})
// Generator
function* sleepGenator(time) {
	yield new Promise(function(reslove, reject) {
		setTimeout(reslove, time);
	})
}
sleepGenator(1000).next().vlaue.then(() => {console.log(1)})
// async
function sleep(time) {
    return new Promise(reslove => setTimeout(reslove, time))
}
async function output() {
    let out = await sleep(1000);
    console.log(1);
    return out;
}
output();
// ES5
function sleep(callback, time) {
    if(typeof callback === 'function') {
		setTimeout(callback, time)
    }
}
function output() {
    console.log(1);
}
sleep(output, 1000);
```

##### 4.给定两个数组，写一个方法来计算它们的交集。

```
function merge(arr1, arr2) {
	return arr1.filter((item) => arr2.includes(item));
}
// 哈希表，时间复杂度O(m+n).
const interset = (nums1, nums2) => {
	const map = {};
	const res = [];
	for (let n of nums1) {
		if (map[n]) {
			map[n]++;
		} else {
			map[n] = 1;
		}
	}
	for (let n of nums2) {
		if (map[n] > 0) {
			res.push(n);
			map[n]--
		}
	}
	return res;
}
```

##### 5.设计 LazyMan 类

```
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

```js
class LazyManClass {
    constructor(name) {
        this.taskList = [];
        this.name = name;
        console.log(`Hi I am ${this.name}`);
        setTimeout(() => {
            this.next();
        }, 0);
    }
    eat (name) {
         var fn = ((n) => {
             return () => {
                console.log(`I am eating ${n}`)
                this.next();
             }
         })(name);
        this.taskList.push(fn);
        return this;
    }
    sleepFirst (time) {
        var fn = ((t) => {
            return () => {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    this.next();
                }, t * 1000);  
            }
        })(time);
        this.taskList.unshift(fn);
        return this;
    }
    sleep (time) {
        var fn = ((t) => {
            return () => {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    this.next();
                }, t * 1000); 
            }
        })(time);
        this.taskList.push(fn);
        return this;
    }
    next () {
        var fn = this.taskList.shift();
        fn && fn();
    }
}
function LazyMan(name) {
    return new LazyManClass(name);
}
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
```

##### 6.遍历输出index

```js
 <!-- 使下面这个函数输出0-9 -->
   /*function test() {
		for (var i = 0; i< 10; i++){
			setTimeout(() => {
				console.log(i);
		    }, 1000)
		}
	}
	test();*/
	
  // 利用 let 变量的特性 — 在每一次 for 循环的过程中，let 声明的变量会在当前的块级作用域里面（for 循环的 body 体，也即两个花括号之间的内容区域）创建一个文法环境（LexicalEnvironment），该环境里面包括了当前 for 循环过程中的 i
	/*function test1() {
		for (let i = 0; i< 10; i++){
			setTimeout(() => {
				console.log(i);
		    }, 1000)
		}
	}
	test1();*/

/*
	function test2() {
		setTimeout(() => {
			for (var i = 0; i< 10; i++){
				console.log(i);
			}
	    }, 1000)
	}
	test2();
*/
	// setTimeout(function[,delay, param1, param2]),delay: 可选，param:可选
/*	function test3() {
		for (var i = 0; i< 10; i++){
			setTimeout((i) => {
				console.log(i);
		    }, 1000, i)
		}
	}
	test3();
*/
	// 闭包
	function test4() {
		for (var i = 0; i< 10; i++){
			((i) => {
				setTimeout(() => {
				console.log(i);
		    }, 1000)
			})(i);	
		}
	}
	test4();

```

##### 7.使用迭代的方式实现flattern函数。

```
const flattern = function(arr) {
	while(arr.some(item => Array.isArray(item))){
		arr = [].concat(...arr);
	}
	return arr;
}
```

递归实现:

```
const flattern = array =>  array.reduce((acc, cur) => (Array.isArray(cur)? [...acc, ...flttern(cur)]))
```

字符串转换：

```
const flattern = function(arr) {
	return arr.toString().split(',').map(item => item = parseInt(item))
}
```

##### 8.如何实现一个new？

```js
function _new(fn, ...arg) {
	const obj = Object.create(fn.prototype); // 创建一个新的对象，把obj的_proto_指向fn的prototype,实现继承。
	const ret = fn.apply(obj, arg); // 改变this的指向，执行构造函数、传递参数，fn.apply(obj),或者fn.call();
	return ret instanceof Object ? ret : obj; // 返回新的对象obj
}
```

##### 9.介绍下深度优先遍历和广度优先遍历，如何实现？

##### 10.请分别用深度优先思想和广度优先思想实现一个拷贝函数？

##### 11.实现 (5).add(3).minus(2) 功能

##### 12.数组编程题

```js
随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。

function getRandomArr() {
    let randomArr = [];
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() *(max - min +1))+min;
    }
    let arr = Array.from({length: 10}, () => getRandom(0, 99));
    arr = [...new Set(arr)];
    arr.sort((prev, next) => prev-next);
    let temp = {};
    arr.map(item => {
        const num = Math.floor(item/10);
        if (!temp[num]) {
            temp[num] = [item];
        } else {
            temp[num].push(item);
        }
    });
    console.log(temp);
    for (let i in temp) {
        randomArr.push(temp[i]);
    }
    return randomArr;
}

// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
// 随机生成10个整数数组, 排序, 去重
let initArr = Array.from({ length: 10 }, (v) => { return getRandomIntInclusive(0, 99) });
initArr.sort((a,b) => { return a - b });
initArr = [...(new Set(initArr))];

// 放入hash表
let obj = {};
initArr.map((i) => {
    const intNum = Math.floor(i/10);
    if (!obj[intNum]) obj[intNum] = [];
    obj[intNum].push(i);
})

// 输出结果
const resArr = [];
for(let i in obj) {
    resArr.push(obj[i]);
}
console.log(resArr);

```

##### 13.如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 

```js
function Negate(str){
    const capital = /[A-Z]/;
    const arr = str.split('');
    let strArr = '';
	for (let i = 0; i < arr.length; i++) {
       if (capital.test(arr[i])) {
           arr[i] = arr[i].toLowerCase();
       } else {
           arr[i] = arr[i].toUpperCase();
       }
    }
    return arr.join('');
}
// other
function processString(s) {
    var arr = s.split('');
    let str = '';
    arr.map(item => {
        str += item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase();
    });
    return str;
    //or
     const newArr = arr.map(item => {
        str += item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase();
    });
    return newArr.join('');
}
```

##### 14.实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

```js
// 因为 T 的 length 是一定的，所以在循环S的的时候 ，循环当前项 i 后面至少还有 T.length 个元素
const find = (S, T) => {
    if (S.length < T.length)return -1;
    for (let i = 0; i< S.length - T.length; i++) {
        if (S.substr(i, T.length) === T) return i;
    }
    return -1;
}
// 方法一：
const find = (S, T) => S.search(T)

// 方法二：
const find = (S, T) => {
  const matched = S.match(T) 
  return matched ? matched.index : -1 
}
```

##### 15.使用javascript Proxy实现最简单的数据绑定

```

```

##### 16.给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

```js
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]

function whirl(arr, k) {
     const len = arr.length;
     const step = k % len; // k可能大于数组的长度，所以取余
    return arr.slice(-step).concat(arr.slice(0, len -step));
}
```

##### 17.打印出 1 - 10000 之间的所有对称数

```js
// 思路：利用数组翻转与本身相比较
[...Array(10000).keys()].filter((item) => {
    return item.toString().length > 1 && item.toString() === item.toString().split('').reverse().join('')
})
```

##### 18.给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

**示例:**

```text
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```

说明:

1. 必须在原数组上操作，不能拷贝额外的数组。
2. 尽量减少操作次数。

```js
function move(arr) {
	arr.map((item,index) => {
		if (item === 0) {
			arr.splice(index, 1);
			arr.push(0);
		}
	});
	return arr;
}
// other
function moveZeroToLast(arr) {
    let index = 0;
    for (let i = 0, length = arr.length; i < length; i++) {
        if (arr[i] === 0) {
            index++;
        } else if (index !== 0) {
            arr[i - index] = arr[i];
            arr[i] = 0;
        }
    }
    return arr;
}
```

##### 19.请实现一个 add 函数，满足以下功能。

> ```js
> add(1); 			// 1
> add(1)(2);  	// 3
> add(1)(2)(3);// 6
> add(1)(2, 3); // 6
> add(1, 2)(3); // 6
> add(1, 2, 3); // 6
> ```

##### 20.给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

**你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。**

**示例：**

```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
function findTarget(nums, target) {
    nums.sort((a, b) => a - b);
    let temp = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums.includes(target-temp)) {
            return [nums.indexOf(temp), (nums).indexOf(target-temp)]
        }
        temp = nums[i];
    }
    return [];
}
console.log(findTarget([2, 7, 11, 15], 9))
```

##### 21.实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

```js
function convert(list) {
	const res = []
	const map = list.reduce((res, v) => (res[v.id] = v, res), {})
	for (const item of list) {
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}
```

##### 22.已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

```js
const fn = (value) => {
    let count = 1, len = value.length, arr = [];
    while(count <= len) {
        arr.push(value.substr(0, count));
        count++;
    }
}
const value = "112";
fn(value) // 输出 [1， 11， 112]
```

##### 23.给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))

```js
function getMiddle(nums1, nums2) {
	const middle = Math.ceil((nums1.length + nums2.length)/2);
	let j = 0, k = 0, result = [];
	for (let i = 0; i <= middle; i++) {
        if (nums1[j] < nums2[k]) {
            result.push(nums1[j]);
            j++;
        } else {
            result.push(nums2[k]);
             k++;
        }
	}
     if ((nums1.length + nums2.length) % 2 !== 0) {
         return result[middle];
     } else {
         return (result[middle-1]+result[middle])/2
     }
}
console.log(getMiddle([1, 2],[3, 4]))

```

##### ****24.输入 `'1, 2, 3, 5, 7, 8, 10'` 输出 `'1~3, 5, 7~8, 10'`**

```js
 function transform(str) {
 	const arr = str.split(',');
 	let temp = []
 	let start = arr[0];
 	for (let i = 0; i < arr.length; i++) {
 		if (+arr[i]+1 != +arr[i+1]) {
 			temp.push(start != arr[i] ? `${start}~${arr[i]}` : `${arr[i]}`);
 			start = arr[i+1];
 		}
 	}
 	return temp.join(',');
 }
 console.log(transform('1, 2, 3, 5, 7, 8, 10'))
```

##### 25.用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

```js
function intToString(num) {
	return num/10 < 1 ? num : `${num%10}${intToString(Math.floor(num/10))}`;
}
console.log(intToString(1234));
```

##### 26.

```
function toFlat(obj, key, output) {
	const arr = Object.keys(obj);
	for (let i = 0; i < arr.length; i++) {
		if (typeof obj[`${arr[i]}`] === 'object') {
			`${arr[i]}.${toFlat(obj[`${arr[i]}`], key, output)}`;
		} else {
			key += key ? arr[i] : `.${arr[i]}`;
			output[`${key}`] = obj[`${arr[i]}`]
		}
	}
	return output;
}
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}
console.log(toFlat(entry));
```

##### 27.在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。

**例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。**



##### 28.https://muyiy.cn/question/program/113.html

```

```

##### 29.找出字符串中连续出现最多的字符和个数（蘑菇街）

```js
'abcaakjbb' => {'a':2,'b':2}
'abbkejsbcccwqaa' => {'c':3}
```

##### 30.写一个单向链数据结构的 js 实现并标注复杂度（水滴筹）

```

```

##### 31.统计 1 ~ n 整数中出现 1 的次数

```

```

##### 32.如何将`[{id: 1}, {id: 2, pId: 1}, ...]` 的重复数组（有重复数据）转成树形结构的数组 `[{id: 1, child: [{id: 2, pId: 1}]}, ...]` （需要去重）

```

```

##### 33.有一堆扑克牌，将牌堆第一张放到桌子上，再将接下来的牌堆的第一张放到牌底，如此往复；

最后桌子上的牌顺序为： (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；

##### 问：原来那堆牌的顺序，用函数实现。

```

```

##### 34.用 setTimeout 实现 setInterval，阐述实现的效果与 setInterval 的差异

```

```

##### 35.求两个日期中间的有效日期

如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】

```

```

36.形参和实参

```js
let name = 'jack';
let size = {
	width: 800,
	height: 600
}
let types = ['1', '2']
function foo(name, size, types) {
	name = 'tome'
	size = {
		width: 1080,
		height: 1980
	};

	types.push('gif')
}
foo(name, size, types)
console.log(name, size, types)
// 'jack', {width: 800, height: 600}, ['1', '2', 'gif']
形参和实参是存在一种引用关系的，就好比变量中的引用关系。我们都知道，变量中的引用关系跟它们的值有关。当值为原始类型时(string,number,boolean等等)，var a=b是各自引用不同的内存地址的，修改不会影响到彼此；当值是对象，数组等非原始类型时，它们引用的是同一个内存地址，修改则会相互影响。

扩展：
function foo(name, size, types) {
	name = 'tome'
	size.width = 1080;
	types.push('gif')
}
// 'jack', {width: 1080, height: 600}, ['1', '2', 'gif']
```

