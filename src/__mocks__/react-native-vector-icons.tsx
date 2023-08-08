import React from "react";

export const MCIcons = (props:any) => {
    const {name,size,color} = props;
    return <div data-testId="mock-icon" color={color} >{name}</div>;
};