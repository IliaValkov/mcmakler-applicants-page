import "../../css/applicants-page.css";
import "../../css/loading.css";

import React from "react";
import { createState } from "../state";
import { PageInformation } from "./PageInformation";
import { SearchBox } from "./SearchBox";
import { Filter } from "./Filter";
import { ApplicantList } from "./ApplicantList";
import { Overlay } from "./Overlay";


export default class BaseLayout extends React.Component {

    state = createState(this);

    componentDidMount() {
        this.state.showLoading(true);
        // Simulate a delay while fetching data
        setTimeout(() => {
            this.state.getApplicants();
            this.state.getStats();
            this.state.showLoading(false);
            
            // Get the search param from the URL
            const searchParams = new URL(window.location.href).searchParams;
            const sq = searchParams.get("search");
            
            // set searchQuery and perform search
            if(sq !== null) {
                this.setState({
                    searchQuery: sq
                }, () => this.state.handleSearch(null));
            }
            
        }, 2000);

    }

    render() {

        const listNames = ["Appointment", "Viewed", "Interested", "Offer Accepted"];

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
                <Overlay shown={this.state.pageLoading} />
                <PageInformation applicantsStatistics={this.state.applicantsStatistics} />
                <div className="toolbar" >
                    <SearchBox searchQuery={this.state.searchQuery} handleChange={this.state.handleChange} onSubmit={this.state.handleSearch}/>
                    <Filter name="bidsFilter" id="bidsFilter" label="Bids" options={[]} />
                    <Filter name="statusFilter" id="statusFilter" label="Status" options={[]} />
                </div>
                <div className="applicantLists">
                    {this.state.searchView ?
                    Object.values(this.state.search).map( (list, index) => <ApplicantList name={listNames[index]} list={list} />) :
                    Object.values(this.state.all).map( (list, index) => <ApplicantList name={listNames[index]} list={list} />)}
                </div>
            </div>
        )
    }
}