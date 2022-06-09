import "./App.css";
import { useRoutes } from "react-router";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const routing = useRoutes(routes);
  return <div>{routing}</div>;
}

export default App;
