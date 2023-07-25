import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Blocks from "../components/Blocks";
import { alchemy } from "../App";

const Home = ({ blockNumber }) => {
  const [latestBlocks, setLatestBlocks] = useState([]);
  useEffect(() => {
    let blockArray = [];
    const getLatestBlocks = async () => {
      if (!blockNumber) {
        return;
      }
      for (let i = 0; i < 15; i++) {
        const block = await alchemy.core.getBlock(blockNumber - i);
        blockArray.push(block);
      }
      setLatestBlocks(blockArray);
    };

    getLatestBlocks();
  }, [blockNumber]);
  return (
    <Grid container spacing={3}>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Blocks latestBlocks={latestBlocks} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
