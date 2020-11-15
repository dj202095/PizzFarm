import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../pizza/utils'
import usePizza from './usePizza'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const pizza = usePizza()
  const masterChefContract = getMasterChefContract(pizza)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, pizza])

  useEffect(() => {
    if (account && masterChefContract && pizza) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, pizza])

  return balance
}

export default useEarnings
