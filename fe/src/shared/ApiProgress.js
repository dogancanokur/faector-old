import React, {Component} from 'react';
import axios from "axios";

function getDisplayName(WrapperComponent) {
    return WrapperComponent.displayName || WrapperComponent.name || 'ComponentName';
}

export function withApiProgress(WrapperComponent, apiPath) { // High Order Component
    return class extends Component {
        static displayName = `ApiProgress(${getDisplayName(WrapperComponent)})`;

        state = {
            pendingApiCall: false
        }

        componentDidMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.updateApiCallFor(request.url, true);
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(response => {
                this.updateApiCallFor(response.config.url, false);
                return response;
            }, error => {
                this.updateApiCallFor(error.config.url, false);
                throw error;
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                this.setState({pendingApiCall: inProgress});
            }
        };

        render() {
            const {pendingApiCall} = this.state;
            return <WrapperComponent pendingApiCall={pendingApiCall} {...this.props}/>
        }
    }
}