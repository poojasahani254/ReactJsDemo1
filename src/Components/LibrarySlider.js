import React,{useState} from 'react';
import Header from '../CommonComponents/AppBar';
import Slider from "./LibrarySlider/Slider";

export default  function SortableComponent() {

    return(
        <div>
            <Header/>
            <Slider/>
        </div>
    );

}