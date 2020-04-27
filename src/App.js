import React, { useState, useMemo } from "react";

// Components
import Input from "./components/Input/Input";
import InputGroup from "./components/InputGroup/InputGroup";
import InputLabel from "./components/InputLabel/InputLabel";
import Fieldset from "./components/Fieldset/Fieldset";

// Styles
import styles from "./App.module.scss";

function App() {
  const [dimensions, setDimensions] = useState({
    width: 16,
    height: 9,
    newWidth: "",
    newHeight: "",
  });

  const ratio = useMemo(() => {
    if (!dimensions.width || !dimensions.height) return 0;
    return dimensions.width / dimensions.height;
  }, [dimensions.height, dimensions.width]);

  const updateRatios = (e) => {
    const name = e.target.name;
    const val = e.target.value ? parseInt(e.target.value) : "";
    const newDimensions = { ...dimensions, [name]: val };

    if (newDimensions.width && newDimensions.height && val) {
      if (name === "newWidth" && val > 0)
        newDimensions.newHeight =
          newDimensions.newWidth * (newDimensions.height / newDimensions.width);
      if (name === "newHeight" && val > 0)
        newDimensions.newWidth =
          newDimensions.newHeight *
          (newDimensions.width / newDimensions.height);
    }

    setDimensions(newDimensions);
  };

  return (
    <div className={styles.App}>
      <Fieldset legend="Original dimensions">
        <InputGroup>
          <InputLabel>Width</InputLabel>
          <Input
            value={dimensions.width}
            name="width"
            onChange={updateRatios}
            type="number"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Height</InputLabel>
          <Input
            value={dimensions.height}
            name="height"
            onChange={updateRatios}
            type="number"
          />
        </InputGroup>
        <p>Ratio: {ratio}</p>
      </Fieldset>
      <Fieldset legend="New dimensions">
        <InputGroup>
          <InputLabel>Width</InputLabel>
          <Input
            value={dimensions.newWidth}
            name="newWidth"
            onChange={updateRatios}
            type="number"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Height</InputLabel>
          <Input
            value={dimensions.newHeight}
            name="newHeight"
            onChange={updateRatios}
            type="number"
          />
        </InputGroup>
      </Fieldset>
    </div>
  );
}

export default App;
