const React = require("react")

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="umami-analytics"
      defer
      src="https://sg-analytics.pikapod.net/script.js"
      data-website-id="f535647a-f97e-42ba-a2eb-4e9583984266"
    ></script>,
  ])
}
