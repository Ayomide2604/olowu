import withPWA from "next-pwa";

const pwaConfig = withPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
	icon: "/icon.jpg",
});

const nextConfig = {
	...pwaConfig,
	allowedDevOrigins: ["192.168.1.64", "192.168.1.96"],
};

export default nextConfig;
