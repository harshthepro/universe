module.exports = {
    reactStrictMode: true,
    // Ensure no custom rewrites or base paths interfere with API routes
    async rewrites() {
        return [];
    },
};
