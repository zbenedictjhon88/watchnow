import React, { Suspense, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import NavBar from "./layouts/NavBar";

// import Home from "./pages/Home";
// import Search from "./pages/Search";
// import About from "./pages/About";
// import Terms from "./pages/Terms";
// import Privacy from "./pages/Privacy";
// import Info from "./pages/Info";
// import Stream from "./pages/Stream";
import Loading from "./components/Loading";

const About = React.lazy(() => import('./pages/About'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Home = React.lazy(() => import('./pages/Home'));
const Search = React.lazy(() => import('./pages/Search'));
const Info = React.lazy(() => import('./pages/Info'));
const Stream = React.lazy(() => import('./pages/Stream'));

const Markup = (props) => {

    const routes = [
        { url: "", element: <Home /> },
        { url: "search/:id", element: <Search /> },
        { url: "about", element: <About /> },
        { url: "terms", element: <Terms /> },
        { url: "privacy-policy", element: <Privacy /> },
        { url: "info/:id/:type", element: <Info /> },
        { url: "stream/:episodeId/:id/:type", element: <Stream /> },
    ];

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className="sticky-top">
                    <Header />
                    <NavBar />
                </div>
                <div className="container">
                    <Routes>
                        {routes.map((data, i) => (
                            <Route
                                key={i}
                                exact={true}
                                path={`/${data.url}`}
                                element={data.element}
                            />
                        ))}
                    </Routes>
                </div>
                <Footer />
            </Suspense>

        </>
    );
}

export default Markup;