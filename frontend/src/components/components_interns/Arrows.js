import React from "react";

const CustomRightArrow = ({ onClick, yourId }) => {
    return <button id={"right"+yourId} onClick={() => onClick()} className="arrow-right-position bi-arrow-right-circle-fill" />
};

const CustomLeftArrow = ({ onClick, yourId }) => {
    return <button id={"left"+yourId} style={{display: "none"}} onClick={() => onClick()} className="arrow-left-position bi-arrow-left-circle-fill" />;
};

const ButtonGroupSimple = ({ next, previous, yourId}) => {
    return (
        <div>
            <CustomLeftArrow yourId={yourId} onClick={() => previous()}/>
            <CustomRightArrow yourId={yourId} onClick={() => next()} />
        </div>
    );
};

export {
    CustomLeftArrow,
    CustomRightArrow,
    ButtonGroupSimple
};