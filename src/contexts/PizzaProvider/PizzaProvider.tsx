import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Pizza } from '../../pizza'

export interface PizzaContext {
  pizza?: typeof Pizza
}

export const Context = createContext<PizzaContext>({
  pizza: undefined,
})

declare global {
  interface Window {
    pizzasauce: any
  }
}

const PizzaProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [pizza, setPizza] = useState<any>()

  // @ts-ignore
  window.pizza = pizza
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const pizzaLib = new Pizza(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setPizza(pizzaLib)
      window.pizzasauce = pizzaLib
    }
  }, [ethereum])

  return <Context.Provider value={{ pizza }}>{children}</Context.Provider>
}

export default PizzaProvider
