import React from "react";
import { IApplicant } from "../mock_api";
import { ApplicantCard } from "./ApplicantCard";

type Props = {
    name: string;
    list: IApplicant[];
}

/**
 * ApplicantList functional Component
 * 
 * @param name The name of the list
 * @param list The list of IApplicant objects
 */
export const ApplicantList: React.FC<Props> = ({ name, list }) => {

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

    return (
        <section>
            <h2>{`${name} (${list.length})`}</h2>
            <ul>
                {list.map(applicant =>
                    <ApplicantCard
                        pallete={generatePallete()}
                        applicant={applicant} />)
                }
            </ul>
        </section>
    )
} 