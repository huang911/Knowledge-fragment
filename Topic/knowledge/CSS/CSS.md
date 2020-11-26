### 1.介绍BFC及其应用

BFC就是**块级格式上下文**，是页面盒模型布局中的一种CSS渲染模式，相当于一个隔离的独立容器，里面的元素和外部的元素相互不影响。

创建BFC的方式：

```js
a.html根元素
b.float浮动，float属性不为none
c.绝对定位
d.overflow不为visiable
e.display为表格布局或者弹性布局(inline-block, table-cell, table-caption,flex,inline-flex)
```

扩展：

```js
float的属性：left,right,none,inherit
overflow的属性：visiable,hidden,scroll,auto
```

块级格式化上下文布局规则：

```js
1.内部的BOX会在垂直方向一个接一个的放置
2.属于同一个BFC的两个相邻BOX的margin会重叠；不同BFC就不会
3.是页面上一个隔离的独立容器，里面的元素不会影响到外面的元素；反之亦然
4.BFC的区域不会和float box重叠
5.计算BFC的高度，浮动元素也参与计算
```

BFC的作用：

```
a.清除内部的浮动，触发父元素的BFC属性，会包含float元素
  防止浮动导致父元素高度塌陷父级设置overflow：hidden，元素float:right
b.分属于不同的BFC，可以阻止margin重叠
  避免margin重叠，两个块相邻就会导致外边距被折叠，给中间的设置BFC就会避免，方法就是套个父级设置overflow：hindden
c.阻止元素被浮动元素覆盖，各自是独立的渲染区域；
d.自适应两栏布局
```

MDN：<https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context>

### 2.opacity: 0、visibility: hidden、display: none

- `display: none;`

1. **DOM 结构**：浏览器不会渲染 `display` 属性为 `none` 的元素，不占据空间；
2. **事件监听**：无法进行 DOM 事件监听；
3. **性能**：动态改变此属性时会引起重排，性能较差；
4. **继承**：不会被子元素继承，毕竟子类也不会被渲染；
5. **transition**：`transition` 不支持 `display`。

- `visibility: hidden;`

1. **DOM 结构**：元素被隐藏，但是会被渲染不会消失，占据空间；
2. **事件监听**：无法进行 DOM 事件监听；
3. **性 能**：动态改变此属性时会引起重绘，性能较高；
4. **继 承**：会被子元素继承，子元素可以通过设置 `visibility: visible;` 来取消隐藏；
5. **transition**：`transition` 不支持 `display`。

- opacity: 0;

1. **DOM 结构**：透明度为 100%，元素隐藏，占据空间；
2. **事件监听**：可以进行 DOM 事件监听；
3. **性 能**：提升为合成层，不会触发重绘，性能较高；
4. **继 承**：会被子元素继承,且，子元素并不能通过 `opacity: 1` 来取消隐藏；
5. **transition**：`transition` 不支持 `opacity`

### 3.省略效果

单行：

```css
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
```

多行：

```css
display: -webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:3;
overflow:hidden;
```

js:

```html
<p>这是一段测试文字，this is some test text，测试文字，测试文字测 </p>
const p = document.querySelector('p')
let words = p.innerHTML.split(/(?<=[\u4e00-\u9fa5])|(?<=\w*?\b)/g)
while (p.scrollHeight > p.clientHeight) {
  words.pop()
  p.innerHTML = words.join('') + '...'
}
```

### 4.介绍下 BFC、IFC、GFC 和 FFC

**BFC：块级格式上下文** 

页面上的一个隔离的渲染区域那么他是如何产生的呢？可以触发BFC的元素有float、position、overflow、display：table-cell/ inline-block/table-caption ；BFC有什么作用呢？比如说实现多栏布局’

**IFC：内联格式上下文**

IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同 IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。 那么IFC一般有什么用呢？ 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

**GFC：网格布局格式上下文**

当为一个元素设置display值为grid,次元素将会获得一个独立的渲染区域，我们可以通过在网格容器上定义行和网格定义列属性各在网格项目上定义网格型和网格列为每一个网格项目定义位置和空间。

