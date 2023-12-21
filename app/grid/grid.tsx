"use client";

import { useSearchItemsQuery } from "@/app/grid/grid-queries";
import { Item } from "@/app/grid/grid-types";
import ItemDialog from "@/app/grid/item-dialog";
import { Box, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridPaginationModel, GridRowParams } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useState } from "react";

const Grid = () => {
    // basic state for our query inputs
    const [searchText, setSearchText] = useState<string>("");
    const [page, setPage] = useState<number>(0);

    // react query that fetches our data
    const { data, isFetching } = useSearchItemsQuery(searchText, page);

    // for our dialog
    const [activeItem, setActiveItem] = useState<Item | undefined>();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, padding: "20px", height: "460px" }}>
            <Box>
                <TextField
                    size="small"
                    label="Search"
                    onChange={(event) => {
                        setPage(0);
                        setSearchText(event.target.value);
                    }}
                    value={searchText}
                />
            </Box>
            <DataGrid<Item>
                columns={buildColumns(setActiveItem)}
                rows={data?.items ?? []}
                rowCount={data?.totalResults ?? 0}
                getRowId={(row) => row.name}
                loading={isFetching}
                pagination={true}
                paginationMode="server"
                pageSizeOptions={[5]}
                paginationModel={{
                    page,
                    pageSize: 5,
                }}
                onPaginationModelChange={(o: GridPaginationModel) => setPage(o.page)}
            />
            {!!activeItem && <ItemDialog item={activeItem} doClose={() => setActiveItem(undefined)} />}
        </Box>
    );
};

const buildColumns = (setActiveItem: Dispatch<SetStateAction<Item>>) => [
    {
        field: "actions",
        type: "actions",
        resizable: false,
        width: 50,
        getActions: (params: GridRowParams<Item>) => [
            <GridActionsCellItem showInMenu key="edit" label="Edit" onClick={() => setActiveItem(params.row)} />,
        ],
    },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
    },
];

export default Grid;
