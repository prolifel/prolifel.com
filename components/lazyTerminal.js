import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("./terminal-component"),
  {
    ssr: false,
  }
);

export default () => <DynamicComponentWithNoSSR />;
