'use strict';

const React = require('react');

class NotFoundView extends React.PureComponent {
  render () {
    const uiPublicUrl = this.props.uiPublicUrl;
    const nodeModulesUrl = this.props.nodeModulesUrl;

    return (
      <html lang="en">
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href={`${uiPublicUrl}/favicons/apple-touch-icon.png`}/>
          <link rel="icon" type="image/png" href={`${uiPublicUrl}/favicons/favicon-32x32.png`} sizes="32x32"/>
          <link rel="icon" type="image/png" href={`${uiPublicUrl}/favicons/favicon-16x16.png`} sizes="16x16"/>
          <link rel="manifest" href={`${uiPublicUrl}/favicons/manifest.json`}/>
          <link rel="mask-icon" href={`${uiPublicUrl}/favicons/safari-pinned-tab.svg`} color="#e8488b"/>
          <link rel="shortcut icon" href={`${uiPublicUrl}/favicons/favicon.ico`}/>

          <link rel="stylesheet" href={`${nodeModulesUrl}/@elastic/eui/dist/eui_theme_light.css`}/>
          <meta charset="UTF-8"/>
          <title>Treatnet Console</title>
        </head>
        <body>
          <h1>Opps! This page cannot be found.</h1>
        </body>
      </html>
    );
  }
}

module.exports = NotFoundView;
