# dotenv-cache

这是一个使用 npm 发包测试, ts 工程, 编译使用 vite，参考 dotenv

## 配置本地 .env

### 必须配置.env 才可以正常执行，以下是一个 .env 配置的例子

```ts
ENV = test;
PORT = 3000;
```

## test

### test code

如下例子：

```ts
import env from "../lib";

env.config();
console.log("init env", env.envCache);
console.log(env.set("PORT", 10));
console.log(env.get("PORT"));
console.log(env.set("ENV", "prod"));
console.log(env.get("ENV"));
console.log("review env", env.envCache);
```
