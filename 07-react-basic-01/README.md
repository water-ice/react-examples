
## 07-基础目录抽离 - 01

同一环境，不同端口，多个项目（移动端与PC端两项目配置）

- webpack3.x  (webpack2.x，配置相同)
- 使用@重定向目录地址
- 基于06以及项目实践后整理的项目开发基础目录
- 同时管理mobile和pc后台
- 一个使用antd-mobile，一个使用antd

可以把antd-mobile和antd，换成其他的ui库，可能需要在一些地方删除引入的代码

```js
//建议使用 npm install （可能需要翻墙）
//node-sass报错就使用 cnpm install （dev和build会比npm慢很多，原因未知）

- mobile
npm run dev:client
npm run build:client

- pc
npm run dev:manage
npm run build:manage

```




