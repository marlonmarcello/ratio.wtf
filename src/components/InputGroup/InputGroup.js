import React from "react";

import { classnames } from "../../utils/helpers";

import styles from "./InputGroup.module.scss";

export default function InputGroup({ className, children, ...props }) {
  return (
    <label className={classnames([styles.InputGroup, className])} {...props}>
      {children}
    </label>
  );
}
