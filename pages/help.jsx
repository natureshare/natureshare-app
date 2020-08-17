import glob from 'glob';
import path from 'path';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Layout from '../components/Layout';
import { H1, H2 } from '../components/Typography';

export async function getStaticProps() {
    return {
        props: {
            topics: glob.sync('*', { cwd: path.join('public', 'help') }),
        },
    };
}

export default function Help({ topics }) {
    return (
        <Layout title="Help" href="/help/">
            <H1>Help</H1>
            <H2>Topics</H2>
            <Box mt={3}>
                <Typography variant="body1">
                    <ul>
                        {topics.map((i) => (
                            <li>
                                <Link href="/help/[topic]" as={`/help/${i}`}>
                                    {i}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Typography>
            </Box>
        </Layout>
    );
}
