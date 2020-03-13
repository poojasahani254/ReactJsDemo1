import React, { useState,useEffect,useRef } from 'react'
import { withStyles } from '@material-ui/core/styles';
import SliderContent from "./SlideContent";
import Arrow from "../Slider/Arrow";
function Slider(props) {

    const {classes}=props
    const getWidth = () => window.innerWidth



    const [state, setState] = useState({
        activeIndex: 0,
        translate: 0,
        transition: 0.45
    })
    const { translate, transition ,activeIndex} = state

    const images = [
        'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
        'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
        'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80'
    ]

    const autoPlayRef = useRef()
    useEffect(()=>{
        autoPlayRef.current = nextSlide
    })

    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
        }

        const interval = setInterval(play,  2000)
        return () => clearInterval(interval)
    }, [])

    const nextSlide = () => {

        if (activeIndex === images.length - 1) {
            return setState({
                ...state,
                translate: 0,
                activeIndex: 0
            })
        }
        // alert('hello'+(activeIndex + 1) * getWidth())
        setState({
            ...state,
            activeIndex: activeIndex + 1,
            translate: (activeIndex + 1) * getWidth()
        })
    }
    const prevSlide = () => {

        if (activeIndex === 0) {
            // alert((images.length - 1) * getWidth())
            return setState({
                ...state,
                translate: (images.length - 1) * getWidth(),
                activeIndex: images.length - 1
            })
        }

        setState({
            ...state,
            activeIndex: activeIndex - 1,
            translate: (activeIndex - 1) * getWidth()
        })
    }
    const Dot = ({ active }) => (
        <span
            style={{
                padding: '10px',
                marginRight: '5px',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: `${active ? 'black' : 'white'}`
            }}
        />
    )
    return (
        <div className={classes.css}>
            <SliderContent
                translate={translate}
                transition={transition}
                width={getWidth()* images.length}
                images={images}

            />

            <Arrow direction="left" handleClick={prevSlide} />
            <Arrow direction="right"  handleClick={nextSlide}/>
            <div className={classes.dot}>
                {images.map((slide, i) => (
                    <Dot key={slide} active={activeIndex === i} />
                ))}
            </div>
        </div>
    )
}
const style=theme => ({
    css: {
        position: 'relative',
        height: '100vh',
        width: '100vw',
        margin: '0 auto',
        overflow: 'hidden',
    },dot:{
        position: 'absolute',
        bottom: '200px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default withStyles(style)(Slider)