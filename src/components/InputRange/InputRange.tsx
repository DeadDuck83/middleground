import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Range, getTrackBackground } from 'react-range';

interface Props {
  radius: number[];
  setRadius: (radius: number[]) => void;
}

const InputRange: React.FC<Props> = ({ radius, setRadius }) => {
  // const [state, setState] = useState<number[]>([50]);

  const STEP = 0.1;
  const MIN = 10;
  const MAX = 80;

  return (
    <Box width="100%" py={4}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Range
          values={radius}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={values => setRadius(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: radius,
                    colors: ['#548BF4', '#ccc'],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '42px',
                width: '38px',
                borderRadius: '8px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
              }}
            >
              <div
                style={{
                  backgroundColor: isDragged ? '#548BF4' : '#CCC',
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: 800 }}>
                {radius}
              </span>
            </div>
          )}
        />
      </div>
    </Box>
  );
};

export default InputRange;
