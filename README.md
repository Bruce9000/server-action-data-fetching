Initially generated using create-next-app.

Uses Next 14, MUI and React Query - demonstrating how we use React Query to call Server Actions for data fetching.

Showing 2 different contexts that we might use Server Actions to fetch data.

1) (Potentially) Complex Grid with filters, paging, sorting.
2) Individual fields on a form eg auto-complete fields.

For these we typically have a Client Component that uses a React Query hook, that internally fetches data from a Server
Action.

We love this style because its so clean - no excess boilerplate from Route Handlers, really clean end to end Type
safety.

# Code

__layout.tsx__ has a ClientLayout which sets up react query.

__page.tsx__ then chucks in a dumbed down MUI Grid, our real app has very detailed grids/filters/paging/sorting/etc.

__app/grid__ contains:
grid.tsx - our simplified grid showing the gist of our UI data fetching
grid-dao.ts - data access object our server actions go in here for both data fetching and mutation for a given feature
grid-queries.ts - react query hooks that our UI uses to fetch and mutate data, internally these call Server Actions
grid-types.ts - example POJO, really we generate our request/response POJOs from ts-proto looking at our service layer
proto files.
