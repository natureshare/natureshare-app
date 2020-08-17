import glob from 'glob';
import path from 'path';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '../../components/Link';
import Layout from '../../components/Layout';
import { H1, H2 } from '../../components/Typography';

export const getStaticPaths = async () => {
    return {
        paths: glob.sync('*', { cwd: path.join('public', 'help') }).map((topic) => ({
            params: { topic },
        })),
        fallback: false,
    };
};

export async function getStaticProps({ params }) {
    const { topic } = params;
    return {
        props: {
            topic,
            items: glob
                .sync('*.yaml', { cwd: path.join('public', 'help', topic) })
                .map((i) => path.basename(i, '.yaml')),
        },
    };
}

export default function Help({ topic, items }) {
    return (
        <Layout title="Help" href="/help/">
            <H1>Help</H1>
            <H2>{topic}</H2>
            <Box mt={3}>
                <Typography variant="body1">
                    <ul>
                        {items.map((i) => (
                            <li>
                                <Link href="/help/[topic]/[item]" as={`/help/${topic}/${i}`}>
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
