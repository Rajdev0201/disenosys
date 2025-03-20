

const Support = () => {
  return (
    <div className="flex font-garet">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Support</h2>
        <p className="mt-4">
          Need help? Contact us at{" "}
          <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
            support@disenosys.com
          </a>
        </p>
        <h3 className="text-lg font-semibold mt-6">FAQs</h3>
        <div className="mt-4 space-y-4">
          <div className="bg-gray-100 p-4 rounded-md shadow">
            <h4 className="font-semibold">How to reset my password?</h4>
            <p className="text-gray-600 mt-2">Go to settings and click <span className="text-white bg-blue-500 shadow-inner rounded-md p-2">Reset Password</span></p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md shadow">
            <h4 className="font-semibold">How to enroll in a new course?</h4>
            <p className="text-gray-600 mt-2">Browse the course catalog and click <span className="text-white bg-blue-500 shadow-inner rounded-md p-2">Enroll</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
