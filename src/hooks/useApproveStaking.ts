import {useCallback} from 'react'

import usePizza from './usePizza'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getPizzaContract,
  getXPizzaStakingContract
} from '../pizza/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const pizza = usePizza()
  const lpContract = getPizzaContract(pizza)
  const contract = getXPizzaStakingContract(pizza)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
