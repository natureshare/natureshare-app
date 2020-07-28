import Layout from '../components/Layout';
import { ContentBox, H1, H2, P } from '../components/Typography';

export default function About() {
    return (
        <Layout title="About" href="/about/">
            <H1>About</H1>
            <ContentBox>
                <H2>Contact</H2>
                <P>Project: contact@natureshare.org.au</P>
                <P>Technical: reilly@natureshare.org.au</P>
            </ContentBox>
        </Layout>
    );
}
