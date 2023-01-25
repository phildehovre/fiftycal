import React, { ReactNode, SyntheticEvent, useState } from 'react';
import ApiCalendar from 'react-google-calendar-api';

const config = {
    "clientId": "612460763976-4g28j4lkc0921pjb45ps20ju0fan4gaq.apps.googleusercontent.com",
    "apiKey": "AIzaSyBiskXb3T78aX6z6SjAoQIRva2PaEgZzYQ",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
}

const apiCalendar = new ApiCalendar(config)

console.log(apiCalendar)

export default class DoubleButton extends React.Component {
    // @ts-ignore
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }


    public handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === 'sign-in') {
            apiCalendar.handleAuthClick()
        } else if (name === 'sign-out') {
            apiCalendar.handleSignoutClick();
        }
    }

    render(): ReactNode {
        return (<>
            <button
                onClick={(e) => this.handleItemClick(e, 'sign-in')}
            >
                sign-in
            </button>
            <button
                onClick={(e) => this.handleItemClick(e, 'sign-out')}
            >
                sign-out
            </button>
        </>
        );
    }
}