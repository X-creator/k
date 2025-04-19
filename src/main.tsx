import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider, ThemeConfig } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { App } from "./App.tsx";
import "./index.css";

const THEME_CONFIG: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: "#0772cb",
    colorInfo: "#0772cb",
    colorLink: "#0772cb",
    colorSuccess: "#23ffb0",
    colorTextBase: "#fff",
    fontFamily: "Roboto Variable",
  },
};

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ConfigProvider theme={THEME_CONFIG}>
        <App />
      </ConfigProvider>
    </StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found");
}
