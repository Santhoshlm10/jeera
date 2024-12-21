import { HStack, Input, Text } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { CiSearch } from "react-icons/ci";
import QueryAPI from "../apis/queries";
import { InputGroup } from "../components/ui/input-group";
import { Button } from "../components/ui/button";
import moment from "moment";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../components/ui/pagination";

interface IUserObject {
  userId: number,
  email: string
  username: string
  password: string
  role: string;
  created_at: string
  updated_at: string
}

export const DATE_FORMAT = "DD MMM YYYY hh:mm A"

function Users() {
  const { isLoading, error, data:userData } = useQuery("users", () =>
    QueryAPI.getDataFromSQL("jeera_users", "").then((res) => res)
  );
  console.log("usLoading", isLoading, error, userData);
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex align-center">
        <div>
          <Text className="text-2xl font-semibold">Manage users</Text>
        </div>
        <div className="ml-auto">
          <div className="flex align-center gap-2">
            <InputGroup flex="1" startElement={<CiSearch />}>
              <Input placeholder="Search user" style={{ border: '1px solid lightgray' }} />
            </InputGroup>
            <Button>Add User</Button>
          </div>
        </div>
      </div>
      <div>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>User ID</Table.ColumnHeader>
              <Table.ColumnHeader>Username</Table.ColumnHeader>
              <Table.ColumnHeader>User Email</Table.ColumnHeader>
              <Table.ColumnHeader>User Role</Table.ColumnHeader>
              <Table.ColumnHeader>Created At</Table.ColumnHeader>
              <Table.ColumnHeader>Updated At</Table.ColumnHeader>

            </Table.Row>
          </Table.Header>
          <Table.Body>
            {userData && Array.isArray(userData?.data) && userData.data.map((item: IUserObject) => (
              <Table.Row key={item.userId}>
                <Table.Cell>{item.userId}</Table.Cell>
                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell >{item.email}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>{moment(item.created_at).format(DATE_FORMAT)}</Table.Cell>
                <Table.Cell>{moment(item.updated_at).format(DATE_FORMAT)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <div>
        <PaginationRoot onPageChange={(newValue) => {
          console.log("newvclaue",newValue)
        }} count={userData?.data.length} pageSize={10} page={1}>
        <HStack wrap="wrap">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
        </div>
      </div>
    </div>
  );
}
export default Users;
