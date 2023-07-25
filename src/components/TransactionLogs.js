import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Title from "./Title";

const TransactionLogs = ({ logs }) => {
  return (
    <React.Fragment>
      <Title>Transaction Logs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Topics</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        {!!logs?.length && (
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.logIndex}>
                <TableCell>{log.logIndex}</TableCell>
                <TableCell>{log.topics.length}</TableCell>
                <TableCell align="right">
                  {`${log.address.slice(0, 5)}...${log.address.slice(-5)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </React.Fragment>
  );
};

export default TransactionLogs;
