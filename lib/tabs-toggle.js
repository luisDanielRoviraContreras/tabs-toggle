'use babel';
import $ from 'jquery';
import ToggleTabsView from './tabs-toggle-view';
import { CompositeDisposable } from 'atom';

export default {
  visible: true,
  toggleTabsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.toggleTabsView = new ToggleTabsView(state.toggleTabsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.toggleTabsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tabs-toggle:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.toggleTabsView.destroy();
  },

  serialize() {
    return {
      toggleTabsViewState: this.toggleTabsView.serialize()
    };
  },

  toggle() {
    if(this.visible == true){
      $('.tab-bar').css({"visibility":"hidden"});
    }
    else {
      $('.tab-bar').css({"visibility":"visible"});
    }
    this.visible = !this.visible
  }

};
