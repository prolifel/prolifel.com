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
  // const Terminal = dynamic(
  //   {
  //     loader: () => import("xterm").then((mod) => mod.Terminal),
  //     render: (props, Terminal) => {
  //       const term = new Terminal();
  //       // Add logic with `term`
  //       term.write("kontol");
  //       return <></>;
  //     },
  //   },
  //   {
  //     ssr: false,
  //   }
  // );
  // const xtermRef = useRef(null);

  // useEffect(() => {
  //   // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
  //   xtermRef.current.terminal.writeln("Hello, World!");
  // }, []);

  return <XTerminalWithNoSSR />;
}
