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
  return (
    <main>
      <XTerminalWithNoSSR />
    </main>
  );
}
