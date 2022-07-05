import React from "react";
import { Link } from 'react-router-dom'
import './index.css'


export default function LandingPage() {
    return (
        <div className="landing__page">
            <h1>Welcome to the Pokédex</h1>
            <Link to='/home'>
                <button>Enter</button>
            </Link>
        </div>
    )
}