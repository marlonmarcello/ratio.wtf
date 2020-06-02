import React, { useState } from "react";
import * as math from "mathjs";

// Components
import Input from "./components/Input/Input";
import InputGroup from "./components/InputGroup/InputGroup";
import InputLabel from "./components/InputLabel/InputLabel";
import Fieldset from "./components/Fieldset/Fieldset";
import Logo from "./components/Logo/Logo";
import WTCLogo from "./components/WTCLogo/WTCLogo";

// Utils
import { gcdString } from "./utils/helpers";

// Styles
import styles from "./App.module.scss";

function App() {
  const [dimensions, setDimensions] = useState({
    width: 16,
    height: 9,
    newWidth: "",
    newHeight: "",
    gcdString: gcdString(16, 9),
    ratio: 16 / 9,
  });

  const [wtf, setWtf] = useState(false);

  const evaluateAll = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    const { width, height, newWidth, newHeight, ...rest } = dimensions;

    let evaluated = { width, height, newWidth, newHeight, [name]: val };
    let newInputValues = { ...evaluated, ...rest };

    // check for invalid strings
    let isInvalid = false;
    for (let [key, val] of Object.entries(evaluated)) {
      if (val) {
        try {
          evaluated[key] = math.evaluate(val);
        } catch (err) {
          isInvalid = true;
        }
      }
    }

    // if it's invalid set wtf to true
    if (isInvalid) {
      if (name === "width" || name === "height") setWtf(true);
    } else {
      // otherwise get new dimensions and save
      if (evaluated.width && evaluated.height) {
        if (name === "newWidth" || (name === "width" && evaluated.newHeight))
          newInputValues.newHeight =
            evaluated.newWidth * (evaluated.height / evaluated.width);

        if (name === "newHeight" || (name === "height" && evaluated.newWidth))
          newInputValues.newWidth =
            evaluated.newHeight * (evaluated.width / evaluated.height);

        newInputValues.ratio = evaluated.width / evaluated.height;
        newInputValues.gcdString = gcdString(evaluated.width, evaluated.height);

        setWtf(false);
      }
    }

    // save new inputs
    setDimensions(newInputValues);
  };

  const evaluateSingle = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    try {
      const evaluated = math.evaluate(val);
      setDimensions((cur) => {
        return { ...cur, [name]: evaluated };
      });
    } catch (err) {}
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) evaluateSingle(e);
  };

  return (
    <div className={styles.App}>
      <Logo
        className={styles.App__logo}
        aspectWidth={wtf ? null : dimensions.width}
        aspectHeight={wtf ? null : dimensions.height}
      />
      <Fieldset className={styles.App__fieldset} legend="Original dimensions">
        <InputGroup>
          <InputLabel>Width</InputLabel>
          <Input
            value={dimensions.width}
            name="width"
            onChange={evaluateAll}
            onKeyUp={onKeyUp}
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Height</InputLabel>
          <Input
            value={dimensions.height}
            name="height"
            onChange={evaluateAll}
            onKeyUp={onKeyUp}
            type="text"
          />
        </InputGroup>
        <p className={styles["App__ratio-label"]}>
          Ratio: {wtf ? "wtf" : dimensions.ratio}
        </p>
        <p className={styles["App__ratio-label"]}>
          Aspect Ratio: {wtf ? "wtf:wtf" : dimensions.gcdString}
        </p>
      </Fieldset>
      <Fieldset className={styles.App__fieldset} legend="New dimensions">
        <InputGroup>
          <InputLabel>Width</InputLabel>
          <Input
            value={dimensions.newWidth}
            name="newWidth"
            onChange={evaluateAll}
            onKeyUp={onKeyUp}
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Height</InputLabel>
          <Input
            value={dimensions.newHeight}
            name="newHeight"
            onChange={evaluateAll}
            onKeyUp={onKeyUp}
            type="text"
          />
        </InputGroup>
      </Fieldset>
      <div className={styles.App__footer}>
        <p>
          Brought to you by{" "}
          <a href="//wethecollective.com">
            <WTCLogo />
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
