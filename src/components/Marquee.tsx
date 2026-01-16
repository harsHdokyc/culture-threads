const Marquee = () => {
  const text = "CULTURE ON YOUR FEET • MADE IN INDIA • FREE SHIPPING OVER ₹999 • ";
  const repeatedText = text.repeat(4);

  return (
    <div className="bg-foreground text-background py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="font-display text-sm md:text-base font-semibold tracking-wider mx-4">
          {repeatedText}
        </span>
        <span className="font-display text-sm md:text-base font-semibold tracking-wider mx-4">
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
