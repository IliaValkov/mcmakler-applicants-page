import React from "react";
import {getApplicants, IApplicant} from "./mock_api";

export function createState (inParentComponent: React.Component) {
    return {
        loading: false,
        applicants: [],
        
        showLoading: function (inVisible: boolean): void {
            this.setState({ loading: inVisible });
        }.bind(inParentComponent),

        getApplicants: function() {
            const response = getApplicants();
            this.state.showLoading(true);
            setInterval(() => {
                this.setState({applicants: response.applicants});
                this.state.showLoading(false);
            }, 2000);
        }.bind(inParentComponent),
    }
}