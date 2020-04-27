import React from "react";

import { classnames } from "../../utils/helpers";

import styles from "./Input.module.scss";

export default function Input({ className, label, ...props }) {
  return <input className={classnames([styles.Input, className])} {...props} />;
}
