export const BaseAPIURL = `https://eidev.ecobank.com:7505/smeapp-service/smileid-token`;

export const PRODUCTNAME = 'biometric_kyc';

export const SmileIDPartnerId = 6349;
export const SmileIdApiKey = 'e1e5596d-bc42-4d8a-8193-b58c484fb376';
// export const SmileIdApiKey = '2830d8f8-e604-465e-a4f1-51e5eaa9c5c9';
export const SmileIdCallbackUrl =
    'https://webhook.site/06650da6-993e-434d-8c37-b29f0ce95a10';
export const SmileIdSidServer = 'https://testapi.smileidentity.com';
// export const SmileIdSidServer = 'https://api.smileidentity.com';
export const SmileIdEnvironment = 'sandbox';
// export const SmileIdEnvironment = 'live';
export const SmileIdCompName = 'eco-smile-id';
export const SmileIdLogoUrl =
    'https://imgd.aeplcdn.com/1280x720/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80';
export const SmileIdPolicyUrl =
    'https://cdn.smileidentity.com/inline/v1/js/script.min.js';

export const InitializeSmileIdTokenUrl = `${BaseAPIURL}/initiate-smile-id-token`;

export const scrIPT =
    'var SmileIdentity=function(){"use strict";const t=document.currentScript.src.split("script")[0];function e(e){var r=document.createElement("iframe");r.setAttribute("src",`${t}${function(t){switch(t){case"biometric_kyc":case"ekyc_smartselfie":return"./../biometric-kyc.html";case"enhanced_kyc":return"./../ekyc.html";case"authentication":case"smartselfie":return"./../smartselfie-auth.html";case"doc_verification":return"./../doc-verification.html";case"basic_kyc":case"identity_verification":return"./../basic-kyc.html";case void 0:return"./../product-selection.html";default:throw new Error(`SmileIdentity: ${t} is not currently supported in this integration`)}}(e)}`),r.setAttribute("id","smile-identity-hosted-web-integration"),r.setAttribute("name","smile-identity-hosted-web-integration"),r.setAttribute("data-cy","smile-identity-hosted-web-integration"),r.setAttribute("frameborder","0"),r.setAttribute("allow","camera; geolocation; encrypted-media; fullscreen"),r.setAttribute("allowtransparency","true"),r.style.cssText="\n\t\t\tbackground-color: transparent;\n\t\t\tbackground-color: rgba(0, 0, 0, .75);\n\t\t\tborder: none;\n\t\t\theight: 100%;\n\t\t\tleft: 0;\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t\twidth: 100%;\n\t\t\tz-index: 999999;\n\t\t",document.body.prepend(r)}const r=["name","logo_url","partner_id","policy_url","theme_color"];return function(t){const i=function(t){if(!t.token)throw new Error("SmileIdentity: Please provide your web token via the `token` attribute");if(!t.callback_url)throw new Error("SmileIdentity: Please provide a callback URL via the `callback_url` attribute");if(!t.product&&!t.id_types)throw new Error("SmileIdentity: Please select a product via the `product` attribute.");if(("biometric_kyc"===t.product||"ekyc_smartselfie"===t.product)&&!t.partner_details)throw new Error("SmileIdentity: Please provide Partner Details via the `partner_details` attribute");if("biometric_kyc"!==t.product&&"ekyc_smartselfie"!==t.product||!t.partner_details||r.forEach((e=>{if(!t.partner_details[e])throw new Error(`SmileIdentity: Please include ${e} in the "partner_details" object`)})),t.document_capture_modes&&!Array.isArray(t.document_capture_modes))throw new Error("SmileIdentity: document_capture_modes must be an array containing one of `camera` or `upload`, or both");return!0}(t);i&&(e(t.product),setTimeout((()=>function(t){const e=document.querySelector("[name=\'smile-identity-hosted-web-integration\']").contentWindow;t.source="SmileIdentity::HostedWebIntegration",e.postMessage(JSON.stringify(t),"*")}(t)),2e3),window.addEventListener("message",(e=>{switch(e.data.message||e.data){case"SmileIdentity::Close":return function(t){document.querySelector("#smile-identity-hosted-web-integration").remove(),t.onClose&&t.onClose()}(t);case"SmileIdentity::Success":return function(t){t.onSuccess&&t.onSuccess()}(t);case"SmileIdentity::ConsentDenied":case"SmileIdentity::ConsentDenied::TOTP::ContactMethodsOutdated":return function(t,e){t.onError&&t.onError(e)}(t,e.data);default:return}}),!1))}}();window.SmileIdentity=SmileIdentity;';

