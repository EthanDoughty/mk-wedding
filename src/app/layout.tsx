import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

const sans = Inter({
	variable: "--font-sans-app",
	subsets: ["latin"],
});

const serif = Cormorant_Garamond({
	variable: "--font-serif-display",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
});

export const metadata: Metadata = {
	title: `${site.partnerOne} & ${site.partnerTwo}`,
	description: "Join us as we celebrate our wedding.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className={`${sans.variable} ${serif.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col font-sans text-stone-900">
				<SiteHeader />
				<main className="flex-1">{children}</main>
				<SiteFooter />
			</body>
		</html>
	);
}
