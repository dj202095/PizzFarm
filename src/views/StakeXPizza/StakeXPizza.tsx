import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import usePizza from '../../hooks/usePizza'
import {getContract} from '../../utils/erc20'
import UnstakeXPizza from './components/UnstakeXPizza'
import StakePizza from "./components/StakePizza";

import {contractAddresses} from '../../pizza/lib/constants'
import {getXPizzaSupply} from "../../pizza/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";

const StakeXPizza: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xPizza[56],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const pizza = usePizza()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXPizzaSupply(pizza)
      setTotalSupply(supply)
    }
    if (pizza) {
      fetchTotalSupply()
    }
  }, [pizza, setTotalSupply])



  const lpContract = useMemo(() => {
    //debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXPizza
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakePizza
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ You will earn a portion of the swaps fees based on the amount
              of xPizza held relative the weight of the staking. xPizza can be minted
              by staking Pizza. To redeem Pizza staked plus swap fees convert xPizza
              back to Pizza. {totalSupply ? `There are currently ${getBalanceNumber(totalSupply)} xPIZZA in the whole pool.` : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXPizza
