import React from "react";

import { classnames } from "../../utils/helpers";

import styles from "./Fieldset.module.scss";
import Card from "../Card/Card";

export default function Fieldset({ legend, className, children, ...props }) {
  return (
    <Card
      tag="fieldset"
      className={classnames([styles.Fieldset, className])}
      {...props}
    >
      {legend && <legend className={styles.Fieldset__legend}>{legend}</legend>}
      {children}
    </Card>
  );
}
