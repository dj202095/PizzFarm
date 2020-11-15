import { useContext } from 'react'
import { Context } from '../contexts/PizzaProvider'

const usePizza = () => {
  const { pizza } = useContext(Context)
  return pizza
}

export default usePizza
