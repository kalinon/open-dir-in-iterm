'use babel';

import RspecCopy from '../lib/main';

describe('OpenDiriniTerm', function() {
  let workspaceElement;

  beforeEach(function() {
    workspaceElement = atom.views.getView(atom.workspace);
    atom.packages.activatePackage('open-dir-in-iterm');
  });

  describe('when the open-dir-in-iterm:run event is triggered', function() {
    it('run command on iTerm and send event', function() {
      waitsFor('event', function(done) {
        workspaceElement.addEventListener('open-dir-in-iterm:run', function() {
          done();
        });

        atom.commands.dispatch(workspaceElement, 'open-dir-in-iterm:run');
      });
    });
  });
});
