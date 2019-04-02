import React, { Component } from "react";
import "./ArtList.scss";

import listTop from "./img/listTop.png";
import ListBox from "./components/ListBox";
import Search from "./img/Search.png";

export class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actid: null,
            voteid: null,
            region:1,
        };
        this.refreshProps = this.refreshProps.bind(this);
    }
    componentWillReceiveProps(nextprops) {
        this.refreshProps(nextprops);
    }
    componentDidMount() {
        this.refreshProps(this.props);
        console.log(window.location);
        
    }
    refreshProps(props) {
        this.setState({
            actid: props.params.actid,
            voteid: props.params.voteid ? props.params.voteid : null,
            region:1
        });
    }
    render() {
        return (
            <div className="ArtListBox">
                <div className="ListTop">
                    <img src={listTop} alt="" />
                </div>
                <ListBox ActID={this.state.actid} voteid={this.state.voteid} region={this.state.region} />
                <a href={'http://poster.crnonline.cn/index.php/Www/Search/index/?pid='+this.state.actid}>
                    <div className="SearchButton">
                        <img src={Search} alt="" /> <span>搜索</span>
                    </div>
                </a>
            </div>
        );
    }
}

export default List;
