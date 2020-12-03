### 1.参考链接：

[小程序开发系列之 Prettier 格式化](https://prettier.io/docs/en/options.html)

[使Prettier一键格式化WXSS](https://www.jianshu.com/p/553cef04e262)

### 2.问题：

1.如何处理wxml里的wxs代码?

背景：现在小程序的`.wxml`文件中还可以使用`<wxs>`标签编写 js 脚本。因为我们使用的 html 解析器去解析的`.wxml`文件，这样就导致`<wxs>`标签中的 js 脚本被当作字符串来格式化 处理，格式化后会被压缩为一行，没有了换行符 js 就会解释错误，导致不能运行或运行错 误，这显然不是我们想要的结果

3.步骤：

`.wxml`文件中的`<wxs>...</wxs>`脚本代码需要使用`<!-- prettier-ignore -->`忽 略，否则会被格式化为一行，小程序开发者工具报错：

```html
<view>
  <!-- ... -->
</view>
<!-- prettier-ignore -->
<wxs>
  <!-- js代码 -->
</wxs>
```

`.wxml`文件中的有些元素属性太长会被格式化为多行，小程序开发者工具也会报错。 比如`style`属性，使用`<!-- prettier-ignore-attribute style -->`即可。

```html
<view>
  <!-- prettier-ignore-attribute style -->
  <view
    style="width: 500rpx;height: 80rpx;margin-bottom: 40rpx;background-color: #04be01;border-radius: 80rpx;color: #fff;"
  >
  </view>
</view>
```