#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const version = getVersionArgument(process.argv.slice(2));

await updateJsonFile("package.json", (json) => {
	json.version = version;
	return json;
});

await updateJsonFile("package-lock.json", (json) => {
	json.version = version;
	if (json.packages?.[""]) {
		json.packages[""].version = version;
	}
	return json;
});

for (const manifestName of ["manifest.json", "manifest.chrome.json", "manifest.firefox.json"]) {
	await updateJsonFile(manifestName, (json) => {
		json.version = version;
		return json;
	});
}

console.log(`Release version prepared: ${version}`);

async function updateJsonFile(relativePath, updater) {
	const filePath = path.join(rootDir, relativePath);
	const raw = await readFile(filePath, "utf8");
	const json = JSON.parse(raw);
	const updated = updater(json);
	await writeFile(filePath, `${JSON.stringify(updated, null, "\t")}\n`);
}

function getVersionArgument(args) {
	const versionIndex = args.findIndex((arg) => arg === "--version");

	if (versionIndex === -1 || !args[versionIndex + 1]) {
		console.error("Missing required --version argument.");
		process.exit(1);
	}

	const version = args[versionIndex + 1];
	if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
		console.error(`Invalid semantic version: ${version}`);
		process.exit(1);
	}

	return version;
}
