const FeedBack = () => {
  return (
    <div className="flex w-full flex-col gap-12 items-center justify-center">
      <div className="shadow bg-slate-800 rounded p-12">
        <p>Hope you are ready to use.</p>
        <p>
          All logic are being created by my knowledge. So, if you have any feedback, issue, please contact me
          <a href="mailto:+handgod1995@gmail.com" className="text-blue-400 underline underline-offset-4">
            {" "}
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default FeedBack;
