import "../../css/applicants-page.css";
import React from "react";
import {createState} from "../state";

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
                        ApplicantCard1 ApplicantCard2 ...
                    ... ApplicantCardN
                    ApplicantList2
                        ApplicantCard1 ApplicantCard2 ...
                    ... ApplicantCardN
            */
            <div className="applicantsPage">
                <div className="information">
                    <span>
                        <img src="../src/media/icons/arrow-back.svg" alt="arrow-back-icon"/>
                    </span>
                    <h1>Applicants</h1>
                    <div className="applicantsStats">
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
                <div className="toolbar" >
                    <span className="searchBox">
                        <img src="../src/media/icons/search.svg" alt="search-icon" width="18px" height="18px"/>
                        <input type="text" className="search-box" placeholder="Search for applicant"/>
                    </span>
                    <select className="filter" name="bidsFilter" id="bidsFilter">
                        <option selected disabled value="None">Bids</option>
                    </select>
                    <select className="filter" name="statusFilter" id="statusFilter">
                        <option selected disabled value="None">Status</option>
                    </select>
                </div>
                <div className="applicantLists">
                    <section>
                        <h2>Appointment set (2)</h2>
                        <ul>
                            <li>
                                <p className="initials">IV</p>
                                <p className="fullName">Ilia Valkov</p>
                                <p className="phoneNumber"> +49 146 344 23811</p>
                                <p className="email">ilia@sample.com</p>
                                <p className="statusAndDate">Appointment 22 July 19:00</p>
                                <p className="bid">Bid 250 000 &euro;</p>
                            </li>
                            <li>
                                <p className="initials">IV</p>
                                <p className="fullName">Ilia Valkov</p>
                                <p> +49 146 344 23811</p>
                                <p>ilia@sample.com</p>
                                <p className="statusAndDate">Appointment 22 July 19:00</p>
                                <p className="bid">Bid 250 000 &euro;</p>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h2>Interested (4)</h2>
                        <ul>
                            <li>
                                <p className="initials">IV</p>
                                <p className="fullName">Ilia Valkov</p>
                                <p className="phoneNumber"> +49 146 344 23811</p>
                                <p className="email">ilia@sample.com</p>
                                <p className="statusAndDate">Interested</p>
                            </li>
                            <li>
                                <p className="initials">IV</p>
                                <p className="fullName">Ilia Valkov</p>
                                <p> +49 146 344 23811</p>
                                <p>ilia@sample.com</p>
                                <p className="statusAndDate">Interested</p>
                            </li>
                            <li>
                                <p className="initials">IV</p>
                                <p className="fullName">Ilia Valkov</p>
                                <p className="phoneNumber"> +49 146 344 23811</p>
                                <p className="email">ilia@sample.com</p>
                                <p className="statusAndDate">Interested</p>
                            </li>
                            <li>
                                <p className="initials">IV</p>
                                <p className="fullName">Ilia Valkov</p>
                                <p> +49 146 344 23811</p>
                                <p>ilia@sample.com</p>
                                <p className="statusAndDate">Interested</p>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        )
    }
}