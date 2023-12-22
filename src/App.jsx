import { useState } from "react";
import "./App.css";

function App() {
  const [bmi, setBmi] = useState(null);
  const [verdict, setVerdict] = useState([0, 0]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [visible, setVisible] = useState("none");

  function reset() {
    setVisible("none");
    setWeight("");
    setHeight("");
  }

  function calculate(event) {
    event.preventDefault();
    setWeight(event.target[1].value);
    let localBmi = ((event.target[1].value / event.target[0].value ** 2) * 10000).toFixed(
      1
    );
    if (localBmi == Infinity || isNaN(localBmi)) {
      localBmi = `¯\\_(ツ)_/¯`;
      setBmi(localBmi);
      setVerdict(["", "lightcoral"]);
    } else {
      setBmi(localBmi);
      // eslint-disable-next-line default-case
      switch (true) {
        case localBmi < 18.5:
          setVerdict(["Per mažas svoris", "rgb(174, 217, 210)"]);
          break;
        case localBmi >= 18.5 && localBmi <= 24.9:
          setVerdict(["Normalus svoris", "rgb(155, 231, 86)"]);
          break;
        case localBmi >= 25.0 && localBmi <= 29.9:
          setVerdict(["Viršsvoris", "rgb(254, 252, 165)"]);
          break;
        case localBmi >= 30.0 && localBmi <= 34.9:
          setVerdict(["I Laipsnio nutukimas", "rgb(253, 216, 5)"]);
          break;
        case localBmi >= 35.0 && localBmi <= 39.9:
          setVerdict(["II Laipsnio nutukimas", "rgb(246, 140, 49)"]);
          break;
        case localBmi >= 40.0:
          setVerdict(["III Laipsnio nutukimas", "rgb(246, 140, 49)"]);
          break;
      }
    }
    setVisible("block");
  }

  return (
    <div className="App">
      <h1>KMI Skaičiuoklė</h1>
      <div id="input">
        <form onSubmit={(event) => calculate(event)}>
          <label htmlFor="heigth">Ūgis(cm)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <label htmlFor="weight">Svoris(kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button type="submit">Skaičiuoti</button>
        </form>
      </div>
      <div id="output" style={{ display: `${visible}` }}>
        <h2>
          <span id="verdict">{verdict[0]}</span>
          <br></br>
          <br></br> Jūsų kūno masės indeksas yra:
          <br />
          <br />
          <span style={{ color: verdict[1] }}>{bmi} </span>kg/m²
        </h2>
        <button onClick={reset}>Išvalyti</button>
      </div>
    </div>
  );
}

export default App;
