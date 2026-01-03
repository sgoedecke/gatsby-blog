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
  ])
}
