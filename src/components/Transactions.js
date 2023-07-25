import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

import Title from "./Title";

const Transactions = ({ transactions }) => {
  return (
    <React.Fragment>
      <Title>Block Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell align="right">Hash</TableCell>
          </TableRow>
        </TableHead>
        {!!transactions.length && (
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.transactionIndex}>
                <TableCell>
                  <Link to={`/transaction/${transaction.hash}`}>
                    {transaction.transactionIndex}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {`${transaction.hash.slice(0, 5)}...${transaction.hash.slice(
                    -5
                  )}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </React.Fragment>
  );
};

export default Transactions;
