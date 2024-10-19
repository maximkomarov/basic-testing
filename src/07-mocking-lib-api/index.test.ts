import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/endpoint';
  const responseData = { data: 'data' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: responseData }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: responseData }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    await throttledGetDataFromApi(relativePath);
    expect(axiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: responseData }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(responseData);
  });
});
