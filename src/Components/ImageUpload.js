import React, {Component} from 'react';
import Header from '../CommonComponents/AppBar';

class IndexPage extends Component {

    constructor(props) {
        super(props);

    }
    render(){
        return(
            <div>
                <Header />
                <React.Fragment>
                    <td>Hello</td>
                    <td>World</td>
                </React.Fragment>
            </div>


        )
    }
}
export default IndexPage;