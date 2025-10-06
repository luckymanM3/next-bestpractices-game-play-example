import NextTopLoader from 'nextjs-toploader';

export const TopLoader = () => {
  return (
    <NextTopLoader
      color="#ddb800"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow={`0 0 10px #227AFF,0 0 5px #227AFF`}
    />
  );
};