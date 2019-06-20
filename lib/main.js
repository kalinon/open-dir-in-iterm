'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', 'open-dir-in-iterm:run', this.run));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  run() {
    var self = this;
    var currentPath = document.querySelector("status-bar-file .current-path");
    var path = (currentPath == undefined) ? '' : currentPath.text;
    exec = require("child_process").exec;

    var hereDoc = `
      tell application "iTerm"
      	tell current window
      		set tab_id to (create tab with default profile)
      		tell tab_id
      			select
      		end tell
      	end tell

      	tell current session of tab_id
      		write text "cd ${path}"
      	end tell
      end tell
      `.trim()

    exec("osascript -e '"+hereDoc+"'", function(error, stdout, stderr) {
      var event = new Event('open-dir-in-iterm:ran');
      self.dispatchEvent(event);
      return;
    });
  }
};


// tell application "iTerm"
// 	tell current window
// 		set tab_id to (create tab with default profile)
// 		tell tab_id
// 			select
// 		end tell
// 	end tell
//
// 	tell current session of tab_id
// 		write text "cd ~/.env"
// 	end tell
// end tell
