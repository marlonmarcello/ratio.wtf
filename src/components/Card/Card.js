import React from "react";

import { classnames } from "../../utils/helpers";

import styles from "./Card.module.scss";

export default function Card({ children, className, tag, ...props }) {
  const Tag = tag || "div";

  return (
    <Tag className={classnames([styles.Card, className])} {...props}>
      {children}
    </Tag>
  );
}
