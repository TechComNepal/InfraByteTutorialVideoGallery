

var authority = "https://localhost:5020";
var clientId = "react_tutorial_client";
var redirectUri = "http://localhost:3000/callback";
var postLogoutRedirectUri = "http://localhost:3000/";

if (process.env.environment == "production") {
    redirectUri="https://tutorial.infrabyte.com.au/callback";
    postLogoutRedirectUri= "https://tutorial.infrabyte.com.au/";
}

exports.oidcConfig = {
  authority: authority,
  clientId: clientId,
  redirectUri: redirectUri,
  postLogoutRedirectUri: postLogoutRedirectUri,
  response_type: "code",
  scope: "openid profile email jobbookingapi offline_access",
};
