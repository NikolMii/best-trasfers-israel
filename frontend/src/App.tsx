import { BrowserRouter } from "react-router";
import "./App.css";
import Layout from "./features/layout/layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout></Layout>
    </BrowserRouter>
  );
}
