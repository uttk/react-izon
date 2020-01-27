import * as React from "react";
import * as ReactDOM from "react-dom";

const JSONPreview = () => {
  const [json, setJSON] = React.useState({});
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch("/dependencies").then(res => {
      res
        .json()
        .then(setJSON)
        .catch(() => setError("情報の取得に失敗しました"));
    });
  }, []);

  return (
    <div>
      <code>{JSON.stringify(json)}</code>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
};

const App = () => (
  <>
    <h1>Hello World!</h1>

    <JSONPreview />
  </>
);

ReactDOM.render(<App />, document.getElementById("app"));
