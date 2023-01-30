const getAviaTicketsData = async () => {
  const res = await fetch("http://localhost:3000/tickets?&_limit=10");
  const data = await res.json();
  return data;
};

export { getAviaTicketsData };
