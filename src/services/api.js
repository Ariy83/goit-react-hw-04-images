import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchImagesByQuery = async apiOptions => {
  const { data } = await axios.get('/api/', {
    params: {
      key: '40691933-b7715a41418a5dba6dc83beb8',
      page: 1,
      per_page: 12,
      q: null,
      image_type: 'photo',
      orientation: 'horizontal',
      ...apiOptions,
    },
  });
  return data;
};
