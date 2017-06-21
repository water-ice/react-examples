# ReactJS旅程
#### 01-05-每个技术栈的学习
- 建议使用 npm 安装（node-sass被墙就使用cnpm吧）

- Mac下设备将package.json -> scripts中 `set` 改成 `export` 才能运行

- 针对上一点，你也可以考虑使用`cross-env`

#### 06-实践（上线的项目也是基于此开发）
```js
// 里面有完整的首页，购物车，个人中心，下单，地址选择，分页；为项目搭建的底层结构
// 全局安装json-server和webpack

npm install // 安装依赖
cd src/mock && npm start // 开启json-server数据模拟
npm start // 运行项目

```
#### 07-基础目录抽离 - 01

同一环境，不同端口，多个项目

- 升级到webpack2.x
- 基于06以及项目实践后整理的项目开发基础目录
- mobile和pc后台 公用一套规则

#### 08-基础目录抽离 - 02

同一环境，同一端口，多个项目（SPA）


