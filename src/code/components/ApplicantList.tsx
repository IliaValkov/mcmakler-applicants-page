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
    
    return ( list.length > 0 ?
        <section>
            <h2>{`${name} (${list.length})`}</h2>
            <ul>
                {list.map(applicant =>
                    <ApplicantCard
                        applicant={applicant} />)
                }
            </ul>
        </section> :
        null
    )
} 