import { useCallback } from 'react'

import usePizza from './usePizza'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../pizza/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const pizza = usePizza()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(pizza),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, pizza],
  )

  return { onStake: handleStake }
}

export default useStake
