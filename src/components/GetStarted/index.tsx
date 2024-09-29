import Button from "../Button";

export type GetStartedProps = {
  title: string;
  subtitle: string;
  cta: string;
};

const GetStarted = ({ cta, subtitle, title }: GetStartedProps) => {
  return (
    <section className="container mx-auto text-center py-6 mb-12">
      <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
        {title}
      </h1>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
      </div>

      <h3 className="my-4 text-3xl leading-tight">{subtitle}</h3>

      <a href="/cadastro">
        <Button className="mt-6 px-8 py-4 text-xl" variant="secondary">
          {cta}
        </Button>
      </a>
    </section>
  );
};

export default GetStarted;
