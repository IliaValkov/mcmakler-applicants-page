import React from "react";
import { IApplicantsStat } from "../mock_api";

type Props = {
    applicantsStatistics: IApplicantsStat[]
}

export const PageInformation: React.FC<Props> = ({applicantsStatistics} ) => {
    return (
        <div className="information">
            <span>
                {/* The specified relative path should be thought to begin from the dist folder */}
                <img src="../src/media/icons/arrow-back.svg" alt="arrow-back-icon"/>
            </span>
            <h1>Applicants</h1>
            <div className="applicantsStats">
            { applicantsStatistics.map( (stat: IApplicantsStat) => 
                <span>
                    <p>{stat.value}</p>    
                    <p>{stat.name}</p>
                </span>
                )
            }
            </div>
        </div>   
    );
}