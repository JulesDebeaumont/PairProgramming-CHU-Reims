export function PageLayout(props) {
  return (
    <>
      <div className="ml-0 pt-10 sm:pt0 sm:ml-[20vw] p-5 bg-[#0E162A] w-full h-full text-slate-200">
        {props.children}
      </div>
    </>
  );
}

export default PageLayout;
