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
  const [activeState, setActiveState] = useState<"token" | "me" | "">("");

  const handleClickToken = async () => {
    const res = await fetch("/api/get-zoom-token");
    const data = await res.json();
    setResponse(data);
    setActiveState("token");
  };

  const handleClickRecordList = async () => {
    const res = await fetch("/api/me");
    const data = await res.json();
    setResponse(data);
    setActiveState("me");
  };

  return (
    <main className="p-14 flex gap-5">
      <div className="flex-1">
        <div className={`${activeState === "token" && "bg-amber-300"} p-2`}>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110"
            onClick={handleClickToken}
          >
            get token
          </button>
          <p>https://zoom.us/oauth/token</p>
        </div>
        <div className={`${activeState === "me" && "bg-amber-300"} p-2 mt-4`}>
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

      <div className="p-10 flex-1 border-2 h-[calc(100%_-_3.5rem)] w-[50%] break-words overflow-auto">
        {response && (
          <JsonFormatter json={response} tabWith={4} jsonStyle={jsonStyle} />
        )}
      </div>
    </main>
  );
}
