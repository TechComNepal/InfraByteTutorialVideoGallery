import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AuthProvider } from "oidc-react";
import { oidcConfig } from "./config/config";



// const oidcConfig = {
//   authority: "https://localhost:5020",
//   clientId: "react_tutorial_client",
//   redirectUri: "https://tutorial.infrabyte.com.au/callback",
//   postLogoutRedirectUri: "https://tutorial.infrabyte.com.au/",
//   response_type: "code",
//   scope: "openid profile email jobbookingapi offline_access",
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig} autoSignIn={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
