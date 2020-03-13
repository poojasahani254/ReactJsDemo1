import React from 'react'
import leftArrow from './right.svg'
import rightArrow from './left.svg'

const Arrow = ({ direction, handleClick }) => (
    <div
        onClick={handleClick}
        style={{
              display: 'flex',
              position: 'absolute',
              top: '35%',
              right:`${direction === 'right' && '25px'}`,
              left:`${direction === 'left' && '25px'}`,
              height: '50px',
              width: '50px',
              justifyContent: 'center',
              background: 'white',
              borderRadius: '50%',
              cursor: 'pointer',
              alignItems: 'center',
              transition: 'transform ease-in 0.1s',
              '&:hover': {
                transform: `scale(1.1)`,
              },
              img: {
                transform: `translateX(${direction === 'left' ? '-2' : '2'}px)`,
                '&:focus': {
                  outline: 0,
                }
              }
    }}
    >
        {direction === 'right' ? <img src={rightArrow} /> : <img src={leftArrow} />}
    </div>
)

export default Arrow
