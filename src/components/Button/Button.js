import React, { useEffect, useState } from "react";

import { classnames } from "../../utils/helpers";

import styles from "./Button.module.scss";

export default function Button({ className, children, icon, ...props }) {
  const [loadedIcon, setLoadedIcon] = useState();

  useEffect(() => {
    if (!icon) return;

    const loadIcon = async function () {
      const module = await import(`react-icons/fi`);

      setLoadedIcon(module[icon]);
    };

    loadIcon();
  }, [icon]);

  return (
    <button className={classnames([styles.Button, className])} {...props}>
      {loadedIcon && <span className={styles.Button__icon}>{loadedIcon}</span>}
      {children}
    </button>
  );
}
