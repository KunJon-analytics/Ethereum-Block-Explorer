import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

import { alchemy } from "../App";
import AddressCard from "../components/AddressCard";
import Transfers from "../components/Transfers";

const category = [
  "external",
  "internal",
  "erc20",
  "erc721",
  "erc1155",
  "specialnft",
];

const AddressDetail = () => {
  let { hash } = useParams();
  const [tokenBalances, setTokenBalances] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTokensBalance = async () => {
      const balances = await alchemy.core.getTokenBalances(hash);
      const incomingTransfers = await alchemy.core.getAssetTransfers({
        toAddress: hash,
        category,
      });
      const outgoingTransfers = await alchemy.core.getAssetTransfers({
        fromAddress: hash,
        category,
      });
      const transfers = [
        ...incomingTransfers.transfers,
        ...outgoingTransfers.transfers,
      ];
      setTransactions(transfers);
      setTokenBalances(balances);
    };

    getTokensBalance();
  }, [hash]);

  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <AddressCard large tokenData={tokenBalances} />
            </Paper>
          </Grid> */}
      {!!tokenBalances?.tokenBalances.length && (
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <AddressCard
              tokenData={tokenBalances}
              transactions={transactions}
            />
          </Paper>
        </Grid>
      )}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          {!!transactions.length && <Transfers transactions={transactions} />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddressDetail;
