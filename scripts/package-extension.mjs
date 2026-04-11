#!/usr/bin/env node

import { spawn } from "node:child_process";
import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputTarget = process.argv[2] ?? "all";
const validTargets = ["chrome", "firefox"];
const targets = inputTarget === "all" ? validTargets : [inputTarget];

for (const target of targets) {
	if (!validTargets.includes(target)) {
		console.error(`Unsupported build target: ${target}`);
		process.exit(1);
	}
}

await runCommand(rootDir);

for (const target of targets) {
	await packageTarget(target);
}

async function packageTarget(target) {
	const outputDir = path.join(rootDir, "build", target);
	const manifestPath = path.join(rootDir, `manifest.${target}.json`);

	await rm(outputDir, { recursive: true, force: true });
	await mkdir(outputDir, { recursive: true });

	await cp(path.join(rootDir, "dist"), path.join(outputDir, "dist"), { recursive: true });
	await cp(path.join(rootDir, "public"), path.join(outputDir, "public"), { recursive: true });
	await cp(manifestPath, path.join(outputDir, "manifest.json"));

	console.log(`Packaged ${target} extension in build/${target}`);
}

function runCommand(cwd) {
	return new Promise((resolve, reject) => {
		const command = process.platform === "win32" ? "cmd.exe" : "npm";
		const args = process.platform === "win32" ? ["/d", "/s", "/c", "npm run build"] : ["run", "build"];

		const child = spawn(command, args, {
			cwd,
			stdio: "inherit",
			shell: false,
		});

		child.on("exit", (code) => {
			if (code === 0) {
				resolve();
				return;
			}

			reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
		});

		child.on("error", reject);
	});
}