//   var SmileIdentity = function() {
//     "use strict";
//     const t = document?.currentScript?.src?.split("script")[0];
//     function e(e) {
//         var r = document.createElement("iframe");
//         r.setAttribute("src", `${t}${function(t) {
//             switch (t) {
//             case "biometric_kyc":
//             case "ekyc_smartselfie":
//                 return "./../biometric-kyc.html";
//             case "enhanced_kyc":
//                 return "./../ekyc.html";
//             case "authentication":
//             case "smartselfie":
//                 return "./../smartselfie-auth.html";
//             case "doc_verification":
//                 return "./../doc-verification.html";
//             case "basic_kyc":
//             case "identity_verification":
//                 return "./../basic-kyc.html";
//             case void 0:
//                 return "./../product-selection.html";
//             default:
//                 throw new Error(`SmileIdentity: ${t} is not currently supported in this integration`)
//             }
//         }(e)}`),
//         r.setAttribute("id", "smile-identity-hosted-web-integration"),
//         r.setAttribute("name", "smile-identity-hosted-web-integration"),
//         r.setAttribute("data-cy", "smile-identity-hosted-web-integration"),
//         r.setAttribute("frameborder", "0"),
//         r.setAttribute("allow", "camera; geolocation; encrypted-media; fullscreen"),
//         r.setAttribute("allowtransparency", "true"),
//         r.style.cssText = "\n\t\t\tbackground-color: transparent;\n\t\t\tbackground-color: rgba(0, 0, 0, .75);\n\t\t\tborder: none;\n\t\t\theight: 100%;\n\t\t\tleft: 0;\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t\twidth: 100%;\n\t\t\tz-index: 999999;\n\t\t",
//         document.body.prepend(r)
//     }
//     const r = ["name", "logo_url", "partner_id", "policy_url", "theme_color"];
//     return function(t) {
//         const i = function(t) {
//             if (!t.token)
//                 throw new Error("SmileIdentity: Please provide your web token via the `token` attribute");
//             if (!t.callback_url)
//                 throw new Error("SmileIdentity: Please provide a callback URL via the `callback_url` attribute");
//             if (!t.product && !t.id_types)
//                 throw new Error("SmileIdentity: Please select a product via the `product` attribute.");
//             if (("biometric_kyc" === t.product || "ekyc_smartselfie" === t.product) && !t.partner_details)
//                 throw new Error("SmileIdentity: Please provide Partner Details via the `partner_details` attribute");
//             if ("biometric_kyc" !== t.product && "ekyc_smartselfie" !== t.product || !t.partner_details || r.forEach((e=>{
//                 if (!t.partner_details[e])
//                     throw new Error(`SmileIdentity: Please include ${e} in the "partner_details" object`)
//             }
//             )),
//             t.document_capture_modes && !Array.isArray(t.document_capture_modes))
//                 throw new Error("SmileIdentity: document_capture_modes must be an array containing one of `camera` or `upload`, or both");
//             return !0
//         }(t);
//         i && (e(t.product),
//         setTimeout((()=>function(t) {
//             const e = document.querySelector("[name='smile-identity-hosted-web-integration']").contentWindow;
//             t.source = "SmileIdentity::HostedWebIntegration",
//             e.postMessage(JSON.stringify(t), "*")
//         }(t)), 2e3),
//         window.addEventListener("message", (e=>{
//             switch (e.data.message || e.data) {
//             case "SmileIdentity::Close":
//                 return function(t) {
//                     document.querySelector("#smile-identity-hosted-web-integration").remove(),
//                     t.onClose && t.onClose()
//                 }(t);
//             case "SmileIdentity::Success":
//                 return function(t) {
//                     t.onSuccess && t.onSuccess()
//                 }(t);
//             case "SmileIdentity::ConsentDenied":
//             case "SmileIdentity::ConsentDenied::TOTP::ContactMethodsOutdated":
//                 return function(t, e) {
//                     t.onError && t.onError(e)
//                 }(t, e.data);
//             default:
//                 return
//             }
//         }
//         ), !1))
//     }
// }();
// window.SmileIdentity = SmileIdentity;
