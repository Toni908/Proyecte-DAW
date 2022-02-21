import React from "react";

const CustomRightArrow = ({ onClick }) => {
    return <button id={"right"} onClick={() => onClick()} className="arrow-right-position bi-arrow-right-circle-fill" />
};

const CustomLeftArrow = ({ onClick }) => {
    return <button id={"left"} style={{display: "none"}} onClick={() => onClick()} className="arrow-left-position bi-arrow-left-circle-fill" />;
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    return (
        <div>
            <CustomLeftArrow onClick={() => previous()}/>
            <CustomRightArrow onClick={() => next()} />
        </div>
    );
};

export {
    CustomLeftArrow,
    CustomRightArrow,
    ButtonGroup
};