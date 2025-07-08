import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const CustomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  // Check if Google OAuth is properly configured
  const isGoogleOAuthAvailable = process.env.REACT_APP_GOOGLE_CLIENT_ID && 
    process.env.REACT_APP_GOOGLE_CLIENT_ID !== "your_google_client_id_here" &&
    process.env.REACT_APP_GOOGLE_CLIENT_ID !== "demo-client-id";

  // Fallback demo login function
  const demoLogin = () => {
    const demoUser = {
      given_name: "Demo User"
    };
    localStorage.setItem("user", JSON.stringify(demoUser));
    closeModal();
    navigate("/");
  };

  // Google login hook - always defined
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
        const userInfoResponse = await fetch(userInfoEndpoint, {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          const userObject = {
            given_name: userInfo.given_name,
          };
          localStorage.setItem("user", JSON.stringify(userObject));
          closeModal();
          navigate("/");
        } else {
          console.error("Failed to fetch user information");
          demoLogin(); // Fallback
        }
      } catch (error) {
        console.error("Google login error:", error);
        demoLogin(); // Fallback
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      demoLogin(); // Fallback
    }
  });

  return (
    <>
      <button
        onClick={openModal}
        className="glass-button text-white px-6 py-2 text-sm rounded-full font-medium hover:scale-105 transition-all duration-300"
      >
        {localStorage.getItem("user")
          ? `Hi, ${JSON.parse(localStorage.getItem("user")).given_name}`
          : "Sign In"}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen flex items-center justify-center px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative w-full max-w-md p-8 glass-card">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-300 glass-button p-2 rounded-full"
                >
                  <svg
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="fill-current"
                  >
                    <path d="M13.125 0l-7.5 7.5 7.5 7.5 1.429-1.428L8.482 7.5l6.072-6.071z"></path>
                    <path d="M1.429 0l7.5 7.5-7.5 7.5-1.43-1.428L6.072 7.5 0 1.43z"></path>
                  </svg>
                </button>

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold brand-title mb-2">Welcome to Cinefalls</h2>
                  <p className="text-muted">Sign in to continue your cinematic journey</p>
                </div>

                {/* Demo mode notice */}
                {!isGoogleOAuthAvailable && (
                  <div className="glass-card border border-yellow-400/30 bg-yellow-400/10 p-3 rounded-lg mb-4">
                    <p className="text-yellow-300 text-sm text-center">
                      <strong>Demo Mode:</strong> Using demo login. Configure Google OAuth for full authentication.
                    </p>
                  </div>
                )}

                {/* Continue with Google or Demo Login */}
                <button
                  onClick={() => {
                    localStorage.clear();
                    if (isGoogleOAuthAvailable && googleLogin) {
                      googleLogin();
                    } else {
                      demoLogin();
                    }
                  }}
                  className="glass-button text-white py-3 px-4 rounded-full w-full mb-4 flex items-center justify-center hover:scale-105 transition-all duration-300 font-medium"
                >
                  <span className="mr-3">
                    <img
                      src="https://in.bmscdn.com/webin/common/icons/googlelogo.svg"
                      alt="Google Logo"
                      className="w-6 h-6"
                    />
                  </span>
                  {isGoogleOAuthAvailable ? "Continue with Google" : "Continue as Demo User"}
                </button>

                {/* Continue with Apple */}
                <button className="glass-button text-white py-3 px-4 rounded-full w-full mb-4 flex items-center justify-center hover:scale-105 transition-all duration-300 font-medium">
                  <span className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 170 170"
                      aria-labelledby="apple-label"
                      role="img"
                      fill="currentColor"
                    >
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z"></path>
                    </svg>
                  </span>
                  Continue with Apple
                </button>

                {/* Continue with Email */}
                <button className="glass-button text-white py-3 px-4 rounded-full w-full mb-6 flex items-center justify-center hover:scale-105 transition-all duration-300 font-medium">
                  <span className="mr-3">
                    <img
                      src="https://in.bmscdn.com/webin/common/icons/email.svg"
                      alt="Email Logo"
                      className="w-6 h-6"
                    />
                  </span>
                  Continue with Email
                </button>

                {/* Terms & Conditions */}
                <div className="flex items-center justify-center">
                  <label
                    htmlFor="termsCheckbox"
                    className="text-center text-gray-300 text-sm"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      className="text-cinefalls-accent hover:text-cinefalls-primary transition-colors duration-300"
                    >
                      Terms & Conditions
                    </a>{" "}
                    &amp;{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="text-cinefalls-accent hover:text-cinefalls-primary transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CustomModal;
