import env from "../lib";

env.config();
console.log("init env", env.envCache);
console.log(env.set("PORT", 10));
console.log(env.get("PORT"));
console.log(env.set("ENV", "prod"));
console.log(env.get("ENV"));
console.log("review env", env.envCache);
