import React from "react";

type Props = {
    shown: boolean;
}

/**
 * An overlay for a loading animation
 * 
 * @param shown A boolean determining if the overlay is to be rendered 
 * 
 */

export const Overlay: React.FC<Props> = ({shown}) => {
    return(
        <div className="overlay" style={shown ? 
                {display: "block", opacity: 0.5} : 
                {display: "none", opacity: 0} }>
            {/* Loading element courtesy of: https://loading.io/css/ */}
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}