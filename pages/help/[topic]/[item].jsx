import glob from 'glob';
import path from 'path';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import fs from 'fs';
import yaml from 'js-yaml';
import Layout from '../../../components/Layout';
import { H1, H2, H3, H4, P } from '../../../components/Typography';

export const getStaticPaths = async () => {
    return {
        paths: glob
            .sync(path.join('**', '*.yaml'), { cwd: path.join('public', 'help') })
            .map((item) => ({
                params: { topic: path.dirname(item), item: path.basename(item, '.yaml') },
            })),
        fallback: false,
    };
};

export async function getStaticProps({ params }) {
    const { topic, item } = params;
    return {
        props: {
            topic,
            item,
            content: yaml.safeLoad(
                fs.readFileSync(path.join('public', 'help', topic, `${item}.yaml`)),
            ),
        },
    };
}

export default function Help({ topic, content }) {
    return (
        <Layout title="Help" href={`/help/${topic}`}>
            <H1>
                Help <small>/ {topic}</small>
            </H1>
            <H2>{content.title}</H2>
            {content.sections &&
                content.sections.map((section) => (
                    <Box mt={3}>
                        <H3>{section.title}</H3>
                        {section.steps.map((step) => (
                            <Box mt={3}>
                                {step.title && <H4>{step.title}</H4>}
                                {step.image && (
                                    <Box mt={3} mb={3}>
                                        <Paper elevation={3} style={{ display: 'inline-block' }}>
                                            <img
                                                alt=""
                                                src={step.image}
                                                style={{ maxWidth: '100%', maxHeight: '25vh' }}
                                            />
                                        </Paper>
                                    </Box>
                                )}
                                {step.text && step.text.split('\n').map((t) => <P>{t}</P>)}
                                {step.code && (
                                    <Box mt={3} px={2} py={1} component={Paper}>
                                        <pre>
                                            <code>{step.code}</code>
                                        </pre>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                ))}
        </Layout>
    );
}
