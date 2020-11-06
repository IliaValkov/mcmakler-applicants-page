import React from "react";
import { IApplicantsStatistics } from "../mock_api";

type Props = {
    applicantsStatistics: IApplicantsStatistics
}

/**
 * Component containing the name of the page, a static arrow and
 * inoformation about the applicants
 * 
 * @param applicantsStatistics Object containig applicant statistics 
 */
export const PageInformation: React.FC<Props> = ({applicantsStatistics} ) => {
    
    return (
        <div className="information">
            <span>
                {/* The specified relative path should be thought to begin from the dist folder */}
                <img src="../../media/icons/arrow-back.svg" alt="arrow-back-icon"/>
            </span>
            <h1>Applicants</h1>
            <div className="applicantsStats">
            {/* Using the keys array returned by Object.key()
            to iterate throught the statistics  */}
            {Object.keys(applicantsStatistics).map(name => 
                <span>
                    <p>{applicantsStatistics[name]}</p>
                    <p>{
                        /*Extract the first letter and capitalize*/ 
                        name.slice(0,1).toUpperCase() + name.slice(1)}
                    </p>
                </span>    
            )}
            </div>
        </div>   
    );
}