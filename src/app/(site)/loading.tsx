export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F3EC" }}>
      {/* Hero skeleton */}
      <div className="h-64 animate-pulse" style={{ backgroundColor: "#0f1f08", opacity: 0.8 }} />

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20">
        <div className="flex flex-col gap-4 max-w-md mb-16">
          <div className="h-3 w-24 rounded-full animate-pulse" style={{ backgroundColor: "#d6d0c8" }} />
          <div className="h-8 w-72 rounded-xl animate-pulse" style={{ backgroundColor: "#d6d0c8" }} />
          <div className="h-4 w-96 rounded-lg animate-pulse" style={{ backgroundColor: "#e8e2d8" }} />
          <div className="h-4 w-80 rounded-lg animate-pulse" style={{ backgroundColor: "#e8e2d8" }} />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
              <div className="h-56" style={{ backgroundColor: "#d6d0c8" }} />
              <div className="bg-white p-6 flex flex-col gap-3">
                <div className="h-4 rounded-lg" style={{ backgroundColor: "#e8e2d8", width: "70%" }} />
                <div className="h-3 rounded-lg" style={{ backgroundColor: "#e8e2d8", width: "90%" }} />
                <div className="h-3 rounded-lg" style={{ backgroundColor: "#e8e2d8", width: "60%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
