export { default } from "next-auth/middleware";

export const config = { matcher: [
    '/',
    '/login'
]}; // Match all paths except /api