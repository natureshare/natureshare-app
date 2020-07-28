import Link from '@material-ui/core/Link';

const CC = 'CC BY 2.5 AU';

export default function LicenseLink({ license = CC }) {
    if (license === CC) {
        return <Link href="https://creativecommons.org/licenses/by/2.5/au/">{license}</Link>;
    }
    return <>{license}</>;
}
