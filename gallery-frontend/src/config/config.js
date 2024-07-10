
// development
var authority = "https://localhost:5020";
var clientId = "react_tutorial_client";
var redirectUri = "http://localhost:3000/callback";
var postLogoutRedirectUri = "http://localhost:3000/logout-callback";
var apiBaseUrl = "https://api.staging.infrabyte.com.au/api/";

if (process.env.REACT_APP_ENVIRONMENT == "production") {
  authority = "https://security.staging.infrabyte.com.au";
  redirectUri = "https://tutorial.infrabyte.com.au/callback";
  postLogoutRedirectUri = "https://tutorial.infrabyte.com.au/logout-callback";
  apiBaseUrl = "https://api.infrabyte.com.au/api/";
} else if (process.env.REACT_APP_ENVIRONMENT == "staging") {
  authority = "https://security.staging.infrabyte.com.au";
  redirectUri = "https://tutorial.infrabyte.com.au/callback";
  postLogoutRedirectUri = "https://tutorial.infrabyte.com.au/logout-callback";
  apiBaseUrl = "https://api.staging.infrabyte.com.au/api/";
}
// used to test
// exports.loginUrl = `${authority}/connect/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid profile email jobbookingapi offline_access&state=2323&code_challenge=231232&code_challenge_method=S256`;

// console.log(this.loginUrl)

exports.getTokenUrl = `${authority}/connect/token`; 
// exports.getAuthorizationUrl= `${authority}`;
exports.getAuthorizationUrl = `${authority}/connect/authorize`;

exports.getAllJobTutorials =`${apiBaseUrl}v6/BookingTutorial/GetAllJobTutorials` 
exports.getJobTutorialsByCategorySubCategory =`${apiBaseUrl}v6/BookingTutorial/GetJobTutorialsByCategorySubCategory`
exports.tutorialUpload = `${apiBaseUrl}v6.1/BookingTutorial/UploadJobBookingTutorialFiles`;

exports.tokenPayload = () => {};

exports.oidcConfig = {
  authority: authority,
  clientId: clientId,
  redirectUri: redirectUri,
  postLogoutRedirectUri: postLogoutRedirectUri,
  response_type: "code",
  scope: "openid profile email jobbookingapi offline_access",

  // state:getState(),
  // code_challenge: getCodeChallenge(),
  // code_challenge_method:'S256'
};
