export const environment = {
  production: true,
  authority: "https://sso-test-angularDoder.azurewebsites.net",
  client_id: "angularApp",
  scopes: "openid profile roles apiGateway customersApi api1",
  redirect_uri: "https://neuridiumtest.azureedge.net/redirect",
  silent_redirect_uri: "https://neuridiumtest.azureedge.net/silent-renew.html",
  post_logout_redirect_uri: "https://neuridiumtest.azureedge.net/logoutredirect",
  silent_renew_offset_in_seconds: 20,

  filterProtocolClaims: true,
  loadUserInfo: true,

  max_id_token_iat_offset_allowed_in_seconds: 120,

  apiUrl: "https://apigateway-test-angularDoder.azurewebsites.net/",
  debugMode: false
};
