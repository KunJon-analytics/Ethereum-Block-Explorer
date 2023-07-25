import * as React from "react";
// import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Title from "./Title";

export const ETH = "";

export default function AddressCard({ large, tokenData, transactions }) {
  const ethBalance = tokenData?.tokenBalances.find((token) => {
    return token.contractAddress === ETH;
  });
  return (
    <React.Fragment>
      <Title>
        {large
          ? `NFTs(${tokenData?.number})`
          : `Tokens (${tokenData?.tokenBalances.length})`}
      </Title>

      {large && (
        <>
          <Typography color="text.secondary">
            {`Hash: ${tokenData?.hash}`}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {`Miner: ${tokenData?.miner}`}
          </Typography>
          <Typography color="text.secondary">
            {`Parent Hash: ${tokenData?.parentHash}`}
          </Typography>
        </>
      )}

      {!large && (
        <>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {`Tokens: ${tokenData?.tokenBalances.length}`}
          </Typography>
          <Typography color="text.secondary">
            {`ETH: ${ethBalance?.tokenBalance ? ethBalance.tokenBalance : "0"}`}
          </Typography>
          <Typography color="text.secondary">
            {`Transactions: ${transactions?.length}`}
          </Typography>
        </>
      )}
    </React.Fragment>
  );
}
