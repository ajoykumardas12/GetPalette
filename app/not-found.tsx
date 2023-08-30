const NotFound = () => {
  return (
    <main className="w-full grow p-6 flex flex-col items-center justify-center gap-3">
      <div className="text-9xl font-extrabold error-gradient">404</div>
      <div className="text-lg text-center">
        Couldn&apos;t find the page you&apos;re looking for.
      </div>
    </main>
  );
};

export default NotFound;
