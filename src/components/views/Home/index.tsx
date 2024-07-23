import React from "react";
import {Layout} from "@/components/Layout";
import styles from "./index.module.scss";

const View: React.FC = () => {
  return (
    <>
      <Layout>
        <div className={styles.container}>
          タケグチ シゲキ
        </div>
      </Layout>
    </>
  );
};

export default View;
