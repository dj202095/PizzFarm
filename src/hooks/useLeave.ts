import {useCallback} from 'react'

import usePizza from './usePizza'
import {useWallet} from 'use-wallet'

import {leave, getXPizzaStakingContract} from '../pizza/utils'

const useLeave = () => {
  const {account} = useWallet()
  const pizza = usePizza()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXPizzaStakingContract(pizza),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pizza],
  )

  return {onLeave: handle}
}

export default useLeave
