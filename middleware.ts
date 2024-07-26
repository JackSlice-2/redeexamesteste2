export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/inactive",
        "/editService",
        "/myPartners",
        "/partners"
    ]
}