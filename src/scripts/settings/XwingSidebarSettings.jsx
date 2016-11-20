
import React from 'react';

import actions from './settings-actions.js';
import store   from './settings-store.js';


export default class XwingSidebarSettings extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = store.getSettings();
    }
    
    onNewSettings(newSettings) {
        this.setState(newSettings);
    }
    componentDidMount() {
        this.unsubscribe = store.listen(this.onNewSettings);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    
    handleSettingChange(setting) {
        return function(event) {
            let newSettings = JSON.parse(JSON.stringify(this.state));
            newSettings[setting] = event.target.value;
            actions.settingsChanged(newSettings);
        }.bind(this)
    }
    
    render() {
        return (
            <div className="XwingSidebarSettings">
            
                <div className="settings-row">
                    <div className="setting-name inline">Start</div>
                    <div className="setting-value inline">
                        <input type="number"
                               min="1" max="100" step="1" value={this.state.startSeconds}
                               onChange={this.handleSettingChange.bind(this, 'startSeconds')} />
                            &nbsp;seconds
                    </div>
                </div>
                
                <div className="settings-row">
                    <div className="setting-name inline">Stop</div>
                        <div className="setting-value inline">
                        <input type="number"
                               id="stop_seconds"
                               min="1" max="100" step="1" value={this.state.stopSeconds}
                               onChange={this.handleSettingChange.bind(this, 'stopSeconds')} />
                            &nbsp;seconds
                    </div>
                </div>
                
                <div className="settings-row">
                    <div className="setting-name inline">Delay</div>
                    <div className="setting-value inline">
                        <input type="number"
                               id="delay_seconds"
                               min="1" max="100" step="1" value={this.state.delaySeconds}
                               onChange={this.handleSettingChange.bind(this, 'delaySeconds')} />
                            &nbsp;seconds
                    </div>
                </div>
            </div>
        )
    }
}
