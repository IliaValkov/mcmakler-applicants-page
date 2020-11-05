import React from "react";

type Props = {
    name: string;
    label: string;
    id: string;
    options: string[];
}

/**
 * A Filter element skeleton. Please note this element doesn't
 * function. Parameters are as defined by the Props type
 * 
 * @param name    The name of the select element
 * @param label   The initial text of the select element
 * @param id      The id of the select element
 * @param options The options passed to the select element
 */

export const Filter: React.FC<Props> = ({ name, label, id, options }) => {
    
    return (
        <select
            className="filter"
            name={name}
            id={id}>
            <option selected disabled value="None">{label}</option>
            {options.map(option => {
                <option
                    key={option}
                    value={option}>
                    {option}
                </option>
            })}
        </select>
    )
}