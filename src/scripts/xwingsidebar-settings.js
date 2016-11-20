
var css = require('../styles/xwingsidebar-settings.scss');

var gWidgetSettings = {
    startSeconds: "10",
    stopSeconds: "0",
    delaySeconds: 1,
    _template_exclude: []
};

var gAppInfo = null;

window.settings_ui_update_controls = () => {
    document.getElementById("start_seconds").value = gWidgetSettings.startSeconds;
    document.getElementById("stop_seconds").value = gWidgetSettings.stopSeconds;
    document.getElementById("delay_seconds").value = gWidgetSettings.delaySeconds;
};

function save_settings() {
    gWidgetSettings.startSeconds = document.getElementById("start_seconds").value;
    gWidgetSettings.stopSeconds = document.getElementById("stop_seconds").value;
    gWidgetSettings.delaySeconds = document.getElementById("delay_seconds").value;
}

function push_settings_to_renderer() {
    if (window.hostApp) {
        gWidgetSettings._runtime = {
            geometry: {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight
            }
        };

        window.hostApp.execute('apply_widget_settings', JSON.stringify(gWidgetSettings));
    }
}

// Call this to push setting changes to the host app *Gameshow* so it would
// update the rendering component with latest configuration parameters
window.SaveSettingsAndNotifyHostApp = () => {
    save_settings();
    push_settings_to_renderer();
};

// called by Gameshow to retrieve settings.
// settings can be any javascript object, which Gameshow will serialize as JSON
// and save in document so it can persist between application sessions
window.GetWidgetSettings = () => gWidgetSettings;

// This will be called by the host app *Gameshow* to restore setting values.
// appInfo may include oauth_access_token and twitch_channel_name, if the host
// app *Gameshow* was authorized by the user to access Twitch.
window.SetWidgetSettings = (widgetSettings, appInfo) => {
    if (widgetSettings !== null) {
        gWidgetSettings = widgetSettings;
    }

    if (appInfo !== null) {
        gAppInfo = appInfo;
    }

    settings_ui_update_controls();
    push_settings_to_renderer();
};
