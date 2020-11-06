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
        // Set searchQuery if there is one
        if(sq !== null) {
            this.setState({
                searchQuery: sq
            });
        }
        
        
        /*  Since setState is asynchronous, in order to simulate the api delay
        nested Timeouts are used to showcase the displaying of both 
        the error message and the loading animation.
        */
       
        // Simulates an API call that first fails, then loads the data
        this.state.showOverlay(true, "pageLoading");
        setTimeout(()=> {
            // The Client received an Error
            this.state.showOverlay(false, "pageLoading");
            this.state.showOverlay(true, "errorWhileFetchingData");
            
            // Wait 2 seconds then simulate new data request
            setTimeout(()=>{
                this.state.showOverlay(false, "errorWhileFetchingData");
                this.state.showOverlay(true, "pageLoading");
                
                // Simulate a delay while fetching data
                setTimeout(() => {
                    this.state.getApplicants();
                    this.state.getStats();
                    this.state.showOverlay(false, "pageLoading");
                }, 2000);
            }, 2000);
        }, 2000);
    }

    render() {

        const listNames = ["Appointment", "Viewed", "Interested", "Offer Accepted"];

        return (
            <div className="applicantsPage">
                <Overlay shown={this.state.pageLoading}>
                    {/* Loading element courtesy of: https://loading.io/css/ */}  
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </Overlay>
                
                <PageInformation applicantsStatistics={this.state.applicantsStatistics} />

                <div className="toolbar" >
                    <SearchBox 
                        searchQuery={this.state.searchQuery} 
                        handleChange={this.state.handleChange} 
                        onSubmit={this.state.handleSearch}/>
                    <Filter 
                        name="bidsFilter" 
                        id="bidsFilter" 
                        label="Bids" 
                        options={[]} />
                    <Filter 
                        name="statusFilter" 
                        id="statusFilter" 
                        label="Status" 
                        options={[]} />
                </div>

                <div className="applicantLists">
                    <Overlay shown={this.state.errorWhileFetchingData}>
                        <div className="error">Attention this is a DEMO error. Data will load in a couple of seconds</div>
                        <div className="error">There was an error while loading applicants data</div>
                    </Overlay>
                    {this.state.searchView ? // If the user has searched 
                        this.state.foundResults ? // And if there are results
                        Object.values(this.state.search).map( (list, index) => // Render search results 
                            <ApplicantList 
                                name={listNames[index]} 
                                list={list}/>) 
                        :   <Overlay shown={true} > {/* If no results show message */}
                                <div className="noResults">No applicant mathes your criteria</div>
                            </Overlay>        
                    : Object.values(this.state.all).map( (list, index) => // If no search render the all applicants 
                        <ApplicantList 
                            name={listNames[index]} 
                            list={list}/>)}
                </div>
            </div>
        )
    }
}