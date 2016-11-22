
import React from 'react';

import actions from './settings-actions.js';
import store   from './settings-store.js';


export default class XwingSidebarSettings extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = store.getSettings();
    }
    
    componentDidMount() {
        this.unsubscribe = store.listen( (newSettings) => this.setState(newSettings) );
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    
    getHandlerSettingChange(setting) {
        return (event) => {
            let newSettings = JSON.parse(JSON.stringify(this.state));
            newSettings[setting] = event.target.value;
            actions.settingsChanged(newSettings);
        }
    }
    
    render() {
        return (
            <div className="XwingSidebarSettings">
            
                <div className="settings-row">
                    <div className="setting-name inline">Start</div>
                    <div className="setting-value inline">
                        <input type="number"
                               min="1" max="100" step="1" value={this.state.startSeconds}
                               onChange={this.getHandlerSettingChange('startSeconds')} />
                            &nbsp;seconds
                    </div>
                </div>
                
                <div className="settings-row">
                    <div className="setting-name inline">Stop</div>
                        <div className="setting-value inline">
                        <input type="number"
                               id="stop_seconds"
                               min="1" max="100" step="1" value={this.state.stopSeconds}
                               onChange={this.getHandlerSettingChange('stopSeconds')} />
                            &nbsp;seconds
                    </div>
                </div>
                
                <div className="settings-row">
                    <div className="setting-name inline">Delay</div>
                    <div className="setting-value inline">
                        <input type="number"
                               id="delay_seconds"
                               min="1" max="100" step="1" value={this.state.delaySeconds}
                               onChange={this.getHandlerSettingChange('delaySeconds')} />
                            &nbsp;seconds
                    </div>
                </div>
            </div>
        )
    }
}
