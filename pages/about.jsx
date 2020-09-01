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
                <br />
                <br />
                <P>
                    <em>
                        <small>
                            This free service and all software are provided on an &quot;as is&quot;
                            basis without warranties of any kind, either express or implied,
                            including, without limitation, fitness for a particular purpose. Your
                            use of the services is at your sole risk. I do not guarantee the
                            accuracy or timeliness of information available from the service.
                        </small>
                    </em>
                </P>
            </ContentBox>
        </Layout>
    );
}
