import React from "react";

import { classnames } from "../../utils/helpers";

import styles from "./Logo.module.scss";

export default function Logo({ className }) {
  return (
    <h1 className={classnames([styles.Logo, className])}>
      <span className={styles.Logo__icon}>1:1</span>ratio.wtf
    </h1>
  );
}
