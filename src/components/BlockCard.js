import * as React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

import Title from "./Title";

export default function BlockCard({ large, block }) {
  return (
    <React.Fragment>
      <Title>
        {large
          ? `Block Hashes (${block?.number})`
          : `Block Details (${block?.number})`}
      </Title>

      {large && (
        <>
          <Typography color="text.secondary">
            {`Hash: ${block?.hash}`}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            <Link
              to={`/address/${block?.miner}`}
            >{`Miner: ${block?.miner}`}</Link>
          </Typography>
          <Typography color="text.secondary">
            <Link
              to={`/block/${block?.parentHash}`}
            >{`Parent Hash: ${block?.parentHash}`}</Link>
          </Typography>
        </>
      )}

      {!large && (
        <>
          <Typography color="text.secondary">
            {`Time mined: ${formatDistance(
              block?.timestamp * 1000,
              new Date(),
              {
                addSuffix: true,
                includeSeconds: true,
              }
            )}`}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {`Transactions: ${block?.transactions.length}`}
          </Typography>
          <Typography color="text.secondary">
            {`Gas Used: ${block?.gasUsed.toNumber()}`}
          </Typography>
          <Typography color="text.secondary">
            {`Gas Limit: ${block?.gasLimit.toNumber()}`}
          </Typography>
        </>
      )}
    </React.Fragment>
  );
}
