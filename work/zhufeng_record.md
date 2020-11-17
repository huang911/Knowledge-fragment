### 1.es6

#### symbol

- Symbol.hasInstance
- Symbol.isConcatSpreadable
- Symbol.match
- Symbol.species
- Symbol.toPrimitive
- Symbol.unscopables
- with语法，模版引擎的实现

#### spread

### 2.Node的全局对象：

##### 全局变量：

- __filename:当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。如果在模块中，返回的是模块文件的路径。

- __dirname：当前执行脚本所在的目录。

  ##### 计时器：

- setTimeout(cb, ms): 全局函数在指定的毫秒数后执行指定函数。返回一个代表定时器的句柄值。

- clearTimeout(t)

- setInterval(cb, ms)

  ##### 全局模块：

- console：控制台对象

- process:进程对象

- module: 模块对象

- Buffer: 二进制数据处理类

- exports: 模块导出对象

  ##### 模块加载对象：

- require: 模块加载对象

#### __dirname, __filename,process.cwd(), ./, ../的区别：

__dirname: 获得当前执行文件所在目录的完整目录名

__filename: 获得当前执行文件的带有完整绝对路径的文件名

process.cwd(): 获得当前执行node命令时候的文件夹目录名

./：文件所在目录

### 3.职业规划

#### 基础的数据结构和算法

- 堆、栈、队列、链表、哈希、树、图
- LeetCode
- 和前端知识/企业实战的结合

#### 基础知识

- 数据类型和堆栈内存管理
- ES6基础和进阶
- 浏览器垃圾回收机制及作用域闭包
- JS高级编程函数
- 面向对象及深入应用
- 浏览器渲染机制和CRP性能节点优化
- 任务队列、事件循环、微任务宏任务
- DOM事件及设计模式
- AJAX/HTTP/Fetch/跨域
- vue全家桶
- webpack
- Node全栈开发
- 数据库
- 服务器运维部署管理
- 数据可视化分析(webGl,canvas)
- 辅助：uni-app/小程序/react-native/flutter

#### 进阶内容

- JS插件组件化封装
- JQ/Axios/Lodash等源码解读
- MVC/MVVM/虚拟DOM/DOM-DIFF/VUEX(REDUX/前端路由源码分析
- VUE源码
- React源码（包含DVA源码等)
- 服务器SSR
- 组件化及敏捷化平台
- 微前端
- 性能优化
- 工程化部署和底层构建

#### 实战开发及业务能力

#### 技术的前瞻性和广度

#### 职业素养

- 学习能力
- 态度
- 沟通
- 执行力
- 领导力

![image-20200602214437997](/Users/huangqi/Library/Application Support/typora-user-images/image-20200602214437997.png)

![image-20200602210514581](/Users/huangqi/Library/Application Support/typora-user-images/image-20200602210514581.png)

![image-20200602210532354](/Users/huangqi/Library/Application Support/typora-user-images/image-20200602210532354.png)

### 4.wepack

1.toStringTag

```
Object.defineProperty(obj, Symbol.toStringTag, {value: 'Module'});
```

#### 1.配置webpack.config.js

1. 配置模式：mode

2. 入口文件: entry

3. 输出: output
   a.输出目录: path
   b.输出文件名: filename

4. 开发工具: devtool

5. 开发服务: devServer
   a.热更新：hot
   b.静态文件根目录：contentBase（绝对路径）
   c.historyApiFallback: 

6. 解析
   a.别名：alias
   b.扩展名： extensions

7. 模块

   a.规则：rules

