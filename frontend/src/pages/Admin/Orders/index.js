import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text, Heading, Spinner, Center } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import "../style.css"
import { useQuery } from "react-query"
import { fetchOrders } from "../../../api"
import AdminNavbar from "../AdminNavbar"

function Orders() {
  const { isLoading, isError, data, error } = useQuery("admin:orders", fetchOrders)
  if (isLoading) {
    return (
      <Center width="100%" height="100%">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" />
      </Center>
    )
  }
  if (isError) {
    return <div>Error {error.message}</div>
  }
  console.log(data)
  return (
    <div>
      <AdminNavbar />
      <Box>
        <Heading fontSize="2xl" p={5} pb={3}>
          Orders
        </Heading>

        <Table variant="simple">
          <TableCaption>Orders placed by users.</TableCaption>
          <Thead>
            <Tr>
              <Th fontSize="14px">Users</Th>
              <Th fontSize="14px">Address</Th>
              <Th fontSize="14px" isNumeric>
                Items
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                {item.user === null ? <Td>No Name</Td> : <Td>{item.user.email}</Td>}
                <Td>{item.adress}</Td>
                <Td isNumeric>{item.items.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  )
}

export default Orders
