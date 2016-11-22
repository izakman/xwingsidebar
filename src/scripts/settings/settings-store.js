import Reflux from 'reflux';

import actions from './settings-actions.js';


export default Reflux.createStore({

    listenables: [actions],

    settings: {
        startSeconds: "10",
        stopSeconds: "0",
        delaySeconds: 1,
        _template_exclude: []
    },

    onSetWidgetSettings: function(newSettings) {
        this.settings = newSettings;
        this.trigger(this.settings);
    },

    onSettingsChanged: function(newSettings) {
        this.settings = newSettings;
        if (typeof window !== 'undefined') {
            this.settings._runtime = {
                geometry: {
                    width: document.documentElement.scrollWidth,
                    height: document.documentElement.scrollHeight
                }
            };

            if (window.hostApp) window.hostApp.execute('apply_widget_settings', JSON.stringify(this.settings));
        }

        this.trigger(this.settings);
    },

    getSettings: function() {
        return this.settings;
    }

});
