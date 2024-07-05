var authority = "https://localhost:5020";
var clientId = "react_tutorial_client";
var redirectUri = "http://localhost:3000/callback";
var postLogoutRedirectUri = "http://localhost:3000/";
var apiBaseUrl= 'https://api.staging.infrabyte.com.au/api/';
const responseType = 'id_token token';

if (process.env.REACT_APP_ENVIRONMENT == "production") {
  authority = "https://security.staging.infrabyte.com.au";
  redirectUri = "https://tutorial.infrabyte.com.au/callback";
  postLogoutRedirectUri = "https://tutorial.infrabyte.com.au/";
  apiBaseUrl= 'https://api.infrabyte.com.au/api/'
}
// used to test
// exports.loginUrl = `${authority}/connect/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid profile email jobbookingapi offline_access&state=2323&code_challenge=231232&code_challenge_method=S256`;

// console.log(this.loginUrl)

exports.tutorialUpload=`${apiBaseUrl}v6.1/BookingTutorial/UploadJobBookingTutorialFiles`;
exports.getTokenUrl= `${authority}/connect/token`;
// exports.getAuthorizationUrl= `${authority}`;
exports.getAuthorizationUrl= `${authority}/connect/authorize`;

exports.tokenPayload= ()=>{

}
 
const getCodeChallenge=()=> {
  return generateCodeVerifier();
}

const getState=()=> {
  return  getRandomString(2);
}

function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}

const generateCodeVerifier=() =>{
  var array = new Uint32Array(50 / 2);
  window.crypto.getRandomValues(array)
  return Array.from(array, dec2hex).join("");
}

const getRandomString =(num)=>{
  var array = new Uint32Array(num / 2);
 return window.crypto.getRandomValues(array);
}


exports.oidcConfig = {
  authority: authority,
  clientId: clientId,
  redirectUri: redirectUri,
  postLogoutRedirectUri: postLogoutRedirectUri,
  response_type: "code",
  responseType: responseType,
  scope: "openid profile email jobbookingapi offline_access",

  // state:getState(),
  // code_challenge: getCodeChallenge(),
  // code_challenge_method:'S256'
};
