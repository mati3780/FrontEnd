// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authority: "https://localhost:44348",
  client_id: "angularApp",
  scopes: "openid profile roles apiGateway customersApi api1",
  redirect_uri: "http://localhost:4200/redirect",
  silent_redirect_uri: "http://localhost:4200/silent-renew.html",
  post_logout_redirect_uri: "http://localhost:4200/logoutredirect",
  silent_renew_offset_in_seconds: 20,

  filterProtocolClaims: true,
  loadUserInfo: true,

  max_id_token_iat_offset_allowed_in_seconds: 120,

  apiUrl: "https://localhost:44300/",
  debugMode: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
