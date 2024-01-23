const NotFound = () => {
  return (
    <main className="flex w-full grow flex-col items-center justify-center gap-3 p-6">
      <div className="error-gradient text-9xl font-extrabold">404</div>
      <div className="text-center text-lg">
        Couldn&apos;t find the page you&apos;re looking for.
      </div>
    </main>
  );
};

export default NotFound;
