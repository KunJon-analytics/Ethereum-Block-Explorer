import React from "react";
import Table from "@mui/material/Table";
import { Link } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Title from "./Title";

const Transfers = ({ transactions }) => {
  return (
    <React.Fragment>
      <Title>Transaction Logs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Value</TableCell>
            <TableCell align="right">Hash</TableCell>
          </TableRow>
        </TableHead>
        {!!transactions?.length && (
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.uniqueId}>
                <TableCell>{transaction.asset}</TableCell>
                <TableCell>
                  <Link
                    to={`/address/${transaction.from}`}
                  >{`${transaction.from.slice(0, 5)}...${transaction.from.slice(
                    -5
                  )}`}</Link>
                </TableCell>
                <TableCell>
                  <Link to={`/address/${transaction.to}`}>
                    {`${transaction.to.slice(0, 5)}...${transaction.to.slice(
                      -5
                    )}`}
                  </Link>
                </TableCell>
                <TableCell>{transaction.value}</TableCell>
                <TableCell align="right">
                  <Link to={`/transaction/${transaction.hash}`}>
                    {`${transaction.hash.slice(
                      0,
                      5
                    )}...${transaction.hash.slice(-5)}`}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </React.Fragment>
  );
};

export default Transfers;
