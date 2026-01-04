const React = require("react")

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="plausible-analytics-script"
      async
      src="https://plausible.io/js/pa-PRCESGOaZzL9OgrGzjagf.js"
    ></script>,
    <script
      key="plausible-analytics-inline"
      dangerouslySetInnerHTML={{
        __html: `/* Privacy-friendly analytics by Plausible */
window.plausible = window.plausible || function () {
  (plausible.q = plausible.q || []).push(arguments)
}
plausible.init = plausible.init || function (i) {
  plausible.o = i || {}
}
plausible.init()
`,
      }}
    ></script>,
    <script
      key="posthog-analytics"
      dangerouslySetInnerHTML={{
        __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init ts ns yi rs os Qr es capture Hi calculateEventProperties hs register register_once register_for_session unregister unregister_for_session fs getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty vs us createPersonProfile cs Yr ps opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing ls debug O ds getPageViewId captureTraceFeedback captureTraceMetric Vr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_mO3Kz6MZxVQh9r9wl7hcDejccN6pWYr4Y0vCWsUjY7c', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2025-11-30',
    person_profiles: 'identified_only',
})`,
      }}
    ></script>,
    <script
      key="umami-analytics"
      defer
      src="https://sg-analytics.pikapod.net/script.js"
      data-website-id="f535647a-f97e-42ba-a2eb-4e9583984266"
    ></script>,
  ])
}
