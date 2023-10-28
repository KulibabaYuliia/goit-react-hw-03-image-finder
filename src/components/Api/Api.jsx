import axios from 'axios';

const KEY = '39314249-b9f637c3b6d2b2c91ffe81f29';

export async function fetch(search, page) {
  const res = await axios.get(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  console.log(res.data);
  return res;
}
