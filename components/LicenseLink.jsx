import Link from '@material-ui/core/Link';

const CC = 'CC BY 2.5 AU';

export default function LicenseLink({ license }) {
    if (license === CC) {
        return <Link href="https://creativecommons.org/licenses/by/2.5/au/">&copy; {license}</Link>;
    }
    return <>&copy; {license || 'All Rights Reserved'}</>;
}
