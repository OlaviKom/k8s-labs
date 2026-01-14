const FETCH_URL = process.env.URL;
const BACKEND_URL = process.env.BACKEND_URL;

const run = async () => {
  const res = await fetch(FETCH_URL);
  const url = res.url;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: `Read ${url}` }),
  });
  const data = await response.json();
  console.log(data);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
