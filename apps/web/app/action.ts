"use server";

import { sum, readFileInfo } from "native";
// import {  } from "node-loader";

export async function getSystemInfo({ a, b }: { a: number; b: number }) {
  const result = sum(a, b);
  const fileInfo = readFileInfo("/home/ruru/Projects/turbo-monorepo-with-multi-language/apps/express/package.json");

  return {
    data: result,
    fileInfo,
  };
}
