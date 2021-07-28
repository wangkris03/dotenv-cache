import fs from "fs";
import path from "path";
import { parse } from "dotenv";
import os from "os";

type DotenvConfigOptions = {
  path?: string; // path to .env file
  encoding?: string; // encoding of .env file
  debug?: string; // turn on logging for debugging purposes
};

function resolveHome(envPath: string) {
  return envPath[0] === "~"
    ? path.join(os.homedir(), envPath.slice(1))
    : envPath;
}

// 缓存对象，用于测试或检测
const envCache = {} as { [key: string]: string };

const config = (options?: DotenvConfigOptions) => {
  let dotenvPath = path.resolve(process.cwd(), ".env");
  let encoding = "utf8";
  let debug = false;

  if (options) {
    if (options.path != null) {
      dotenvPath = resolveHome(options.path);
    }
    if (options.encoding != null) {
      encoding = options.encoding;
    }
    if (options.debug != null) {
      debug = true;
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug });
    Object.keys(parsed).forEach(function (key) {
      envCache[key] = parsed[key];
    });

    return { parsed };
  } catch (e) {
    return { error: e };
  }
};

const get = (key: string): string => {
  if (Object.prototype.hasOwnProperty.call(envCache, key)) {
    return envCache[key];
  }
  if (Object.prototype.hasOwnProperty.call(process.env, key)) {
    return process.env[key];
  }
  return "";
};

const set = (key: string, val: string | number): boolean => {
  try {
    envCache[key] = val.toString();
    return true;
  } catch (error) {
    return false;
  }
};
export default { envCache, config, get, set };
