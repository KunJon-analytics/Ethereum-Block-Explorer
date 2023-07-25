import * as React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Title from "./Title";

export default function TransactionCard({ large, transaction }) {
  return (
    <React.Fragment>
      <Title>
        {large
          ? `Transaction Hashes (${`${transaction.transactionHash.slice(
              0,
              5
            )}...${transaction.transactionHash.slice(-5)}`})`
          : `Transaction Details (${`${transaction.transactionHash.slice(
              0,
              5
            )}...${transaction.transactionHash.slice(-5)}`})`}
      </Title>

      {large && (
        <>
          <Typography color="text.secondary">
            {`Hash: ${transaction?.transactionHash}`}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            <Link to={`/block/${transaction?.blockHash}`}>
              {`Block Hash: ${transaction?.blockHash}`}
            </Link>
          </Typography>
          <Typography color="text.secondary">
            <Link to={`/address/${transaction?.from}`}>
              {`From: ${transaction?.from}`}
            </Link>
          </Typography>
          <Typography color="text.secondary">
            <Link to={`/address/${transaction?.to}`}>
              {`To: ${transaction?.to}`}
            </Link>
          </Typography>
        </>
      )}

      {!large && (
        <>
          <Typography color="text.secondary">
            {`Block Number: ${transaction?.blockNumber}`}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {`Logs: ${transaction?.logs.length}`}
          </Typography>
          <Typography color="text.secondary">
            {`Gas Used: ${transaction?.gasUsed.toNumber()}`}
          </Typography>
          <Typography color="text.secondary">
            {`Contract Invocation: ${transaction?.contract ? "True" : "False"}`}
          </Typography>
        </>
      )}
    </React.Fragment>
  );
}
