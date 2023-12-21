"use client";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import BFFSelector from "./bff-selector";
import { Item } from "./grid-types";

type Props = {
    item: Item;
    doClose: () => void;
};
const ItemDialog = ({ item, doClose }: Props) => {
    const [bff, setBff] = useState<Item | null>(null);

    return (
        <Dialog open={true} onClose={doClose} maxWidth="md" fullWidth={true}>
            <DialogTitle>{item.name}</DialogTitle>
            <DialogContent>
                <Box sx={{ padding: "20px 0" }}>
                    <BFFSelector value={bff} onChange={(value) => setBff(value)} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={doClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ItemDialog;
