import {useCallback} from 'react'

import usePizza from './usePizza'
import {useWallet} from 'use-wallet'

import {enter, getXPizzaStakingContract} from '../pizza/utils'

const useEnter = () => {
  const {account} = useWallet()
  const pizza = usePizza()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXPizzaStakingContract(pizza),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pizza],
  )

  return {onEnter: handle}
}

export default useEnter
