var authority = "https://localhost:5020";
var clientId = "react_tutorial_client";
var redirectUri = "http://localhost:3000/callback";
var postLogoutRedirectUri = "http://localhost:3000/";

if (process.env.REACT_APP_ENVIRONMENT == "production") {
  authority = "https://security.staging.infrabyte.com.au";
  redirectUri = "https://tutorial.infrabyte.com.au/callback";
  postLogoutRedirectUri = "https://tutorial.infrabyte.com.au/";
}

exports.loginUrl = `${authority}/connect/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid profile email jobbookingapi offline_access&state=2323&code_challenge=231232&code_challenge_method=S256`;

console.log(this.loginUrl)

exports.oidcConfig = {
  authority: authority,
  clientId: clientId,
  redirectUri: redirectUri,
  postLogoutRedirectUri: postLogoutRedirectUri,
  response_type: "code",
  scope: "openid profile email jobbookingapi offline_access",
};
