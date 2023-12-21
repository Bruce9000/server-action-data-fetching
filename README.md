Initially generated using create-next-app.

Uses Next 14, MUI and React Query - demonstrating how we use React Query to call Server Actions for data fetching.

Showing 2 different contexts that we might use Server Actions to fetch data.

1) (Potentially) Complex Grid with filters, paging, sorting.
2) Individual fields on a form eg auto-complete fields.

For these we typically have a Client Component that uses a React Query hook, that internally fetches data from a Server
Action.

The key flow is:

1) app/grid/grid.tsx fetches data from useSearchItemsQuery a custom React Query hook.
2) app/grid/grid-queries.ts inside useSearchItemsQuery calls a Server Action for data fetching.
3) app/grid/grid-dao.ts contains the server action, mocked to return canned data but really would be making a gRPC call
   out to a microservice.

We love this style because its so clean - no excess boilerplate from Route Handlers, really clean end to end Type
safety.
