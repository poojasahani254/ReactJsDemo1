import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  SliderContent :{
    transform: props => `translateX(-${props.translate}px)`,
    transition: props =>`transform ease-out ${props.transition}s`,
    height: '100%',
    width: props => props.width,
    display: 'flex',
  }
})

function SliderContent(props) {
  const classes = useStyles(props)
  const Slide = ( {content} ) => {
    return(
        <div style={{
              height: '70%',
              width: '100%',
              backgroundImage: `url('${content}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
        />
    )
  }
  return (
        <div className={classes.SliderContent}>
              {props.images.map((slide, i) => (
                  <Slide key={slide + i} content={slide} />
              ))}
       </div>
  )
}

export default SliderContent