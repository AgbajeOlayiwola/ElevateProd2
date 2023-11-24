import Link from 'next/link';
import Lottie from 'react-lottie';
import animationData from '../components/ReusableComponents/Lotties/error.json';
import styles from './styles.module.css';
function Error({ statusCode }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <p className={styles.Errors}>
            <Lottie options={defaultOptions} height={500} width={500} />
            {statusCode ? (
                `An error ${statusCode} occurred on server`
            ) : (
                <>
                    <p>An error occurred on client&rsquo;s</p>
                    <Link href="/">Return To DashBoard</Link>
                </>
            )}
        </p>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return <>{statusCode}</>;
};

export default Error;
