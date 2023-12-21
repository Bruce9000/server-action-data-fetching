"use server";

import { SearchItemsRequest, SearchItemsResponse } from "./grid-types"; // in reality we would be making a grpc call off to another microservice here, dummy data will do, you get the gist.

// in reality we would be making a grpc call off to another microservice here, dummy data will do, you get the gist.

const names = [
    "Admiral Ackbar",
    "Cassian Andor",
    "Wedge Antilles",
    "Lando Calrissian",
    "Chewbacca",
    "Poe Dameron",
    "Biggs Darklighter",
    "The Mandolorian",
    "Count Dooku",
    "Jyn Erso",
    "Boba Fett",
    "Greedo",
    "Jabba the Hutt",
    "Qui-Gon Jinn",
    "Obi-Wan Keboni",
    "Darth Maul",
    "Leia Organa",
    "Emperor Palpatine",
    "Rey",
    "Darth Vader",
    "Luke Skywalker",
    "Kylo Ren",
    "Han Solo",
    "Grand Admiral Thrawn",
    "Mace Windu",
    "Yoda",
];

const sleep = (ms: number) =>
    new Promise((r) => {
        setTimeout(r, ms);
    });

export const searchItems = async (request: SearchItemsRequest) => {
    await sleep(Math.random() * 2 * 1000);

    const page = request?.page ?? 0;
    const pageSize = 5;

    // apply our search filter
    const matchedItems = request?.searchText
        ? names.filter((n) => n.toLowerCase().includes(request.searchText.toLowerCase()))
        : names;

    return {
        // apply paging
        items: matchedItems.slice(page * pageSize, (page + 1) * pageSize).map((name) => ({ name })),
        totalResults: matchedItems.length,
    } as SearchItemsResponse;
};
