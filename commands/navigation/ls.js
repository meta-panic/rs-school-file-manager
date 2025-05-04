import fs from "node:fs";

export function ls({ logger }) {
  const files = fs.readdirSync(process.cwd(), { recursive: false, withFileTypes: true })
    .map((file) => {
      return {
        name: file.name,
        type: file.isFile() ? "file" : "directory",
      }
    })
    .sort((file) => file.type === "file" ? 1 : -1)
    .map((file, index) => {
      return {
        ...file,
        index: String(index),
      }
    });

  logger.printTable(
    files,
      {
        columns: ["index", "name", "type"],
        colors: { name: "yellow", index: "blue", type: "yellow" },
      }
  );
}

