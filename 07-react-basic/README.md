
## 07-基础目录抽离

Mac下设备将package.json -> scripts中 `set` 改成 `export` 才能运行

- 升级到webpack2.x
- 使用@重定向目录地址
- 基于06以及项目实践后整理的项目开发基础目录
- 同时管理mobile和pc后台
- 一个使用antd-mobile，一个使用antd

可以把antd-mobile和antd，换成其他的ui库，可能需要在一些地方删除引入的代码

```js
//建议使用 npm install （可能需要翻墙）
//node-sass报错就使用 cnpm install

//Windows:
- mobile
npm run dev:client
npm run build:client

- pc
npm run dev:manage
npm run build:manage

//Mac:
- mobile
npm run dev:client:os
npm run build:client:os

- pc
npm run dev:manage:os
npm run build:manage:os

// 当然你也可以考虑使用cross-env

```




