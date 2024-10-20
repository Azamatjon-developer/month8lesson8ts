import { Suspense } from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                
                <p className="mt-4 text-lg text-white font-semibold">Loading...</p>
            </div>
        </div>
    );
};

const SuspenseComponent = ({ children }: { children: JSX.Element }) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export { Loading, SuspenseComponent };
