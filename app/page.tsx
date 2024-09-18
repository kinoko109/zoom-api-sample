"use client";
import { useEffect, useState } from "react";
import JsonFormatter from "react-json-formatter";

const jsonStyle = {
  propertyStyle: { color: "red" },
  stringStyle: { color: "green" },
  numberStyle: { color: "darkorange" },
};

export default function Home() {
  const [response, setResponse] = useState();

  const handleClickToken = async () => {
    const res = await fetch("/api/get-zoom-token");
    const data = await res.json();
    console.log("handleClickToken", data);
    setResponse(data);
  };

  const handleClickRecordList = async () => {
    const res = await fetch("/api/me");
    const data = await res.json();
    console.log("handleClickRecordList", data);
    setResponse(data);
  };

  return (
    <main className="p-14 flex">
      <div className="flex-1">
        <div>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110"
            onClick={handleClickToken}
          >
            get token
          </button>
          <p>https://zoom.us/oauth/token</p>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110"
            onClick={handleClickRecordList}
          >
            get me
          </button>
          <p>https://api.zoom.us/v2/users/me</p>
        </div>
      </div>

      <div className="p-10 flex-1 border-2 h-screen w-[50%] break-words overflow-auto">
        {<JsonFormatter json={response} tabWith={4} jsonStyle={jsonStyle} />}
      </div>
    </main>
  );
}
