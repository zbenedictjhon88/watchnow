import React, { Suspense, } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

const LazyComponent = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./Component')), 500);
  });
});

function App() {

  return (
    <>
       <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent/>
        </Suspense>
    </>
  );
}

export default App;
