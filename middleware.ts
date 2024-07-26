export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/inactiveAds",
        "/editService",
        "/myPartners",
        "/partners"
    ]
}