/**
 * Google Consent Mode v2 default. Must run before GTM's own script tag so
 * that the container's very first request already carries denied consent —
 * a plain inline <script> (not next/script) executes during HTML parsing,
 * ahead of @next/third-parties's `afterInteractive` GoogleTagManager load.
 *
 * Restores a visitor's earlier choice from localStorage (written by
 * CookieConsent) so returning visitors who already accepted don't see
 * analytics denied again on every page load before the banner's own script
 * runs.
 */
export function ConsentDefaultScript() {
  const script = `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var granted = false;
  try {
    granted = window.localStorage.getItem("charm-cookie-consent") === "granted";
  } catch (e) {}

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: granted ? "granted" : "denied",
    wait_for_update: 500,
  });
})();
`;

  // eslint-disable-next-line react/no-danger -- static, no user input reaches this string.
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
