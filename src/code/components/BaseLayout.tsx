// Stylesheets imports
import "../../css/applicants-page.css";
import "../../css/loading.css";

// React imports
import React from "react";

// Application state import
import { createState } from "../state";

// Component imports
import { PageInformation } from "./PageInformation";
import { SearchBox } from "./SearchBox";
import { Filter } from "./Filter";
import { ApplicantList } from "./ApplicantList";
import { Overlay } from "./Overlay";

/**
 * The top most component of the React app
 * 
 */
export default class BaseLayout extends React.Component {

    state = createState(this);

    componentDidMount() {
        // Get the search param from the URL
        const searchParams = new URL(window.location.href).searchParams;
        const sq = searchParams.get("search");
        this.setState({
            searchQuery: sq
        });
        
        // Simulate a delay while fetching data
        this.state.showLoading(true);
        setTimeout(() => {
            // set searchQuery and perform search
            this.state.getApplicants();
            this.state.getStats();
            this.state.showLoading(false);
        }, 2000);

    }

    render() {

        const listNames = ["Appointment", "Viewed", "Interested", "Offer Accepted"];

        return (
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