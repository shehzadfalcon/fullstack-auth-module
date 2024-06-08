import { Html, Head, Main, NextScript } from "next/document";
import { site } from "../components/config/site";

export default function Document() {
  return (
    <Html className="scroll-smooth antialiased" lang="en">
      <Head>
        <meta name="theme-color" content="#c29901" />
        {/*  Primary Meta Tags */}
        <meta
          name="title"
          content="fullstack-auth-module: Anonymously Chat with Our AI-powered chatbot"
        />
        <meta
          name="description"
          content="Experience anonymous conversations with fullstack-auth-module, our AI chatbot utilizing GPT 2.5 & GPT 4o. Your identity remains hidden as you engage in private chats on diverse topics. Explore freely without revealing who you are."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site.metaTag} />
        <meta
          property="og:title"
          content="fullstack-auth-module: Anonymously Chat with Our AI-powered chatbot"
        />
        <meta
          property="og:description"
          content="Experience anonymous conversations with fullstack-auth-module, our AI chatbot utilizing GPT 2.5 & GPT 4o. Your identity remains hidden as you engage in private chats on diverse topics. Explore freely without revealing who you are."
        />
        <meta property="og:image" content={site.metaTag} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={site.metaTag} />
        <meta
          property="twitter:title"
          content="fullstack-auth-module: Anonymously Chat with Our AI-powered chatbot"
        />
        <meta
          property="twitter:description"
          content="Experience anonymous conversations with fullstack-auth-module, our AI chatbot utilizing GPT 2.5 & GPT 4o. Your identity remains hidden as you engage in private chats on diverse topics. Explore freely without revealing who you are."
        />
        <meta property="twitter:image" content={site.metaTag} />
        <link rel="icon" href={site.favIcon} />
        <meta property="og:image" content={site.favIcon} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
