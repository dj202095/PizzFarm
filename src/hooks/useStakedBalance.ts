import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../pizza/utils'
import usePizza from './usePizza'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const pizza = usePizza()
  const masterChefContract = getMasterChefContract(pizza)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, pizza])

  useEffect(() => {
    if (account && pizza) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, pizza])

  return balance
}

export default useStakedBalance
