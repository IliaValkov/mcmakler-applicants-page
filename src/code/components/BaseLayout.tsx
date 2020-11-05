import "../../css/applicants-page.css";
import "../../css/loading.css";

import React from "react";
import { createState } from "../state";
import { PageInformation } from "./PageInformation";
import { SearchBox } from "./SearchBox";
import { Filter } from "./Filter";
import { ApplicantList } from "./ApplicantList";


export default class BaseLayout extends React.Component {

    state = createState(this);

    componentDidMount() {
        this.state.showLoading(true);
        // Simulate a delay while fetching data
        setTimeout(() => {
            this.state.getApplicants();
            this.state.getStats();
            this.state.showLoading(false);
        }, 2000);
    }

    render() {

        return (
            /*  |____  Mock Structure  ____|
                ApplicantsPage
                    Back Headline Statistics
                    Search BidsFilter Status
                    ApplicantList1
                        ApplicantCard1 ApplicantCard2 ...
                    ... ApplicantCardN
                    ApplicantList2
                        ApplicantCard1 ApplicantCard2 ...
                    ... ApplicantCardN
            */
            <div className="applicantsPage">
                <div className="overlay" style={this.state.loading ? 
                        {display: "block", opacity: 0.5} : 
                        {display: "none", opacity: 0} }>
                    {/* Loading element courtesy of: https://loading.io/css/ */}
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                
                <PageInformation applicantsStatistics={this.state.applicantsStatistics} />
                <div className="toolbar" >
                    <SearchBox state={this.state} />
                    <Filter name="bidsFilter" id="bidsFilter" label="Bids" options={[]} />
                    <Filter name="statusFilter" id="statusFilter" label="Status" options={[]} />
                </div>
                <div className="applicantLists">
                    <ApplicantList name={"All"} list={this.state.applicants} />
                </div>
            </div>
        )
    }
}