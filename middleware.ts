export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/properties",
        "/favorites",
        "/myAds",
        "/editAds",
        "/myPartners",
        "/partners"
    ]
}