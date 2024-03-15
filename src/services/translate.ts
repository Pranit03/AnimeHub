import axios from "axios";

export const getTranslation = async (data: string) => {
  const options = {
    method: "POST",
    url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "1f4fac6563mshc00fda38798d1c9p1f9d5cjsnf1de8c01cdad",
      "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
    },
    data: {
      q: data,
      source: "ru",
      target: "en",
    },
  };

  try {
    const response = await axios.request(options);

    const { data } = response;

    return data;
  } catch (error) {
    console.error(error);
  }
};