**FFC：自适应格式上下文**

display值为flex或者inline-flex的元素将会生成自适应容器。

### 5.边界重叠

**是指两个或多个盒子（可能相邻也可能嵌套）的相邻边界（其间没有任何非空内容、补白、边框）重合在一起，形成一个单一边界。**

注意：相邻的盒子可能并非是由父子关系或同胞关系的元素生成。

1、水平边距永远不会重合。 
2、在规范文档中，2个或以上的块级盒模型相邻的垂直margin会重叠。最终的margin值计算方法如下： 
***a、全部都为正值，取最大者；*** 
***b、不全是正值，则都取绝对值，然后用正值减去最大值；*** 
***c、没有正值，则都取绝对值，然后用0减去最大值。*** 
注意：相邻的盒模型可能由DOM元素动态产生并没有相邻或继承关系。 
3、相邻的盒模型中，如果其中的一个是浮动的（float），垂直margin不会重叠，并且浮动的盒模型和它的子元素之间也是这样。 
4、设置了overflow属性的元素和它的子元素之间的margin不被重叠（overflow取值为visible除外）。 
5、设置了绝对定位（position:absolute）的盒模型，垂直margin不会被重叠，并且和他们的子元素之间也是一样。 
6、设置了display:inline-block的元素，垂直margin不会重叠，甚至和他们的子元素之间也是一样。 
7、如果一个盒模型的上下margin相邻，这时它的margin可能重叠覆盖（collapse through）它。在这种情况下，元素的位置（position）取决于它的相邻元素的margin是否重叠。 
**a、如果元素的margin和它的父元素的margin-top重叠在一起，盒模型border-top的边界定义和它的父元素相同。** 
**b、另外，任意元素的父元素不参与margin的重叠，或者说只有父元素的margin-bottom是参与计算的。如果元素的border-top非零，那么元素的border-top边界位置和原来一样。** 
一个应用了清除操作的元素的margin-top绝不会和它的块级父元素的margin-bottom重叠。 
注意，那些已经被重叠覆盖的元素的位置对其他已经重叠的元素的位置没有任何影响；只有在对这些元素的子元素定位时，border-top边界位置才是必需的。 
8、根元素的垂直margin不会被重叠。

- 外层元素padding代替
- 内层元素透明边框 border:1px solid transparent;
- 内层元素绝对定位 postion:absolute:
- 外层元素 overflow:hidden;
- 内层元素 加float:left;或display:inline-block;
  内层元素padding:1px;

### 6.CSS选择器的优先级是如何计算的？

```
a.表示是否使用内联样式，如果使用，则a为1，否则为0；
b.表示ID选择器的数量；
c.表示类选择器、属性选择器和伪类选择器数量之和；
d.表示标签（类型）选择器和伪元素选择器之和；
a,b,c,d权重从左到右，依次减小
0，1，0，0的优先级高于0，0，10，10。
```

### 7.重置（reseting）CSS和标准化（normalizing）CSS 的区别是什么？你会选择哪种方式，为什么？

 重置： 意味着去除所有的浏览器默认样式。对页面所有的元素，像margin,padding,font-size这些样式全部置成一样。必须重新定义所有元素的样式。

标准化： 没有去掉所有的默认样式，而是保留了有用的一部分，同时还纠正了一些常见错误。

### 8.display的属性值都有哪些？

| 值            | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| none          | 此元素不会被显示                                             |
| block         | 此元素将显示为块级元素，此元素前后会带有换行符               |
| inline        | 默认。此元素会被显示为内联元素，元素前后没有换行符。         |
| inline-block  | 行内块元素。                                                 |
| list-item     | 此元素会作为列表显示。                                       |
| run-in        | 此元素会根据上下文作为块级元素或内联元素显示。               |
| table         | 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。 |
| inline-table  | 此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。 |
| inherit       | 规定应该从父元素继承 display 属性的值                        |
| table-row     | 此元素会作为一个表格行显示（类似 <tr>）。                    |
| table-column  | 此元素会作为一个单元格列显示（类似 <col>）                   |
| table-cell    | 此元素会作为一个表格单元格显示（类似 <td> 和 <th>）          |
| table-caption | 此元素会作为一个表格标题显示（类似 <caption>）               |

