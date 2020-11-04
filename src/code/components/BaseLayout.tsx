import React from "react";
import {createState} from "../state"

export default class BaseLayout extends React.Component {
    
    state = createState(this);

    componentDidMount () {    
        this.state.getApplicants();
    }
    
    render(){
        return(
            /*
                ApplicantsPage
                    Back Headline Statistics
                    Search BidsFilter Status
                    ApplicantList1
                        ApplicantCard1 ApplicantCard2 ... ApplicantCardN
                    ApplicantList2
                        ApplicantCard1 ApplicantCard2 ... ApplicantCardN
            */
            <div className="applicants-page">
                <div>
                    <span>
                        <img src="../src/media/icons/arrow-back.svg" alt="arrow-back-icon"/>
                    </span>
                    <h1>Applicants</h1>
                    <div className="applicants-stats">
                        <span>
                            <p> 25</p>
                            <p>Total</p>
                        </span>
                        <span>
                            <p> 10</p>
                            <p>New</p>
                        </span>
                        <span>
                            <p> 5</p>
                            <p>Viewed</p>
                        </span>
                        <span>
                            <p> 3</p>
                            <p>Appointment</p>
                        </span>
                        <span>
                            <p> 6</p>
                            <p>Others</p>
                        </span>
                    </div>
                </div>
                <div>
                    <input type="text" className="search-box"/>
                    <select name="bids-filter" placeholder="Bids"/>
                    <select name="status-filter" placeholder="Status"/>
                </div>
                <div className="applicant-lists">
                    <section>
                        <h2>Appointment set (1)</h2>
                        <ul>
                            <li>
                                <p>I.V.</p>
                                <p>Ilia Valkov</p>
                                <p>+49 146 344 23811</p>
                                <p>ilia@sample.com</p>
                                <p>Appointment 22 July 19:00</p>
                                <p>Bid 250 000 &euro;</p>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        )
    }
}