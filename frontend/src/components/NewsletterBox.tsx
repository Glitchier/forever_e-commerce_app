const NewsletterBox = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
  };

  return (
    <div className="text-center w-full">
      <p className="text-2xl font-medium text-zinc-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-zinc-400 mt-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque,
        explicabo.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] sm:w-2/3 flex items-center gap-3 mx-auto border pl-4 my-4 rounded-l-lg rounded-r-lg overflow-hidden"
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none text-md"
          placeholder="Enter your mail..."
          required
        />
        <button type="submit" className="bg-blue text-white text-xs px-10 py-4">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
