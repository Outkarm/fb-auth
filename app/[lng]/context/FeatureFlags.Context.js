import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

const FeatureFlagContext = createContext({})

export const useFeatureFlagContext = () => useContext(FeatureFlagContext)

export const FeatureFlagContextProvider = ({ children }) => {
  const [activeFeatureFlags, setActiveFeatureFlags] = useState([]),
    [allFeatureFlags, setAllFeatureFlags] = useState([]),
    [loadingFeatureFlags, setIsLoadingFeatureFlags] = useState(false)
  // router = useRouter()

  function toggleLoading() {
    return setIsLoadingFeatureFlags(!loadingFeatureFlags)
  }

  function fetchFeatureFlags() {
    toggleLoading()
    fetch('/api/config')
      .then((res) => {
        console.log(res)
        toggleLoading()
        if (res.ok) {
          return res.json()
        }

        throw 'error'
      })
      .then((configFile) => {
        const allFeatures = configFile.features,
          enabledFeatureFlags = [],
          allAvailableFeaturesFlags = []
        for (let key of Object.keys(configFile.features)) {
          allAvailableFeaturesFlags.push(key)
          if (allFeatures[key] === 'on') {
            enabledFeatureFlags.push(`${key}`)
          }
        }

        setActiveFeatureFlags(enabledFeatureFlags)
        setAllFeatureFlags(allAvailableFeaturesFlags)
      })
      .catch((err) => {
        console.error('Error fetching feature flags:', err)
        toggleLoading()
        // router.push('/dashboard')
      })
  }

  useEffect(() => {
    fetchFeatureFlags()
  }, [])

  return (
    <FeatureFlagContext.Provider
      value={{
        loadingFeatureFlags,
        activeFeatureFlags,
        allFeatureFlags,
        fetchFeatureFlags,
      }}
    >
      {children}
    </FeatureFlagContext.Provider>
  )
}
