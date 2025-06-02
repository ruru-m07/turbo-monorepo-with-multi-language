"use client";

import { getSystemInfo } from "./action";

export default function Home() {
  return (
    <div>
      <button
        onClick={async () => {
          const data = await getSystemInfo({
            a: 1,
            b: 2000,
          });
          console.log({
            data: data,
          });
          console.log(data.fileInfo.content);
        }}
      >
        getSystemInfo
      </button>
    </div>
  );
}
