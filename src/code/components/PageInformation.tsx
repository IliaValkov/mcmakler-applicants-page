import React from "react";
import { IApplicantsStatistics } from "../mock_api";

type Props = {
    applicantsStatistics: IApplicantsStatistics
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
            {/* Using the object keys to  */}
            {Object.keys(applicantsStatistics).map(name => 
                <span>
                    <p>{applicantsStatistics[name]}</p>
                    <p>{name.slice(0,1).toUpperCase() + name.slice(1)}</p>
                </span>    
            )}
            </div>
        </div>   
    );
}