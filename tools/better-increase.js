const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const dest = path.join(__dirname, "../src/test.ts");

for (let i = 0; i < 20; i++) {
  const varDecls = [...Array(i)]
    .map((_, idx) => {
      const prevItemName = `item${idx}`;
      const itemName = `item${idx + 1}`;
      return `export const ${itemName}: ItemDefinitions<{a: typeof ${prevItemName}, b: typeof ${prevItemName}}> = recurse(${prevItemName});`;
    })
    .join("\n");

  fs.writeFileSync(
    dest,
    `
import { item0, recurse, ItemDefinitions } from "./lib"
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
