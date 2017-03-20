## nodeHttpServer
使用node原生http模块搭建服务器，实现对路由的解析以及请求的派发，实现静态资源和favicon资源的获取。主要用到的是node的http和fs模块的api，学习练手
运行项目，主文件为server.js
在npm命令行中输入npm start,或者node  server.js启动项目
### eventEmitter发送和接收事件
#### pulser.js 
node中很多类都是eventEmitter的子类，如HTTPServer和HTTPClient类。eventEmitter定义在node的event模块中。on方法定义事件的监听器函数，emit方法触发事件。
### 服务器端监听http请求
#### httpsniffer.js和hwserver.js当发起一个请求时，在服务器端会输出请求相关日志
### 基本的web服务器
实现目标：
请求路由的选择、url对象解析、提取主机头信息、支持favicon请求、支持静态文件请求
#### basicServer.js
htserver 是一个http服务器对象，进行url对象的解析并存储在req的basicServer中，处理消息头，分派给相应的处理函数
htserver的basicServer存储请求的主机名、路径以及处理模块
htserver的addContainer检测模块是否存在，不存在则引入模块及配置
htserver的useFavicon和docRoot引入静态资源和favicon资源处理模块
lookupContainer：根据host和path匹配请求处理模块
dispatchToContainer：进行请求派发，调用相应模块的handle方法进行请求处理。
#### faviconHandler.js
#### staticHandler.js
