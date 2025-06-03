"use server";

import { readFileInfo } from "native";
import fs from "fs/promises";
import { performance } from "perf_hooks";

export async function getSystemInfo() {
  const filePath =
    "/home/ruru/Projects/turbo-monorepo-with-multi-language/pnpm-lock.yaml";

  const nativeStartTime = performance.now();
  const nativeContent = readFileInfo(filePath);
  const nativeEndTime = performance.now();
  const nativeTime = nativeEndTime - nativeStartTime;

  const fsStartTime = performance.now();
  let fsContent = { path: filePath };
  try {
    const stats = await fs.stat(filePath);
    const content = await fs.readFile(filePath, "utf8");

    fsContent = {
      path: filePath,
      // @ts-expect-error - .
      content: content,
      size: stats.size,
      modified: stats.mtime.toISOString(),
      error: undefined,
    };
  } catch (error) {
    // @ts-expect-error - .
    fsContent.error = error instanceof Error ? error.message : String(error);
  }
  const fsEndTime = performance.now();
  const fsTime = fsEndTime - fsStartTime;

  return {
    nativeContent,
    fsContent,
    benchmark: {
      nativeTime: `${nativeTime.toFixed(3)}ms`,
      fsTime: `${fsTime.toFixed(3)}ms`,
      difference: `${(nativeTime - fsTime).toFixed(3)}ms`,
      nativeFaster: nativeTime < fsTime,
    },
  };
}
