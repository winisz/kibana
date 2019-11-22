import { npStart } from 'ui/new_platform';

import $ from 'jquery';

const { core } = npStart;
const treatNetConsoleEnabled = core.injectedMetadata.getInjectedVar('treatnetConsoleEnabled');

if (treatNetConsoleEnabled === false) {
  core.chrome.navLinks.update('treatnet_console', { hidden: true });
}

// Delete this later or make better easter egg huehuehue
$(document.body).on('keypress', function (event) {
  if (event.which === 58) {
    alert('boo!');
  }
});
