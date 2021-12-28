import React, { useEffect } from 'react'
import { BrowserRouter, Link, Route, Switch, useParams } from 'react-router-dom'

import { useTypedSelector } from '../hooks/useTypedSelector'
import { useAction } from '../hooks/useAction'

import { createBrowserHistory } from 'history'

import Profile from '../components/ProfilePage/Profile'
import About from '../components/ProfilePage/About'
import Creations from '../components/ProfilePage/Creations'
import Collections from '../components/ProfilePage/Collections'
import Nav from '../components/ProfilePage/Nav'
import '../components/ProfilePage/ProfilePage.css'

const ProfilePage = ({ isMobile, account }) => {
    const { id } = useParams()
    const { name, username, about } = useTypedSelector((state) => state.user)
    const { fetchUserData } = useAction()

    useEffect(() => {
        let didCancel = false

        if (!didCancel) {
            fetchUserData(id)
        }
        return () => {
            didCancel = true
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {/* <div> */}
            {account === id ? (
                // <div onClick={refresh}>
                <div>
                    <Link exact to={`/artists/${id}/edit-profile`} className="btn edit-profile">
                        {isMobile ? <h5>Edit Profile</h5> : <h3>Edit Profile</h3>}
                    </Link>
                </div>
            ) : null}
            <BrowserRouter history={createBrowserHistory}>
                <Profile
                    name={name}
                    username={username}
                    ethAddress={id}
                />
                <div className="creations-collections">
                    <Nav id={id} isMobile={isMobile} />
                    <Switch>
                        <Route path="/artists/:id" exact component={Creations} />
                        <Route path="/artists/:id/collections" exact component={Collections} />
                    </Switch>
                </div>
                {about && (
                    <>
                        <h3 style={{ margin: '20px 20px 5px 25px' }}>About</h3>
                        <About about={about} />
                    </>
                )}
                {/* </div> */}
            </BrowserRouter>
        </>
    )
}

export default ProfilePage
