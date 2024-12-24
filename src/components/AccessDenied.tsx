export default function AccessDenied() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600">
            You must be approved to access this application.
          </p>
        </div>
      </div>
    </div> 
  )
};