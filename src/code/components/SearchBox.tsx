import React from "react";

type Props = {
    state: {
        searchQuery: string;
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }
}

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