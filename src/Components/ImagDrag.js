import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Header from '../CommonComponents/AppBar';

import DragSortableList from 'react-drag-sortable'

const SortableItem = SortableElement(({value}) => <div><img src={value} height={100} width={100}/></div>);

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((value, index) => (
               <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </div>
    );
});

let arr=[]
let placeholder = (
    <div style={{opacity:0.3,backgroundColor:'gray'}}></div>
);
export default  class SortableComponent extends Component {

    state = {
        items: [
            'https://picsum.photos/id/237/200/300',
            'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
            'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
            'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
            'https://homepages.cae.wisc.edu/~ece533/images/boat.png',
            'https://homepages.cae.wisc.edu/~ece533/images/barbara.png',
            'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
            'https://homepages.cae.wisc.edu/~ece533/images/boat.png',
            'https://picsum.photos/id/237/200/300',
        ],
        isMove:true
    };

   componentDidMount() {
       arr=[]
   }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };
     onSort = (sortedList)=> {
        let value= window.confirm("Are you sure you wish to delete this item?");
        if(!value){
            arr=[]
            this.setState({isMove:false})
        }
        // console.log("sortedList", sortedList);
    }

    renderDiv=()=>{
        this.state.items.map((item)=>{
            arr.push(
                {
                    content: (
                        <div style={{height:'200px',width:'200px',margin:'5px'}}>
                            <img src={item} height={200} width={200}/>
                        </div>
                    )
                })
            // console.log(arr)
        })
    }

    render() {
        this.renderDiv()
        return(
            <div>
                <Header/>
                <DragSortableList items={arr} onSort={this.onSort} type="grid" moveTransitionDuration={0.9} placeholder={placeholder}/>
                {/*<SortableList items={this.state.items} onSortEnd={this.onSortEnd}   />*/}
            </div>
        );
    }
}