import React from "react";
import { IApplicant, StatusType } from "../mock_api";

type Props = {
    pallete: {color: string, backgroundColor: string};
    applicant: IApplicant;
}

/**
 * ApplicantCard functional Component
 * 
 * @param pallete A color pallete object containig background and text 
 * colors for the initials element of the card
 * @param applicant An IApplicant object
 */
export const ApplicantCard: React.FC<Props> = ({pallete, applicant}) => {
    
    // Extract the initials of the name and declare the style object
    const initials = applicant.firstName.charAt(0).toUpperCase() + applicant.lastName.charAt(0).toUpperCase();
    const initialsStyle: React.CSSProperties = {
        backgroundColor: pallete.backgroundColor,
        color: pallete.color  
    };

    // Determine the status string based on the status property of the received applicant object 
    const statuesText = ["Appointment", "Viewed", "Interested", "Offer Accepted"];
    let statusString: string;
    switch (applicant.status.statusType) {
        case StatusType.Appointment_Set:
            statusString = `${statuesText[StatusType.Appointment_Set]} ${applicant.status.date}`;
            break;
        case StatusType.Property_Viewed: 
            statusString = `${statuesText[StatusType.Property_Viewed]} ${applicant.status.date}`;
            break;
        case StatusType.Interested:
            statusString = `${statuesText[StatusType.Interested]} ${applicant.status.date}`;
            break;
        case StatusType.Offer_Accepted:
            statusString = `${statuesText[StatusType.Offer_Accepted]} ${applicant.status.date}`;
            break;
    }

    return (
        <li>
            <p 
                className="initials" 
                style={initialsStyle}>
                {initials}
            </p>
            <p className="fullName">{`${applicant.firstName} ${applicant.lastName}` }</p>
            <p>{applicant.phoneNumber}</p>
            <p>{applicant.email}</p>
            <p className="statusAndDate">{statusString}</p>
            {applicant.status.bid ? <p className="bid">{`BID ${applicant.status.bid}`}</p> : null}
        </li>
    )
}