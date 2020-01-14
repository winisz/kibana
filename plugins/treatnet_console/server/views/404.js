'use strict';

const React = require('react');

class NotFoundView extends React.PureComponent {
  render () {
    const uiPublicUrl = this.props.uiPublicUrl;
    const nodeModulesUrl = this.props.nodeModulesUrl;
    const homeUrl = this.props.homeUrl;

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
          <meta charSet="UTF-8"/>
          <title>Treatnet Console</title>
        </head>
        <body style={{ height: '68%' }}>

          <div className="euiPage" style={{ height: 'inherit' }}>
            <main className="euiPageBody">
              <div
                className="euiPanel euiPanel--paddingLarge euiPageContent euiPageContent--verticalCenter euiPageContent--horizontalCenter">
                <div className="euiPageContentHeader euiPageContentHeader--responsive">
                  <div className="euiPageContentHeaderSection">
                    <h1 className="euiTitle euiTitle--large">404</h1>
                  </div>
                </div>
                <div className="euiPageContentBody euiTextAlign euiTextAlign--left">
                  <h2 className="euiTitle euiTitle--medium">Page not found</h2>
                  <div className="euiSpacer euiSpacer--l"/>
                  <form action={homeUrl}>
                    <button className="euiButton euiButton--primary" id={'superButton'} type="submit">
                      <span className="euiButton__content"><span className="euiButton__text">Home page</span></span>
                    </button>
                  </form>
                </div>
              </div>
            </main>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = NotFoundView;
