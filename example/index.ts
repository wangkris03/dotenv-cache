import env from "../lib";

env.config();
console.log("init env", env.envCache);
console.log(env.set("PORT", 10));
console.log(env.get("PORT"));
console.log(env.set("ENV", "prod"));
console.log(env.get("ENV"));
console.log("review env", env.envCache);
//优先获取.env配置，不存在获取process.env
console.log(env.get("ALLUSERSPROFILE"));
