export const isAuthenticatedUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  return true;
};

export const getHeaders= ()=>{
  var token = localStorage.getItem("token");

  var headers = {
    Authorization: `Bearer ${token}`,
    accept: "*/*",
    // Connection: "keep-alive",
    "Content-Type": "application/json; charset=utf-8",
    // "Access-Control-Allow-Origin": "https://tutorial.infrabyte.com.au",
  };
  return headers;
}
