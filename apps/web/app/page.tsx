"use client";

import { getSystemInfo } from "./action";

export default function Home() {
  return (
    <div>
      <button
        onClick={async () => {
          const data = await getSystemInfo();
          console.log(data.benchmark);
          // console.log(data.fileInfo.content);
        }}
      >
        getSystemInfo
      </button>
    </div>
  );
}
