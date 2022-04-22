import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { Box } from '@mui/material';

interface Props {
    title: string;
    children?: ReactNode;
}

export const AuthLayout:FC<Props> = ({children, title}) => {
  return (
    <>
    <Head>
        <title>{title}</title>
    </Head>

    \<main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px',
    }}>

        <Box display='flex' justifyContent='center' alignItems='center' height={"calc(100vh - 200px)"}>
            {children}
        </Box>
    </main>


    {/* Footer */}
    <footer>
        {/* TODO: Footer */}

    </footer>
</>
  )
}
