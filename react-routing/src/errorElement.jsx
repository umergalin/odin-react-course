import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            <h1>Oh no, this route doesn't exist!</h1>
            <Link to="/">
                You can go back to the home page by clicking here, though!
            </Link>
            <img src="https://http.cat/404" alt="Page not found"/>
        </div>
    );
};

export default ErrorPage;