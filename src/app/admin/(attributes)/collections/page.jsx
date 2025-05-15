

import React, { Suspense } from 'react'
import CollectionsComponents from './collections'

function page() {
  return (
    <Suspense fallback={<>Loading...</>}> 
      <CollectionsComponents />
    </Suspense>
  )
}

export default page