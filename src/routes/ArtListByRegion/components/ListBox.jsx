import React, { Component } from "react";
import ListItem from "./ListItem";

import { api } from "common/app";

export class ListBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            actid: null,
            voteid: null,
            region:1
        };
        this.createArticle = this.createArticle.bind(this);
        this.refreshProps = this.refreshProps.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }
    componentWillReceiveProps(nextprops) {
        this.refreshProps(nextprops);
    }
    createArticle() {
        var cont = this;
        var itemNodes = this.state.list.map(function(itemBase) {
            return (
                <ListItem
                    info={itemBase}
                    ActID={cont.props.ActID}
                    voteid={cont.state.voteid}
                />
            );
        });
        return itemNodes;
    }
    componentDidMount() {
        this.refreshProps(this.props);
    }
    refreshList(props) {
        if (!props.ActID) return;
        api.ArticleList(props.ActID,props.region).then(
            res => {
                this.setState({
                    list: res.data.list
                });
                console.log(res);
            },
            err => {
                console.log(err);
            }
        );
    }
    refreshProps(props) {
        this.setState({
            actid: props.ActID,
            voteid: props.voteid,
            region: props.region
        });
        this.refreshList(props);
    }
    render() {
        return <div>{this.state.list ? this.createArticle() : null}</div>;
    }
}

export default ListBox;
