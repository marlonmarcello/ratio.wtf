import React, { useRef, useEffect, useState } from "react";
import * as math from "mathjs";

import { classnames } from "../../utils/helpers";

import { gcdString } from "../../utils/helpers";

import styles from "./Logo.module.scss";

const KNOW_ASPECTS = ["1:1", "3:2", "4:3", "4:5", "16:9"];

export default function Logo({ className, aspectWidth, aspectHeight }) {
  const [state, setState] = useState({
    width: aspectWidth,
    height: aspectHeight,
    gcd: "16:9",
  });
  const animateTimer = useRef();
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    console.log({ aspectWidth, aspectHeight });
    clearTimeout(animateTimer.current);

    animateTimer.current = setTimeout(() => {
      let width, height, invalid, gcd;

      try {
        width = math.evaluate(aspectWidth);
        height = math.evaluate(aspectHeight);
      } catch (e) {
        invalid = true;
      }

      gcd = !invalid ? gcdString(width, height) : "WTF";

      if (
        (width === state.width && height === state.height) ||
        gcd === state.gcd
      )
        return;

      setAnimation(true);

      animateTimer.current = setTimeout(() => {
        setAnimation(null);

        if (invalid) {
          setState((cur) => {
            return { ...cur, gcd: "WTF" };
          });

          return;
        }

        const gcd = gcdString(width, height);

        setState(() => {
          return {
            width,
            height,
            gcd: !KNOW_ASPECTS.includes(gcd) ? "WTF" : gcd,
          };
        });
      }, 600);
    }, 1000);
  }, [aspectHeight, aspectWidth, state.gcd, state.height, state.width]);

  return (
    <h1
      className={classnames([
        styles.Logo,
        animation && styles["Logo--animate"],
        className,
      ])}
    >
      ratio{" "}
      <span className={styles.Logo__icon}>
        <span
          className={styles["Logo__icon-square"]}
          style={
            state.gcd === "WTF"
              ? null
              : { "--width": state.width, "--height": state.height }
          }
        />
        <span className={styles["Logo__icon-text"]}>{state.gcd}</span>
      </span>
    </h1>
  );
}
