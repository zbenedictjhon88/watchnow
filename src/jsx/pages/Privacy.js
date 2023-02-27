import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageViewsTracking } from "../../services/analytics";

function Privacy(props) {

    let location = useLocation();

    useEffect(() => {
        pageViewsTracking(location);
    }, []);

    return (
        <div className='container mt-auto'>
            <div className="row">
                <div className="col-lg-6 col-md-8">
                    <h3>Privacy Policy</h3>
                    <p>
                        Welcome to our WATCHNOW.
                        We respect your privacy and are committed to protecting your personal information.
                        This Privacy Policy explains how we collect, use, and share your information when you use our watchnow.
                    </p>
                    <ul>
                        <li>
                            Information We Collect: We may collect personal information such as your name, and email address,
                            when you sign up for our watchnow. We may also collect information about
                            your use of our watchnow, such as your IP address, browser type, and device type.
                        </li>
                        <li>
                            Data Security: We take reasonable measures to protect your
                            personal information from unauthorized access, disclosure, and destruction.
                        </li>
                        <li>
                            Changes to Privacy Policy: We may change this Privacy Policy at any
                            time and without notice. Your continued use of our website after any changes to this
                            Privacy Policy constitutes your acceptance of the new policy.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Privacy;