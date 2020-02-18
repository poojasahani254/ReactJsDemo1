import React from "react";
function formatDate(date) {
    return date.toLocaleDateString();
}
function FunctionalExample(props) {
    return (
        <div className="Comment">
        <div className="UserInfo">
            <h3>hello {props.name} from Functional Component</h3>
        <img
    className="Avatar"
    src={props.author.avatarUrl}
    alt={props.author.name}
    />
    <div className="UserInfo-name">
        {props.author.name}
    </div>
    </div>
    <div>{props.text}</div>
    <div>
        {formatDate(props.date)}
</div>
</div>
    );
}

export default FunctionalExample;
