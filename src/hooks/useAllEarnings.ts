import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../pizza/utils'
import usePizza from './usePizza'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const pizza = usePizza()
  const farms = getFarms(pizza)
  const masterChefContract = getMasterChefContract(pizza)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, pizza])

  useEffect(() => {
    if (account && masterChefContract && pizza) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, pizza])

  return balances
}

export default useAllEarnings
