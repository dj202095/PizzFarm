import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import usePizza from '../../hooks/usePizza'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../pizza/utils'
import { getFarms } from '../../pizza/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const pizza = usePizza()
  const { account } = useWallet()

  const farms = getFarms(pizza)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
