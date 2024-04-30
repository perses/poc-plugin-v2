import minimist from "minimist";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";

const cwd = process.cwd();

const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ["_"] });

const renameFiles: Record<string, string | undefined> = {
  _gitignore: ".gitignore",
};

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

function isValidPluginName(name: string) {
  return name.match(/[a-z0-9_]*$/) && name.length > 3;
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.join(destDir, renameFiles[file] ?? file);
    copy(srcFile, destFile);
  }
}

function editFile(file: string, callback: (content: string) => string) {
  const content = fs.readFileSync(file, "utf-8");
  fs.writeFileSync(file, callback(content), "utf-8");
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]);
  const targetDir = argTargetDir || ".";

  let result: prompts.Answers<"pluginName" | "pluginType" | "overwrite">;
  let root: string = "";

  try {
    result = await prompts([
      {
        type: "select",
        name: "pluginType",
        message: "Pick a Perses plugin type",
        choices: [{ title: "Panel", value: "panel" }],
      },
      {
        type: "text",
        name: "pluginName",
        message: "What will be the name of your Perses plugin?",
        validate: (dir) =>
          isValidPluginName(dir) ||
          "Invalid plugin name. It can only contain lowercase letters, numbers and underscores",
        onState: (state) => {
          root = path.join(cwd, targetDir, state.value);
        },
      },
      {
        type: () => (!fs.existsSync(root) || isEmpty(root) ? null : "select"),
        name: "overwrite",
        message: () =>
          (targetDir === "."
            ? "Current directory"
            : `Target directory "${targetDir}"`) +
          ` is not empty. Please choose how to proceed:`,
        initial: 0,
        choices: [
          {
            title: "Remove existing files and continue",
            value: "yes",
          },
          {
            title: "Cancel operation",
            value: "no",
          },
          {
            title: "Ignore files and continue",
            value: "ignore",
          },
        ],
      },
      {
        type: (_, { overwrite }: { overwrite?: string }) => {
          if (overwrite === "no") {
            throw new Error("✖ Operation cancelled");
          }
          return null;
        },
        name: "overwriteChecker",
      },
    ]);
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { pluginName, pluginType, overwrite } = result;

  if (overwrite === "yes") {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../..",
    `template-${pluginType}`
  );

  copyDir(templateDir, root);

  editFile(path.resolve(root, `package.json`), (content) => {
    return content.replace("{{pluginName}}", pluginName);
  });

  editFile(path.resolve(root, `rsbuild.config.ts`), (content) => {
    return content.replace("{{pluginName}}", pluginName);
  });
}

init().catch((e) => {
  console.error(e);
});
