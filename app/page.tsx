"use client";
import { useEffect, useState } from "react";

export default function Home() {
  // const [message, setMessage] = useState();
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/get-zoom-token");
  //     const { message } = await res.json();
  //     setMessage(message);
  //   };
  //   fetchData();
  // }, []);

  // if (!message) return <p>Loading...</p>;

  const handleClickToken = async () => {
    const res = await fetch("/api/get-zoom-token");
    const data = await res.json();
    console.log("handleClickToken", data);
  };

  const handleClickRecordList = async () => {
    const res = await fetch("/api/me");
    const data = await res.json();
    console.log("handleClickRecordList", data);
  };

  return (
    <>
      <button type="button" onClick={handleClickToken}>
        get token
      </button>
      <button type="button" onClick={handleClickRecordList}>
        get me
      </button>
    </>
  );
}
