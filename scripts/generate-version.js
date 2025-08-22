const fs = require("fs");
const { execSync } = require("child_process");

// Ambil hash commit git pendek (fallback ke timestamp kalau gagal)
let commitHash = "no-git";
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
  console.warn("⚠️ Git hash not found, fallback ke timestamp");
}

const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);

// Versi final: timestamp + commitHash
const version = `${timestamp}-${commitHash}`;

fs.writeFileSync(
  "public/version.json",
  JSON.stringify({ version }, null, 2)
);

console.log("✅ Generated version.json:", version);
