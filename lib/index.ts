const path = require("path");
const fs = require("fs");
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
const envCache = {} as { [key: string]: string | number };

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
      const val = Number(parsed[key]);
      if (isNaN(val)) {
        envCache[key] = parsed[key];
      } else {
        envCache[key] = val;
      }
    });

    return { parsed };
  } catch (e) {
    return { error: e };
  }
};

const get = (key: string): string | number | null => {
  if (Object.prototype.hasOwnProperty.call(envCache, key)) {
    return envCache[key];
  }
  return null;
};

const set = (key: string, val: string | number): boolean => {
  try {
    envCache[key] = val;
    return true;
  } catch (error) {
    return false;
  }
};
export default { envCache, config, get, set };
