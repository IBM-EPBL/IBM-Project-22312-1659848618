import { Avatar, Button, Flex, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Select, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { user as userAtom, values as valueAtom, transaction as transactionAtom } from '../../state/state'
import EntryPoint from './EntryPoint'
import ChartSection from './ChartSection'
import TransactionSection from './TransactionSection'
import { baseUrl } from '../../utils/constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AdditionalTopCard from './AdditionalTopCard'

const Dashboard = () => {
  const user = useRecoilValue(userAtom);
  const [value, setValue] = useRecoilState(valueAtom);
  const [transaction, setTransaction] = useRecoilState(transactionAtom)
  const navigate = useNavigate();
  const [fetchThings, setFetchThings] = React.useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        baseUrl + '/api/transaction',
        {
          headers: {
            'Authorization': 'Token ' + user.token,
          }
        }
      );
      if (res.data.message !== 'No Transaction Availabele') {
        const result = res.data.data
        result.reverse();
        setTransaction(result);
      }
    };

    fetch();
  }, [fetchThings]);

  useEffect(() => {
    const update = () => {
      let inc = 0;
      let exp = 0;
      for(let i = 0; i < transaction.length; i++) {
        if (transaction[i].type === 'D') {
          exp += parseInt(transaction[i].amount);
        } else {
          inc += parseInt(transaction[i].amount);
        }
      }
      setValue({
        income: inc,
        expense: exp,
        availableBalance: inc - exp
      })
    }

    update()
  }, [transaction])

  const handleLogout = () => {
    localStorage.removeItem('login')
    navigate('/authenticate');
  }


  return (
    <Flex flexDir="column" width="100%" alignItems="center" justifyContent="center" pb={10}>
      <Flex flexDir="row" width="90%" alignItems="center" justifyContent="end" mt={10}>
        <Menu>
          <MenuButton><Avatar name={user.name} color="black" bg="white"/></MenuButton>
          <Portal>
            <MenuList color='black'>
              <MenuItem>{user.name}</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      <Flex flexDir="row" width="90%" alignItems="center" justifyContent="space-between" mt={10}>
        <AdditionalTopCard />
      </Flex>
      <Flex flexDir="row" width="90%" justifyContent="space-between" mt={10}>
        <EntryPoint refresher={setFetchThings}/>
        <TransactionSection />
      </Flex>
      <Flex flexDir="row" width="90%" justifyContent="space-between" mt={10}>
        <ChartSection />
      </Flex>

    
    </Flex>
  )
}

export default Dashboard