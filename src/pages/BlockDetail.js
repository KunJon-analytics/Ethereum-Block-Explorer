import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { alchemy } from "../App";
import BlockCard from "../components/BlockCard";
import Transactions from "../components/Transactions";

const BlockDetail = () => {
  const [block, setBlock] = useState({});
  let { hash } = useParams();
  useEffect(() => {
    const getBlockData = async () => {
      const blockData = await alchemy.core.getBlockWithTransactions(hash);
      setBlock(blockData);
    };

    getBlockData();
  }, [hash]);

  return (
    <Grid container spacing={3}>
      {block?.miner && (
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
              <BlockCard large block={block} />
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
              <BlockCard block={block} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Transactions transactions={block.transactions} />
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default BlockDetail;
