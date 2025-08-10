import React from 'react'
import WorkSpaceProvider from './provider'

function WorkSpaceLayout({children}) {
  return (
    <WorkSpaceProvider>
        {children}
    </WorkSpaceProvider>
  )
}

export default WorkSpaceLayout
