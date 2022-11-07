import Head from "next/head";
import Navbar from "../components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                <title>Todo List</title>
            </Head>
            <header>
                <Navbar />
            </header>
            {children}
        </>
    )
}

export default Layout;