import React from 'react'

function Loader({loading, children}) {
  return (
    <div className="relative">
        {loading && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-45" ><span className="loading loading-bars loading-lg"></span></div>}
        {children}
    </div>
  )
}

export default Loader