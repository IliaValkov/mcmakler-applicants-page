import React from "react";

type Props = {
    shown: boolean;
    children: React.ReactNode;
}

/**
 * An overlay for a loading animation
 * 
 * @param shown A boolean determining if the overlay is to be rendered 
 * 
 */

export const Overlay: React.FC<Props> = ({shown, children}) => {
    return(
        <div className="overlay" style={shown ? 
                {display: "block", opacity: 0.5} : 
                {display: "none", opacity: 0} }>
            {children}  
        </div>
    )
}