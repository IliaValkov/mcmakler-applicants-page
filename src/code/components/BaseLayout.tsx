import React from "react";
import {IApplicant} from "../mock_api";
import {createState} from "../state"

export default class BaseLayout extends React.Component {
    
    state = createState(this);

    componentDidMount () {
        // this.state.showHidePleaseWait(true);        
        this.state.getApplicants();
        // this.state.showHidePleaseWait(false);
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
            <div>
                {this.state.loading ? "Data is Loading" : null}
                {this.state.applicants.map((applicant: IApplicant) => <li> {applicant.firstName} </li>)}
            </div>
        )
    }
}