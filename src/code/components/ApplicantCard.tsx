import React, { useEffect, useState } from "react";
import { IApplicant, StatusType } from "../mock_api";

type Props = {
    applicant: IApplicant;
}

/**
 * ApplicantCard functional Component
 * 
 * @param pallete A color pallete object containig background and text 
 * colors for the initials element of the card
 * @param applicant An IApplicant object
 */
export const ApplicantCard: React.FC<Props> = ({ applicant}) => {
    type ColorPallete = {
        color: string, backgroundColor: string
    }

    /* In order to keep the intially generated color, useState is used.
    This way the component will remeber its pallete upon re-render
    */
    const [colorPallete, setColorPallete] = useState<ColorPallete>(generatePallete()); 
    
    /**
     * Randomly picks a color from the preset color pallete
     * 
     * @returns [Object] The returned object has to keys, corresponding to the
     * text and background colors to be used in an Applicant card
     */
    function generatePallete(): { color: string, backgroundColor: string } {
        const bkgColorPallete = ["#FEE8D3", "#E3E7F9", "#CEF0F4", "#F0F4E1", "#FCD6DE"];
        const textColorPallete = ["#E97428", "#405493", "#20ADC5", "#ACAF36", "#E52A50"];
        const randomNumber = Math.floor(Math.random() * 4);
        return { color: textColorPallete[randomNumber], backgroundColor: bkgColorPallete[randomNumber] };
    }
    
    // Extract the initials of the name and declare the style object
    const initials = applicant.firstName.charAt(0).toUpperCase() + applicant.lastName.charAt(0).toUpperCase();
    const initialsStyle: React.CSSProperties = {
        backgroundColor: colorPallete.backgroundColor,
        color: colorPallete.color  
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