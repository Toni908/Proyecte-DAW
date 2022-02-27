import React from 'react';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as SliderPrimitive from '@radix-ui/react-slider';

const StyledSlider = styled(SliderPrimitive.Root, {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    color: "red",
    touchAction: 'none',
    width: 200,

    '&[data-orientation="horizontal"]': {
        height: 20,
    },

    '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        width: 20,
        height: 100,
    },
});

const StyledTrack = styled(SliderPrimitive.Track, {
    backgroundColor: "#749EE3",
    position: 'relative',
    flexGrow: 1,

    '&[data-orientation="horizontal"]': { height: 6 },
    '&[data-orientation="vertical"]': { width: 3 },
});

const StyledRange = styled(SliderPrimitive.Range, {
    position: 'absolute',
    backgroundColor: '#373DB0',
    borderRadius: '9999px',
    height: '100%',
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
    all: 'unset',
    display: 'none',
    width: 20,
    height: 20,
    backgroundColor: '#373DB0',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    borderRadius: 10,
    '&:hover': { backgroundColor: "#536CC9" },
    '&:focus': { boxShadow: `0 0 0 5px ${"#536CC9"}` },
});

const Slider = (props) => (
    <form>
        <StyledSlider defaultValue={[props.value]} min={props.min} max={props.max} step={1} aria-label="Volume" disabled>
            <StyledTrack>
                <StyledRange />
            </StyledTrack>
            <StyledThumb />
        </StyledSlider>
    </form>
);

export default Slider;
