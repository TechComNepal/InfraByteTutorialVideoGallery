import React, { useEffect, useState } from "react";

import "../Assets/Css/Loading.css";
import { isAuthenticatedUser } from "../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { getTokenUrl, oidcConfig } from "../config/config";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";

const Loading = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  useEffect(() => {
    // setTimeout(() => {

    const code = query.get("code");
    if (code) {
      // console.log("Authorization code:", code);

      localStorage.setItem("code", code);
      getToken(code);
    } else {
      setLoading(false);
      navigate("/", { replace: true });
    }
    //  else {
    //   // const item = sessionStorage.getItem(
    //   //   `oidc.user:${oidcConfig.authority}:react_tutorial_client`
    //   // );
    //   // if (item != null) { setLoading(false);
    //   //   navigate("/videos",{replace:true});
    //   // }
    // }
    // }, 3000);
  }, [navigate]);

  const getToken = async (code) => {
    const codeVerifier = Cookies.get("pkce_code_verifier");
    // const tokenParams = new URLSearchParams();
    // tokenParams.append("grant_type", "authorization_code");
    // tokenParams.append("client_id", oidcConfig.clientId);
    // tokenParams.append("code", code);
    // tokenParams.append("redirect_uri", oidcConfig.redirectUri);
    // tokenParams.append("code_verifier", codeVerifier);

    var payload = {
      grant_type: "authorization_code",
      client_id: oidcConfig.clientId,
      code: code,
      redirect_uri: oidcConfig.redirectUri,
      code_verifier: codeVerifier,
    };

    await axios
      .post(getTokenUrl, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        const accessToken =
          process.env.REACT_APP_ENVIRONMENT != "dev"
            ? response.data.access_token
            : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcwNjc5RDUyNUE5NEVFNDExRjFFRDg4NUZDNzI4ODVEIiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL3NlY3VyaXR5LnN0YWdpbmcuaW5mcmFieXRlLmNvbS5hdSIsIm5iZiI6MTcyMTEwMjA3NiwiaWF0IjoxNzIxMTAyMDc2LCJleHAiOjE3MjExNjY4NzYsImF1ZCI6WyJqb2Jib29raW5nYXBpIiwiaHR0cHM6Ly9zZWN1cml0eS5zdGFnaW5nLmluZnJhYnl0ZS5jb20uYXUvcmVzb3VyY2VzIl0sInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsImpvYmJvb2tpbmdhcGkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl0sImNsaWVudF9pZCI6InJlYWN0X3R1dG9yaWFsX2NsaWVudCIsInN1YiI6ImIwNmJhOWZjLTBiZjQtNGMzYi1iMTJiLWVkOTY4ODAxOThmMiIsImF1dGhfdGltZSI6MTcyMTEwMjA3MCwiaWRwIjoibG9jYWwiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9mdWxsTmFtZSI6Ik5pcmFqICBMQU1BIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvdXNlck5hbWUiOiJOaXJhai5MYW1hIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvZmlyc3ROYW1lIjoiTmlyYWoiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9taWRkbGVOYW1lIjoiIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvbGFzdE5hbWUiOiJMYW1hIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvZW1haWxBZGRyZXNzIjoibnN3IiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlTm8iOiI5ODY5MzQ0MTIxIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI5MzY1OTA3OC1iOTU5LTQyMWEtOTE4NC05YTI2NDg1ZTM2M2IiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9icmFuY2hjb2RlIjoiMTAwMDAxNCIsImh0dHA6Ly9zY2hlbWFzLmExZ2Fhcy5jb20vaWRlbnRpdHkvY2xhaW1zL2JyYW5jaGlkIjoiMWRlNGY5MzMtODgzYy00ZjllLTIyMDYtMDhkYzM0ZmNhMWU3IiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvYnJhbmNobmFtZSI6Ik5ld2Nhc3RsZSBCcmFuY2giLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9Jc1N1YnNjcmlwdGlvbkFjdGl2ZSI6ImZhbHNlIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvZGVmYXVsdFRpbWVab25lSWQiOiJBdXN0cmFsaWEvU3lkbmV5IiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvYnJhbmNoVGltZVpvbmVJZCI6IkF1c3RyYWxpYS9TeWRuZXkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiSUZCMDAwMDgtYzE5NDUtTW9iaWxlIEFwcCBBZG1pbiIsIlN1cGVyIEFkbWluIiwiSUZCMDAwMDgtYzE5NDUtSUZCMDAwMDgtYzE5NDUtV2ViIEFwcCBBZG1pbiJdLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTmlyYWouTGFtYSIsImh0dHA6Ly9zY2hlbWFzLmExZ2Fhcy5jb20vaWRlbnRpdHkvY2xhaW1zL0lzRW1haWxWZXJpZmllZCI6IkZhbHNlIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvSXNQaG9uZVZlcmlmaWVkIjoiRmFsc2UiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9jb21wYW55TmFtZSI6IkRlbW8gQ29tcGFueSAxIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvaXNPZmZzaG9yZSI6IkZhbHNlIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvb2Zmc2hvcmVCcmFuY2hJZCI6IiIsInNpZCI6IjAzNUU2QjY4MEZBNjY4NkZEODhFQzZDNERGMDlCMDQ3IiwianRpIjoiREVFRjE3MzVCN0FFMUY5MTA3RTg1MDQxODRGMEE3RTIifQ.TYSTvDEobVSguYK37uiTKeEMjtp6FtIrzvnrrHEpzKeA8g7UAA-HQeGQFe9aryqA6oMVJgo-JtBMirVTUnAmy671fsAA7geTSJWnFUJUpdhNcSxh4p7srmrcwHEg8NiV00db-Jqdtvpug3dHbLRs5c4QXc4Fw3MWMByIhfBq-bTHRiZ66b15t8EQulEiaNUXFyutE8lDHUMqa8gkJy_Eo-_ZneEhGpdP0dehTR_KT6_Sibn3rtePhykSJLnUvE3gEPrOtVPVYP_--7XNmtRprLogKAGINn38rVTpnae0ItNhgHsHA9b_4OU49Nm69r5rjtnqlzHkebyDe8cogoJ7vQ";
        // const accessToken =
        const idToken = response.data.id_token;

        // Save tokens to localStorage or state management
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("id_token", idToken);
        localStorage.setItem("token", accessToken);
        var token = jwtDecode(accessToken);
        localStorage.setItem(
          "userName",
          token["http://schemas.a1gaas.com/identity/claims/name"]
        );

        var roles =
          token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        //if admins then true
        if (
          roles.includes("Admin") ||
          roles.includes("System Admin") ||
          roles.includes("Super Admin")
        ) {
          localStorage.setItem("role", true);
        } else {
          localStorage.setItem("role", false);
        }
        navigate("/videos", { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error fetching token:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Please wait ...</p>
    </div>
  );
};

export default Loading;
