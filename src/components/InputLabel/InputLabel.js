import React from "react";

import styles from "./InputLabel.module.scss";

export default function InputLabel({ children }) {
  return <p className={styles.InputLabel}>{children}</p>;
}
