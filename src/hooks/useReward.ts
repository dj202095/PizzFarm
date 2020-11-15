import { useCallback } from 'react'

import usePizza from './usePizza'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../pizza/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const pizza = usePizza()
  const masterChefContract = getMasterChefContract(pizza)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, pizza])

  return { onReward: handleReward }
}

export default useReward
