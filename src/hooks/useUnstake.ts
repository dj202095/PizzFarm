import { useCallback } from 'react'

import usePizza from './usePizza'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../pizza/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const pizza = usePizza()
  const masterChefContract = getMasterChefContract(pizza)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, pizza],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
