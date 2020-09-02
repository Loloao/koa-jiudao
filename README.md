# 旧岛

node js 的一般用法
1. 脱离浏览器运行 js
2. NodeJS stream （前端工程化基础）
3. 服务端API
4. 作为中间层

## 服务端知识
- 代码应该有一个开闭原则，对代码的修改应该是关闭的，对扩展应该是开放的
- api 的版本号一般放在
  - 路径中
  - 查询参数中
  - header
- 注意循环引用，即一个组件 a 引用了另一个组件 b，而组件 b 也引用了组件 a，有时会是多个组件交叉引用
- 一般来讲项目文件是分层次的，我们只能使用上层调用下层，app 是一个入口文件，应该只是它引用其他组件，而不能其他组件能够引用它
- 点击 vscode 的小爬虫可以生成一个 vscode 配置文件用于调试，如果既想 nodemon 自动重启，又想断点调试，就可以在右下角生成配置中选择`nodejs: nodemon setup`
- 面向切面编程，一般用于日志记录，性能统计，安全控制，事务处理，异常处理

### 异常处理
- 并不是所有错误信息都要返回给前端，我们需要将 error 简化，将清晰明了的信息给前端
  - HTTP Status Code 2xx, 4xx, 5xx
  - message 文字化信息
  - error_code 类似于 http code 但是更详细，根据业务信息
  - request_url 单签请求的 url
- 已知错误就是能够报告出来的错误，未知错误就是程序潜在错误，无意识，根本不知道他出错了
- 在函数设计中，如果函数出现异常，我们有两种方式处理
  - `return false`即函数返回`false`或`null`表示这个函数有问题，但是它会丢失这个错误的信息
  - `throw new Error`直接抛出异常，在严谨的程序里一般用这个
- 第三方库需要使用`try catch`包裹，你不能确定是万无一失或能够抛出异常，而自己写的代码可以不捕捉异常
- 全局异常处理，我们需要在函数顶部设定一个机制，它能够监听到任何异常
- `try catch`是捕捉不到异步异常的
- 如果有函数返回一个异步函数的 promise 包装，就能使用`async await`简化异常链条。另外注意函数调用链中有`async`则需要所有函数都需要使用`async`
  ```javascript
  async function func1() {
    try {
      await func2()
    } catch(e) {
      console.log('error')
    }
  }

  function func2 () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const a = Math.random()
        if (a < 0.5) {
          reject('error')
        }
      },1000)
    })
  }
  ```
- 可以把所有的错误类挂载到`global`全局变量中，在初始化中直接挂载，但这样如果拼错，会很难排查


## koa
### 中间件
- `new Koa()`中的`Koa`实际上是一个应用程序对象，用来挂载各种中间件
- koa 只会调用第一个注册的中间件，其他中间件都需要开发者自己调用，即参数`next`函数，其实`next`函数就是调用下一个中间件
- 中间件的函数前一定要加上`async`，`next`函数前一定要加上`await`，如果`next`函数不使用`await`，那么就不能保证洋葱模型的执行顺序
- 中间件可以`return`值，它的返回值是一个`Promise`，相当于`Promise.resolve`，但一般不用`return`获取中间件处理过的值，因为可能中间还有中间件，`return`会传值到其他中间件中
- 如果想获取其他中间件的值，在`next`函数调用之后使用
*ctx*
- 需要返回给浏览器的内容需要挂载到`ctx.body`上