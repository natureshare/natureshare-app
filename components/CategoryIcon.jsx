// import PaperclipIcon from 'mdi-material-ui/Paperclip';
import LeafIcon from 'mdi-material-ui/Leaf';
import EyeIcon from 'mdi-material-ui/Eye';
import TagIcon from 'mdi-material-ui/Tag';
import FolderIcon from 'mdi-material-ui/FolderPound';
import PersonIcon from '@material-ui/icons/Person';

export default function CategoryIcon({ category }) {
    return (
        <>
            {category === 'profile' && <PersonIcon />}
            {category === 'collections' && <FolderIcon />}
            {category === 'ids' && <LeafIcon />}
            {category === 'items' && <EyeIcon />}
            {category === 'tags' && <TagIcon />}
        </>
    );
}
