import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import Registration from '../Components/Registration';
import Login from '../Components/Login';
import PrivateRoutes from './PrivateRoutes';
import HomePage from '../Components/HomePage';
import PublicRoutes from './PublicRoute';
import Events from '../Components/Events';
import PartyEventRegister from '../Components/PartyEventRegister';

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoutes><HomePage /></PrivateRoutes>} exact />
            <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} exact />
            <Route path="/registration" element={<PublicRoutes><Registration /></PublicRoutes>} exact />
            <Route path="/home" element={<PrivateRoutes><HomePage /></PrivateRoutes>} exact />
            <Route path="/party-event" element={<PrivateRoutes><Events /></PrivateRoutes>} exact />
            <Route path="/event-register" element={<PrivateRoutes><PartyEventRegister /></PrivateRoutes>} exact />
        </Routes>
    )
}