8. 插件：plugins

   #### 2.withRouter

   #### 3.createHashHistory

   #### 4.connectRouter

   ```
   type CombinedState = {
       [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
   }
   // keyof 与 Object.keys 略有相似，只不过 keyof 取 interface 的键。
   // typeof 代表取某个值的 type，
   
   type Props = PropsWithChildren<RouteComponentProps<Params>>;
   import { connect } from 'react-redux';
   ```

   #### 5.redux-thunk

   6.RouteComponentProps

   7.AnyAction

   8.PropsWithChildren, react

   9.

   ```js
   import zh_CN from "antd/lib/locale-provider/zh_CN";//国际化中文
   import { ConfigProvider } from "antd";//配置
   import { createHashHistory } from 'history';
   
   redux相关：
   import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
   import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
   import promise from 'redux-promise';
   import { AnyAction } from 'redux';
   import { connect } from 'react-redux';
   import { Provider } from "react-redux";(//负责把属性中的store传递给子组件)
   import { combineReducers, ReducersMapObject, Reducer } from 'redux';
   import { persistStore, persistReducer } from "redux-persist";
   import storage from "redux-persist/lib/storage";
   import { combineReducers } from "redux-immer";
   
   react-router相关：
   import { routerMiddleware } from 'connected-react-router';
   import { RouteComponentProps } from 'react-router-dom';
   import { withRouter, NavLink } from 'react-router-dom';
   import { ConnectedRouter } from 'connected-react-router';//redux绑定路由
   import { Switch, Route, Redirect } from "react-router-dom";//三个路由组件
   import { connectRouter, push } from 'connected-react-router';
   import { StaticContext } from "react-router";
   
   react相关：
   import React, { useState, CSSProperties, useEffect, useRef,PropsWithChildren } from 'react';
   import { RouteComponentProps, Link } from "react-router-dom";
   
   express相关
   import { Request, Response, NextFunction } from 'express';
   
   antd:
   import { Descriptions, Button, Alert, message } from "antd";
   
   mongodb:
   import mongoose, { Schema, Document } from "mongoose";
   import mongoose, { Schema, Model, Document, HookNextFunction } from 'mongoose';
   
   vuex相关：
   import { mapActions, mapState, createNamespacedHelpers } from "vuex";
   ```

10.export const Lesson =

  mongoose.model < ILessonDocument > ("Lesson", LessonSchema);

| 模块名              | 英文                                                         | 中文                                                         |
| :------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| express             | Fast, unopinionated, minimalist web framework for node.      | 基于 Node.js 平台，快速、开放、极简的 Web 开发框架           |
| @types/express      | This package contains type definitions for Express           | express 的类型声明                                           |
| mongoose            | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. | Mongoose 为模型提供了一种直接的，基于 scheme 结构去定义你的数据模型。它内置数据验证， 查询构建，业务逻辑钩子等，开箱即用 |
| @types/mongoose     | This package contains type definitions for Mongoose          | mongoose 的类型声明                                          |
| body-parser         | Node.js body parsing middleware.                             | body-parser 是一个 HTTP 请求体解析中间件，使用这个模块可以解析 JSON、Raw、文本、URL-encoded 格式的请求体，Express 框架中就是使用这个模块做为请求体解析中间件 |
| bcryptjs            | Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser. | bcryptjs 是一个第三方加密库，用来实现在 Node 环境下的 bcrypt 加密 |
| @types/bcryptjs     |                                                              |                                                              |
| jsonwebtoken        | An implementation of JSON Web Tokens                         | JSON Web Token（JWT）是一个非常轻巧的规范。这个规范允许我们使用 JWT 在用户和服务器之间传递安全可靠的信息 |
| @types/jsonwebtoken | This package contains type definitions for jsonwebtoken      | jsonwebtoken 的类型声明                                      |
| morgan              | HTTP request logger middleware for node.js                   | morgan 是 express 默认的日志中间件，也可以脱离 express，作为 node.js 的日志组件单独使用 |
| @types/morgan       | This package contains type definitions for morgan            | morgan 的类型声明                                            |
| cors                | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. | CORS 是用于提供 Connect / Express 中间件的 node.js 程序包，可用于启用具有各种选项的 CORS |
| @types/cors         | This package contains type definitions for cors              | cors 的类型声明                                              |
| validator           | A library of string validators and sanitizers                | 一个用于字符串验证和净化的库                                 |
| @types/validator    | This package contains type definitions for validator.js      | validator 的类型声明                                         |
| helmet              | Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help! | Helmet 可通过设置各种 HTTP 标头来帮助您保护 Express 应用程序 |
| @types/helmet       | This package contains type definitions for helmet            | helmet 的类型声明                                            |
| dotenv              | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology. | Dotenv 是一个零依赖模块，可将环境变量从.env 文件加载到 process.env 中 |
| multer              | Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. | Multer 是用于处理`multyparty/formdata`类型请求体的 node.js 中间件，主要用于上传文件。 它是在 busboy 之上编写的，以实现最大效率。 |
| @types/multer       | This package contains type definitions for multer            | multer 的类型声明                                            |
| typescript          | TypeScript is a language for application-scale JavaScript    | ypeScript 是用于应用程序级 JavaScript 的语言                 |
| @types/node         | This package contains type definitions for Node.js           | 该软件包包含 Node.js 的类型定义                              |
| ts-node-dev         | Tweaked version of node-dev that uses ts-node under the hood. | 调整后的版本，在后台使用 ts-node                             |
| nodemon             | nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. | nodemon 是一种工具，可在检测到目录中的文件更改时通过自动重新启动应用程序来帮助开发基于 node.js 的应用程序。 |
| Http-status-codes   |                                                              |                                                              |
|                     |                                                              |                                                              |

