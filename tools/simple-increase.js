const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const dest = path.join(__dirname, "../src/test.ts");

for (let i = 0; i < 20; i++) {
  const varDecls = [...Array(i)]
    .map((_, idx) => `export const item${idx + 1} = recurse(item${idx});`)
    .join("\n");

  fs.writeFileSync(
    dest,
    `
import { item0, recurse } from "./lib"
${varDecls}`,
    { encoding: "utf-8" }
  );

  console.log(
    `${i}: ${
      execSync(`yarn tsc`)
        .toString()
        .match(/Done in (.+?)s/)[1]
    }`
  );
}
