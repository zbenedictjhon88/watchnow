import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageViewsTracking } from "../../services/analytics";

function Terms(props) {

    let location = useLocation();

    useEffect(() => {
        pageViewsTracking(location);
    }, []);

    return (
        <div className='container mt-auto'>
            <div className="row">
                <div className="col-lg-6 col-md-8">
                    <h3>Terms of Service</h3>
                    <p>
                        Welcome to our WATCHNOW streaming site. By accessing and using our watchnow,
                        you agree to be bound by the following Terms of Service agreement:
                    </p>
                    <ul>
                        <li>
                            Use of WATCHNOW: You may use our watchnow for personal and non-commercial purposes only.
                            You may not use our watchnow for any illegal or unauthorized purpose.
                        </li>
                        <li>
                            Copyright and Intellectual Property: All content on our watchnow,
                            including videos, images, and text, is owned by us or our licensors and is
                            protected by copyright and other intellectual property laws.
                        </li>
                        <li>
                            Termination: We may terminate your access to our watchnow at any time and for any reason,
                            including without limitation for breach of these Terms of Service.
                        </li>
                        <li>
                            Prohibited Conduct: You may not use our watchnow to post, upload,
                            or otherwise distribute any content that is defamatory, obscene, offensive,
                            or violates any law or the rights of others.
                        </li>
                        <li>
                            Indemnification: You agree to indemnify and hold us harmless from
                            any claim or demand, including reasonable attorneys' fees, made by any third party due
                            to or arising out of your use of our watchnow, your violation of these Terms of Service,
                            or your violation of any law or the rights of others.
                        </li>
                        <li>
                            Changes to Terms of Service: We may change these Terms of Service at
                            any time and without notice. Your continued use of our watchnow after any changes to these
                            Terms of Service constitutes your acceptance of the new terms.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Terms;