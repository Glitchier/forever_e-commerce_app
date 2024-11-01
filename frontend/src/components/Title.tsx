type titleType = {
  txt1: string;
  txt2: string;
};

const Title = ({ txt1, txt2 }: titleType) => {
  return (
    <div className="inline-flex gap-2 items-center font-Montserrat justify-center">
      <p className="flex justify-center uppercase items-center gap-2 text-zinc-500">
        {txt1}{" "}
        <span className="text-zinc-700 uppercase font-medium">{txt2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-blue"></p>
    </div>
  );
};

export default Title;
