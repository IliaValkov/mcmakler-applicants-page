import React from "react";
import * as API from "./mock_api";

export function createState (inParentComponent: React.Component) {
    return {
        loading: false,
        applicants: [],
        applicantsStatistics: <API.IApplicantsStat[]>[],
        searchQuery: "",
        
        showLoading: function (inVisible: boolean): void {
            this.setState({ loading: inVisible });
        }.bind(inParentComponent),

        getApplicants: function() {
            const response = API.getApplicants();
            this.setState({applicants: response.applicants});
        }.bind(inParentComponent),

        getStats: function() {
            const response = API.getStats();
            this.setState({applicantsStatistics: response.applicantsStatistics});
        }.bind(inParentComponent),

        handleChange: function (event: React.ChangeEvent<HTMLInputElement>) {
            this.setState({
                [event.target.name] : event.target.value
            });
        }.bind(inParentComponent),
    }
}