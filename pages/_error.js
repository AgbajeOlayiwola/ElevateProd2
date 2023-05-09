import Lottie from 'react-lottie';
import styles from './styles.module.css';
import animationData from '../components/ReusableComponents/Lotties/error.json';
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
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return <>{statusCode}</>;
};

export default Error;
