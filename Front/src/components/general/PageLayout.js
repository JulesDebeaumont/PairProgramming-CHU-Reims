export function PageLayout(props) {
  return (
    <>
      <div className="min-h-full">
        <div className="p-5 pt-24 lg:pt-10 lg:ml-[20vw] xl:ml-[15vw] text-slate-200">
          {props.children}
        </div>
      </div>
    </>
  );
}

export default PageLayout;