### 9.什么情况下，用translate()而不用绝对定位？什么时候，情况相反。

translate()是transform的一个值。改变transgorm或opacity不会触发浏览器重新布局（reflow）或重绘（repaint)，只会触发复合（compositions).而改变绝对定位会触发重新布局，进而触发重绘和复合。

transform使浏览器为元素创建一个GPU图层，但改变绝对定位会使用到CPU。因此translate()更高效，可以缩短平滑动画的绘制时间。

当使用translate()时，元素仍然占据其原始空间（类似： position: relative）。这与改变绝对定位不同。

如果要基于元素原来的位置做调整，我们可以使用translate进行平移变化；而如果要把元素放在页面或者父元素的指定位置，我们可以使用绝对定位脱标布局。

### 10.实现水平垂直居中

https://juejin.im/post/6844903474879004680

2.垂直居中：

a.行内块级元素：

```css
.parent::after, .son {
	display: inline-block,
	vertical-align: middle
}
.parent::after {
	content: '';
	height: 100%;
}
```

b.元素高度固定：

```css
方案1：
.parent {
  position: relative;
}
.son {
  position: absolute;
  top: 50%;
  height: 固定；
  margin-top: -0.5高度；
}
方案2：
.parent {
  position: relative;
}
.son {
  position: absolute;
  height: 固定；
  top: 0;
  bottom: 0;
  margin: auto 0;
}
```

11.background

可以在一次声明中定义一个或多个属性：[`background-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)、[`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)、[`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)、[`background-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)、[`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)、[`background-repeat`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)、[`background-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)，和 [`background-attachment`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment)。

**注意:** [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color) 只能在background的最后一个属性上定义，因为整个元素只有一种背景颜色。

```
background-attachment: 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。
/* 关键 属性值 */
background-attachment: scroll;(此关键属性值表示背景相对于元素本身固定， 而不是随着它的内容滚动（对元素边框是有效的）)
background-attachment: fixed;(此关键属性值表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动.)
background-attachment: local;(此关键属性值表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动， 并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含他们的边框。)

/* 全局 属性值 */
background-attachment: inherit;
background-attachment: initial;
background-attachment: unset;
```

```
background-clip  设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。
/* Keyword values */
background-clip: border-box;(背景延伸至边框外沿（但是在边框下层）。)
background-clip: padding-box;(背景延伸至内边距（padding）外沿。不会绘制到边框处。)
background-clip: content-box;(背景被裁剪至内容区（content box）外沿。)
background-clip: text;(背景被裁剪成文字的前景色。)

/* Global values */
background-clip: inherit;
background-clip: initial;
background-clip: unset;
```

```
background-image: 可以设置多个背景图，以逗号分隔
```

```
background-origin 规定了指定背景图片background-image 属性的原点位置的背景相对区域
注意：当使用 background-attachment 为fixed时，该属性将被忽略不起作用。
background-origin: border-box
background-origin: padding-box
background-origin: content-box

background-origin: inherit
```

```
background-position 为每一个背景图片设置初始位置。 这个位置是相对于由 background-origin 定义的位置图层的。
```

```
 background-repeat CSS 属性定义背景图像的重复方式。背景图像可以沿着水平轴，垂直轴，两个轴重复，或者根本不重复。
 /* 单值语法 */
background-repeat: repeat-x;
background-repeat: repeat-y;
background-repeat: repeat;
background-repeat: space;
background-repeat: round;
background-repeat: no-repeat;

/* 双值语法: 水平horizontal | 垂直vertical */
background-repeat: repeat space;
background-repeat: repeat repeat;
background-repeat: round space;
background-repeat: no-repeat round;

background-repeat: inherit;
```

