import React from "react";
import { Link } from 'react-router-dom'
import styles from './index.css'

export default function LandingPage() {
    return (
        <div className="landing__page">
            <div className="content">
                <h1 className="btn"><p>Welcome to the Pokédex</p><i></i></h1>
                <Link to='/home'>
                    <h1 className="btn"><p>Enter Home</p><i></i></h1>
                  
                </Link>
            </div>
        </div>
    )
}