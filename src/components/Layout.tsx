import {ReactNode} from "react";
import Head from "next/head";
import styles from "./global.module.scss";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Head>
        <title>タケグチ シゲキ: Shigeki Takeguchi</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=390" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main>{props.children}</main>
      </div>
    </>
  );
};
