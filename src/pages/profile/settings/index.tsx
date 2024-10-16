import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

const Settings = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/profile/settings/general-information')
  }, [])

  return <div></div>
}

export default Settings
