import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { alchemy } from "../App";
import TransactionCard from "../components/TransactionCard";
import TransactionLogs from "../components/TransactionLogs";

const TransactionDetail = () => {
  const [transaction, setTransaction] = useState(null);
  let { hash } = useParams();
  useEffect(() => {
    const getTransaction = async () => {
      const transactionData = await alchemy.core.getTransactionReceipt(hash);
      setTransaction(transactionData);
    };

    getTransaction();
  }, [hash]);
  return (
    <Grid container spacing={3}>
      {transaction && (
        <>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <TransactionCard large transaction={transaction} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <TransactionCard transaction={transaction} />
            </Paper>
          </Grid>
          {!!transaction.logs.length && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <TransactionLogs logs={transaction.logs} />
              </Paper>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default TransactionDetail;
