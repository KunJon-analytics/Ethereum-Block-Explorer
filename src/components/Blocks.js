import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

import Title from "./Title";

export default function Blocks({ latestBlocks }) {
  return (
    <React.Fragment>
      <Title>Recent Blocks</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell align="right">Hash</TableCell>
          </TableRow>
        </TableHead>
        {!!latestBlocks.length && (
          <TableBody>
            {latestBlocks.map((latestBlock) => (
              <TableRow key={latestBlock.number}>
                <TableCell>
                  <Link to={`/block/${latestBlock.hash}`}>
                    {latestBlock.number}
                  </Link>
                </TableCell>
                <TableCell>
                  {formatDistance(latestBlock.timestamp * 1000, new Date(), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </TableCell>
                <TableCell align="right">{`${latestBlock.hash.slice(
                  0,
                  5
                )}...${latestBlock.hash.slice(-5)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </React.Fragment>
  );
}
