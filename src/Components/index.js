import React, {Component, createElement} from 'react';
import Welcome from './funtionalCompEx';
class IndexPage extends Component {

    componentDidMount() {
        console.log('did mount called')
    }

    render(){
        const element = (
            <h1>
                Hello,index!
            </h1>
        );
       const element2=React.createElement(
           'h2',
           {className:''},
                'Hello Dynamice Creation'
       )
        const comment = {
            date: new Date(),
            text: 'I hope you enjoy learning React!',
            author: {
                name: 'Hello Kitty',
                avatarUrl: 'https://placekitten.com/g/64/64',
            },
        };

        const element3 = <Welcome name="Sara" date={comment.date}
                                  text={comment.text}
                                  author={comment.author}/>;


        return(
            <div>
                <h1>hello From Index{element}</h1>
                {element2}
                {element3}
            </div>


        )
    }
}
export default IndexPage;