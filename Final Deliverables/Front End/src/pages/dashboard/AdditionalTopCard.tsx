import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { values as valueAtom } from '../../state/state'

const AdditionalTopCard = () => {

  const value = useRecoilValue(valueAtom)
  return (
    <Flex flexDir="row" alignItems="center" justifyContent="center" p={10} bg="#fff" width="100%">
        <Flex flexDir="column" width="20%" alignItems="center" justifyContent="center">
            <Text fontSize="xl" fontWeight="bold">{value.income}</Text>
            <Text fontSize="xl" color="gray.500">Income</Text>
        </Flex>
        <Text fontSize="xl" fontWeight="bold">-</Text>
        <Flex flexDir="column" width="20%" alignItems="center" justifyContent="center">
            <Text fontSize="xl" fontWeight="bold">{value.expense}</Text>
            <Text fontSize="xl" color="gray.500">Expense</Text>
        </Flex>
        <Text fontSize="xl" fontWeight="bold">=</Text>
        <Flex flexDir="column" width="20%" alignItems="center" justifyContent="center">
            <Text fontSize="xl" fontWeight="bold">{value.availableBalance}</Text>
            <Text fontSize="xl" color="gray.500">Available Balance</Text>
        </Flex>
    </Flex>
  )
}

export default AdditionalTopCard