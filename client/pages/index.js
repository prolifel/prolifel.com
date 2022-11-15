import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const XTerminalWithNoSSR = dynamic(
  () => import("../components/terminal-component"),
  { ssr: false }
);

export default function Home() {
  // useEffect(() => {
  //   async function initSocket() {
  //     await socketInitializer();
  //   }
  //   initSocket();
  // }, []);

  // const socketInitializer = async () => {
  //   await fetch(serverAddress);
  //   socket = io();

  //   socket.on("connect", () => {
  //     console.log("connected");
  //   });

  //   socket.on("update-input", (msg) => {
  //     setInput(msg);
  //   });
  // };

  return (
    <main>
      <XTerminalWithNoSSR />
      {/* <div id="terminal-container"></div> */}
    </main>
  );
}
