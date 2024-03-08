import Link from 'next/link';

const Header = () => {

    return(
        <header>
            <div className="title-container">
            <Link prefetch={true} className="title font-semibold text-4.5xl" href="/">Trialshub</Link>
            </div>
        </header>
    ) 
}

export default Header;