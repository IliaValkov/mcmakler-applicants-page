import React from "react";

type Props = {
    state: {
        searchQuery: string;
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }
}

/**
 * A Filter element skeleton. Please note this element doesn't
 * function. Parameters are as defined by the Props type
 * 
 * @param state   The state object of the parent component
 * @param state.searchQuery The field that holds the value of the input element
 * @param state.handleChange User input handler function
 */

export const SearchBox: React.FC<Props> = ({state}) => {
    return(
        <span className="searchBox">
            <img src="../src/media/icons/search.svg" 
                alt="search-icon" 
                width="18px" 
                height="18px"/>
            <input 
                name="searchQuery"
                value={state.searchQuery} 
                onChange={state.handleChange}
                className="search-box" 
                type="text" 
                placeholder="Search for applicant"/>
        </span>
    )
}