'use babel';

import {CompositeDisposable} from 'atom';

const path = require('path');

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
        var filePath = atom.workspace.getActiveTextEditor().getPath();

        atom.notifications.addWarning("Test");

        exec = require("child_process").exec;
        var hereDoc = `
          tell application "iTerm"
            activate
            tell current window
                set tab_id to (create tab with default profile)
                tell tab_id
                    select
                end tell
            end tell
    
            tell current session of tab_id
                write text "cd ${path.dirname(filePath)}"
            end tell
          end tell
          `.trim();

        exec("osascript -e '" + hereDoc + "'", function (error, stdout, stderr) {
            var event = new Event('open-dir-in-iterm:ran');
            self.dispatchEvent(event);
            return;
        });
    },

    openProj() {
        atom.notifications.addWarning("Test Open Proj");

        var self = this;
        var filePath = atom.workspace.getActiveTextEditor().getPath();

        var projectPaths = atom.project.getPaths();
        var match = projectPaths.filter(project => {
            filePath.indexOf(project)
        });

        exec = require("child_process").exec;
        var hereDoc = `
          tell application "iTerm"
            activate
            tell current window
              set tab_id to (create tab with default profile)
              tell tab_id
                select
              end tell
            end tell
    
            tell current session of tab_id
              write text "cd ${path.dirname(filePath)}"
            end tell
          end tell
        `.trim();

        exec("osascript -e '" + hereDoc + "'", function (error, stdout, stderr) {
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


// selectedItem = $('.tree-view .selected').getPath()
// projectPaths = atom.project.getPaths()
//
// match = projectPaths.filter (project) -> ~selectedItem.indexOf project
